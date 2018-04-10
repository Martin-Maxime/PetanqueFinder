var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/users");


router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password ) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else if (!req.body.email) {
    res.json({succress: false, msg: 'Please pass email.'})
  }
  else {
    var newUser = new User({
      email:    req.body.email,
      password: req.body.password,
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      birthday: req.body.birthday,
      address: req.body.address,
      postcode: req.body.postcode,
      city: req.body.city
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'Username or email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/users', function(req, res) {
  User.find({}, 'firstname', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
})

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;