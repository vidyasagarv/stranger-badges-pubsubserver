'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/**
*   Save badges to database
*   @param {Array} badges
*   @param {Function} callback
*/
exports.save = function(badges, callback) {
    if(!badges.length) return callback(null, null);
    var badge = badges.pop();
    redis.lpush('badges', JSON.stringify(badge), function(err){
        if(err) return callback(err, null);
        exports.save(badges, callback);
    });
};

/**
*   Trim down the redis list
*/
exports.trim = function() {
    redis.ltrim('badges', 0, 9);
}

/**
*   Send out badges to the broadcaster
*   @param {Array} badges
*   @param {Function} callback
*/
exports.send = function(badges, callback) {
    // Eliminate verbosity using oneliner like below
    // badges.forEach(function(badge){
    //     broadcast.send(badge);
    // });
    badges.forEach(broadcast.send);
    callback(null, null);
};

/**
*   Get 10 badges from redis
*   @param {Function} callback
*/
exports.get = function(callback){
    // redis.lrange('badges', 0, -1, callback);
    redis.lrange('badges', 0, -1, function(err, data){
        if (err) return callback(err, null);
        // data = data.map(JSON.parse);
        callback(null, data.map(JSON.parse));
    });
};