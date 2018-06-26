var mongoose = require('mongoose');
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');

var Request = require("../models/requests");

// The authentication controller.
var RequestController = {};

// Get list of request
RequestController.getRequests = function(req, res) {
  Request.find({}, function(err, requests) {
    if(err) {
      return res.status(400).json({success: false, msg: 'Get list of requests failed'});
    } else {
      res.json({success: true, requests: requests});
      console.log(requests)
/*      for (var i = 0, len = requests.length; i < len; i++) {
        console.log(i) 
      }*/
    }
  })
};

// Get list of request
RequestController.postRequest = function(req, res) {
  if (!req.body.userId) {
    res.json({success: false, msg: 'Please pass an userId'});
  } else if (!req.body.datePlay || !req.body.timePlay || !req.body.nbPlayer || !req.body.lvlPlayer || !req.body.address || !req.body.postcode || !req.body.city ) {
    res.json({succress: false, msg: 'One or several fields are empty'})
  }
  else {
    var newRequest = new Request({
      userId:    req.body.userId,
      datePlay: req.body.datePlay,
      timePlay: req.body.timePlay,
      nbPlayer: req.body.nbPlayer,
      lvlPlayer: req.body.lvlPlayer,
      address: req.body.address,
      postcode: req.body.postcode,
      city: req.body.city
    });
    // save the user
    newRequest.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({success: false, msg: 'Email already exists.', errorEmail: true});
      }
      res.status(201).json({success: true, msg: 'Successful created new request.'});
    });
  }
};


module.exports = RequestController;