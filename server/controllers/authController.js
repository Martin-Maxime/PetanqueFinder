var mongoose = require("mongoose");
var config = require("../config/database");
var configAccess = require("../config");
var express = require("express");
var jwt = require("jsonwebtoken");

var User = require('../models/users');

// The authentication controller.
var AuthController = {};

AuthController.signup = function(req, res) {
<<<<<<< HEAD
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: "Please pass email and password." });
  } else if (!req.body.email) {
    res.json({ succress: false, msg: "Please pass email." });
  } else {
    var newUser = new User({
      email: req.body.email,
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
        return res.status(400).json({
          success: false,
          msg: "Email already exists.",
          errorEmail: true
        });
      }
      res
        .status(201)
        .json({ success: true, msg: "Successful created new user." });
    });
  }
};

AuthController.login = function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
          userNotFound: true
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(
              { id: user._id, email: user.email },
              configAccess.keys.secret,
              {
                expiresIn: 86400 // 24 hours
              }
            );
            // return the information including token as JSON
            res.json({ success: true, token: "Bearer " + token, user: user });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
              errorPassword: true
            });
          }
        });
      }
    }
  );
};

AuthController.fbLogin = function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (!user) {
        var newUser = new User({
          email: req.body.email,
          password: req.body.userID,
          facebookId: req.body.userID,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          picture: req.body.picture
        });
        // save the user
        newUser.save(function(err, newUser) {
          if (err) {
            console.log(err);
            return res.status(400).json({
              success: false,
              msg: "Email already exists.",
              errorEmail: true
            });
          }
          console.log(newUser);
          const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            configAccess.keys.secret,
            {
              expiresIn: 86400 // 1 week
            }
          );
          // return the information including token as JSON
          //res.json({success: true, token: 'JWT ' + token, user: user});
          res.status(201).json({
            success: true,
            msg: "Successful created new user.",
            token: "Bearer " + token,
            user: newUser
          });
        });
      } else if (!user.facebookId) {
        User.updateOne(
          { email: req.body.email },
          { $set: { facebookId: req.body.userID } },
          function(err, result) {
            if (err) {
              return res.status(400).json({
                success: false,
                msg: "FacebookId update failed",
                accountUpdated: false
              });
            } else {
              res.json({
                success: true,
                msg: "FacebookId is updated",
                accountUpdated: true
              });
            }
          }
        );
        const token = jwt.sign(
          { id: user._id, email: user.email },
          configAccess.keys.secret,
          {
            expiresIn: 86400 // 1 week
          }
        );
        // return the information including token as JSON
        res.json({ success: true, token: "Bearer " + token, user: user });
      } else {
        console.log("user exist");
        const token = jwt.sign(
          { id: user._id, email: user.email },
          configAccess.keys.secret,
          {
            expiresIn: 86400 // 1 week
          }
        );
        // return the information including token as JSON
        res.json({ success: true, token: "Bearer " + token, user: user });
      }
    }
  );
=======
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: 'Please pass email and password.' });
    } else if (!req.body.email) {
        res.json({ succress: false, msg: 'Please pass email.' });
    } else {
        var newUser = new User({
            email: req.body.email,
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
                return res.status(400).json({ success: false, msg: 'Email already exists.', errorEmail: true });
            }
            res.status(201).json({ success: true, msg: 'Successful created new user.' });
        });
    }
};

AuthController.login = function(req, res) {
    User.findOne(
        {
            email: req.body.email
        },
        function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.', userNotFound: true });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        const token = jwt.sign({ id: user._id, email: user.email }, configAccess.keys.secret, {
                            expiresIn: 86400 // 1 week
                        });
                        // return the information including token as JSON
                        res.json({ success: true, token: 'Bearer ' + token, user: user });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.', errorPassword: true });
                    }
                });
            }
        }
    );
};

AuthController.fbLogin = function(req, res) {
    User.findOne(
        {
            email: req.body.email
        },
        function(err, user) {
            if (!user) {
                var newUser = new User({
                    email: req.body.email,
                    password: req.body.userID,
                    facebookId: req.body.userID,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    picture: req.body.picture
                });
                // save the user
                newUser.save(function(err, newUser) {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ success: false, msg: 'Email already exists.', errorEmail: true });
                    }
                    console.log(newUser);
                    const token = jwt.sign({ id: newUser._id, email: newUser.email }, configAccess.keys.secret, {
                        expiresIn: 86400 // 1 week
                    });
                    // return the information including token as JSON
                    //res.json({success: true, token: 'JWT ' + token, user: user});
                    res.status(201).json({ success: true, msg: 'Successful created new user.', token: 'Bearer ' + token, user: newUser });
                });
            } else if (!user.facebookId) {
                User.updateOne({ email: req.body.email }, { $set: { facebookId: req.body.userID } }, function(err, result) {
                    if (err) {
                        return res.status(400).json({ success: false, msg: 'FacebookId update failed', accountUpdated: false });
                    } else {
                        res.json({ success: true, msg: 'FacebookId is updated', accountUpdated: true });
                    }
                });
                const token = jwt.sign({ id: user._id, email: user.email }, configAccess.keys.secret, {
                    expiresIn: 86400 // 1 week
                });
                // return the information including token as JSON
                res.json({ success: true, token: 'Bearer ' + token, user: user });
            } else {
                console.log('user exist');
                const token = jwt.sign({ id: user._id, email: user.email }, configAccess.keys.secret, {
                    expiresIn: 86400 // 1 week
                });
                // return the information including token as JSON
                res.json({ success: true, token: 'Bearer ' + token, user: user });
            }
        }
    );
>>>>>>> 2d1e85be70bf96c197f23407aa88726ef31e4f16
};

module.exports = AuthController;
