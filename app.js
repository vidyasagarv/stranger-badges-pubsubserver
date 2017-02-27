'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');
var port = process.env.PORT || 8000;

app.use(express.json());

app.post('/', badges.save, badges.send);
    // function(req, res){
    // res.send('\ndone\n\n');}

app.get('/badges', badges.get);

app.listen(port, function(){
    console.log('Server is listening on port on %d', port);
});