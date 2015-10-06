var express = require('express');
var http = require('http');
var sockjs = require('sockjs');
var redis = require('redis');


var redisHost = 'john-redis.2wlafm.ng.0001.usw2.cache.amazonaws.com';
var redisPort = 6379;

var subClient = redis.createClient(redisPort, redisHost);
var getClient = redis.createClient(redisPort, redisHost);

var lastTime = null;
var currentTime = null;

subClient.subscribe('time');

subClient.on('message', function(channel, message) {
    if (channel == 'time') {
        // var time = parseInt(message, 10);
        lastTime = currentTime
        // currentTime = time
        currentTime = message

        console.log(lastTime + ', ' + currentTime);

        // getClient.hgetall(message, function(err, reply) {
        // if (err) {
        // console.log(err);
        // return;
        // }
        // // console.log(reply);
        // conn.write('BATCH:' + reply)
        // });
    }
    else {
        console.log('Unknown channel');
    }
});

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

server.listen(80, '0.0.0.0');

app.get('/current', function(req, res) {
    getClient.hgetall('current', function(err, reply) {
        if (err) {
            console.log(err);
            res.json({});
        } else {
            getClient.del('current');
            res.json(reply);
        }
    });
});

app.get('/compare', function(req, res) {
    if (!lastTime) {
        res.json({});
    } else {
        getClient.hgetall('60-' + lastTime, function(err, reply) {
            if (err) {
                console.log(err);
                res.json({});
            } else {
                res.json(reply);
            }
        });
    }
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
