var redis = require('redis');

var redisHost = 'john-redis.2wlafm.ng.0001.usw2.cache.amazonaws.com';
var redisPort = 6379;

var client = redis.createClient(redisPort, redisHost);

client.on('connect', function() {
    console.log('connected');
});

client.on('message', function (channel, message) {
    console.log(channel + ": " + message)
});

client.subscribe('loc_0_p90');
client.subscribe('loc_1_p90');
client.subscribe('loc_2_p90');
client.subscribe('loc_3_p90');
