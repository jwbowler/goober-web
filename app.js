var express = require('express');
var http = require('http');
var sockjs = require('sockjs');
var redis = require('redis');


// Setup Sockjs

// var sockjs_opts = {sockjs_url: 'http://cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs.min.js'};
// var socket = sockjs.createServer(sockjs_opts);

// socket.on('connection', function(conn) {
    // console.log('Connected to Sockjs');

    // Setup Redis

    var redisHost = 'john-redis.2wlafm.ng.0001.usw2.cache.amazonaws.com';
    var redisPort = 6379;

    var subClient = redis.createClient(redisPort, redisHost);
    var getClient = redis.createClient(redisPort, redisHost);

    var lastTime = null;
    var currentTime = null;

    // subClient.on('connect', function() {
        // console.log('Connected to Redis');

        subClient.subscribe('stream');
        subClient.subscribe('time');
    // });

    subClient.on('message', function(channel, message) {
        if (channel == 'stream') {
            // var tokens = message.split('/');
            // var cell = tokens[0];
            // // var avg = tokens[1];
            // // var p90 = tokens[2];
            // // var timestamp = parseInt(tokens[3]);

            // // var batchAvg = 'none';
            // // if (currentTime) {
                // // batchAvg = getClient.hget(currentTime, cell);
            // // }

            // console.log(message);
            // // conn.write(message + '/' + batchAvg);
        }
        else if (channel == 'time') {
            var time = parseInt(message, 10);
            lastTime = currentTime
            currentTime = time

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

// });


// Setup webserver

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app)

// socket.installHandlers(server, {prefix: '/stream'});

server.listen(80, '0.0.0.0');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
