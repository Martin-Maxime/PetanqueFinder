/* jshint node: true */
'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./../models/users'),
    config = require('./../config');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;
    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        User.findOne({
            email: JWTPayload.email
          }, function(err, user) {
                if(!user) {
                    callback(null, false);
                    return;
                }
                callback(null, user);
            });
/*        User.findOne( {email: JWTPayload.email  })
            .then(function(user) {
                console.log(user)
                if(!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });*/
    }));
}


module.exports = hookJWTStrategy;