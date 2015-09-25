var express = require('express');
var redis = require('redis');


// Setup Redis

var redisHost = 'john-redis.2wlafm.ng.0001.usw2.cache.amazonaws.com';
var redisPort = 6379;

var client = redis.createClient(redisPort, redisHost);

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.on('message', function (channel, message) {
    console.log(channel + ": " + message)
});

client.subscribe('loc_0_p90');
client.subscribe('loc_1_p90');
client.subscribe('loc_2_p90');
client.subscribe('loc_3_p90');


// Setup webserver

var app = express();

app.get('/', function (req, res) {
      res.send('Hello World!');
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
