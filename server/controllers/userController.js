var mongoose = require("mongoose");
var config = require("../config/database");
var express = require("express");
var jwt = require("jsonwebtoken");

var User = require("../models/users");

// The authentication controller.
var UserController = {};

// Update user's informations
UserController.updateAccount = function(req, res) {
  User.findOne(
    {
      _id: req.body.id
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res
          .status(401)
          .send({
            success: false,
            msg: "Authentication failed. User not found.",
            userNotFound: true
          });
      } else if (req.body.password) {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            user.cryptPassword(req.body.new_password, function(err, crypted) {
              User.updateOne(
                { _id: req.body.id },
                {
                  $set: {
                    password: crypted
                  }
                },
                function(err, result) {
                  if (err) {
                    return res
                      .status(400)
                      .json({ success: false, msg: "Update failed" });
                  } else {
                    res.json({
                      success: true,
                      msg: "password is updated",
                      accountUpdated: true
                    });
                  }
                }
              );
            });
            // return the information including token as JSON
          } else {
            res
              .status(401)
              .send({
                success: false,
                msg: "Authentication failed. Wrong password.",
                errorPassword: true
              });
          }
        });
      } else if (req.body.email) {
        User.updateOne(
          { _id: req.body.id },
          {
            $set: {
              firstname: req.body.first_name,
              lastname: req.body.last_name,
              email: req.body.email,
              birthday: req.body.birthday,
              address: req.body.address,
              postcode: req.body.postcode,
              city: req.body.city
            }
          },
          function(err, result) {
            if (err) {
              return res
                .status(400)
                .json({
                  success: false,
                  msg: "Update failed",
                  accountUpdated: false
                });
            } else {
              res.json({
                success: true,
                msg: "Account informations are updated",
                accountUpdated: true
              });
            }
          }
        );
      }
    }
  );
};

// Get list of users
UserController.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Get list of users failed" });
    } else {
      res.json({ success: true, users: users });
    }
  });
};

// Delete user
UserController.deleteUser = function(req, res) {
  console.log(req.params.id);
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) {
      return res.status(500).send(err);
    } else {
      const response = {
        message: "User successfully deleted",
        id: req.params.id
      };
      return res.status(200).send(response);
    }
  });
};

module.exports = UserController;
