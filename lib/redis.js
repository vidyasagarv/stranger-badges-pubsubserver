'use strict';

var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

client.on('error', function(err){
    throw err;
});

module.exports = client;