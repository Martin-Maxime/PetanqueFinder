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
    res.json({success: false, msg: 'Please pass email and password.'});
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
        return res.status(400).json({success: false, msg: 'Email already exists.', errorEmail: true});
      }
      res.status(201).json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.', userNotFound: true});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // 1 week
          });
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, user: user});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.', errorPassword: true});
        }
      });
    }
  });
});

router.put('/user/account', function(req, res) {
  User.findOne({
    _id: req.body.id,
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.', userNotFound: true});
    } 
    else if (req.body.password) {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          user.cryptPassword(req.body.new_password, function(err, crypted) {
            User.updateOne({_id: req.body.id}, {$set: 
            {
              password: crypted,
            }
            }, function(err, result) {
              if (err) {
                return res.status(400).json({success: false, msg: 'Update failed'});
              } else {
                res.json({success: true, msg: 'password is updated', accountUpdated: true});
              }          
            })
          });
          // return the information including token as JSON
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.', errorPassword: true});
        }
      });
    } else if (req.body.email) {
        User.updateOne({_id: req.body.id}, {$set: 
        {
          firstname: req.body.first_name,
          lastname: req.body.last_name,
          email:    req.body.email,
          birthday: req.body.birthday,
          address: req.body.address,
          postcode: req.body.postcode,
          city: req.body.city
        }
        }, function(err, result) {
          if (err) {
            return res.status(400).json({success: false, msg: 'Update failed', accountUpdated: false});
          } else {
            res.json({success: true, msg: 'Account informations are updated', accountUpdated: true});
          }          
        })
    }
  });
});

router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
});

router.get('/users', function(req, res) {
  User.find({}, 'firstname lastname', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
});

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