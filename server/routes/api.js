var express = require('express');
var router = express.Router();

var config = require('../config/database'),
    configAccess = require('../config'),
    allowOnly = require('../services/routesHelpers').allowOnly,
    passport = require('passport'),
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController');
    RequestController = require('../controllers/RequestController');

var APIRoutes = function(passport) {

  router.post('/signup', AuthController.signup);
  router.post('/login', AuthController.login);
  router.post('/fblogin', AuthController.fbLogin);
  router.put('/user/account', UserController.updateAccount);
  router.get('/users', passport.authenticate('jwt', { session: false }), allowOnly(configAccess.accessLevels.admin, UserController.getUsers));
  router.delete('/users/:id', passport.authenticate('jwt', { session: false }), allowOnly(configAccess.accessLevels.admin, UserController.deleteUser));
  router.get('/request', RequestController.getRequests);
  router.post('/request', RequestController.postRequest);

  return router;
};

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

module.exports = APIRoutes;