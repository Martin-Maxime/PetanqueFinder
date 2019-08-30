var mongoose = require('mongoose');
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');

var Request = require('../models/requests');
var User = require('../models/users');

// The authentication controller.
var RequestController = {};

// Get list of request
RequestController.getRequests = function(req, res) {
    console.log('enter');
    Request.find({})
        .populate('user')
        .exec(function(err, requests) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ success: true, requests: requests });
                console.log(requests);
            }
        });
};

// Post request
RequestController.postRequest = function(req, res) {
    console.log(req.user);
    console.log(req.body);
    if (!req.body.userId) {
        res.json({ success: false, msg: 'Please pass an userId' });
    } else if (
        !req.body.datePlay ||
        !req.body.timePlay ||
        !req.body.nbPlayer ||
        !req.body.lvlPlayer ||
        !req.body.address ||
        !req.body.postcode ||
        !req.body.city
    ) {
        res.json({ succress: false, msg: 'One or several fields are empty' });
    } else {
        console.log(req.body);
        User.findOne(
            {
                _id: req.body.userId
            },
            function(err, user) {
                if (err) throw err;

                if (!user) {
                    res.status(401).send({ success: false, msg: 'User not found.', userNotFound: true });
                } else {
                    var newRequest = new Request({
                        datePlay: req.body.datePlay,
                        timePlay: req.body.timePlay,
                        nbPlayer: req.body.nbPlayer,
                        lvlPlayer: req.body.lvlPlayer,
                        address: req.body.address,
                        postcode: req.body.postcode,
                        city: req.body.city,
                        user: user
                    });
                    // save the user
                    newRequest.save(function(err) {
                        if (err) {
                            console.log(err);
                            return res.status(400).json({ success: false, msg: 'Email already exists.', errorEmail: true });
                        }
                        res.status(201).json({ success: true, msg: 'Successful created new request.' });
                    });
                }
            }
        );
    }
};

module.exports = RequestController;
