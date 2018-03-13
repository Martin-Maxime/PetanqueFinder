var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');


mongoose.connect(config.database);

var api = require('../routes/api.js');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

app.use('/api', api);

module.exports = app;
