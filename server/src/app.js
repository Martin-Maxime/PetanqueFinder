var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');


mongoose.connect(config.database);

var api = require('../routes/api.js');

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.use(passport.initialize());

api.get('/', function(req, res) {
  res.send('Page under construction.');
});

api.use('/api', api);