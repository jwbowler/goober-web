var redis = require('redis');

var redisHost = 'localhost';
var redisPort = 6379;

var client = redis.createClient(redisPort, redisHost);

client.on('connect', function() {
    console.log('connected');

    setInterval(function() {
        client.get("test", function(err, reply) {
            console.log(reply);
        });
    }, 1000)
});
