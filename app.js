var express = require('express');
var http = require('http');
var sockjs = require('sockjs');
var redis = require('redis');


// Setup Sockjs

var sockjs_opts = {sockjs_url: 'http://cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs.min.js'};
var socket = sockjs.createServer(sockjs_opts);

socket.on('connection', function(conn) {
    console.log('Connected to Sockjs');

    // Setup Redis

    var redisHost = 'john-redis.2wlafm.ng.0001.usw2.cache.amazonaws.com';
    var redisPort = 6379;

    var client = redis.createClient(redisPort, redisHost);

    client.on('connect', function() {
        console.log('Connected to Redis');

        client.subscribe('stream');
    });

    client.on('message', function (channel, message) {
        console.log(channel + ": " + message)
        conn.write(message)
    });

    // var cell = 0;

    // setInterval(function() {
        // var col = Math.floor(cell/10);
        // var row = cell % 10;

        // message = "" + (col + 1) + "," + (row + 1) + "," + "HI";
        // conn.write(message);

        // cell += 1;
    // }, 1000);

});


// Setup webserver

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app)

socket.installHandlers(server, {prefix: '/stream'});

// var server = app.listen(8080, function () {
    // var host = server.address().address;
    // var port = server.address().port;

    // console.log('App listening at http://%s:%s', host, port);
// });

server.listen(80, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
