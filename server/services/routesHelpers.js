var configAccess = require('../config');

exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        //console.log(accessLevel, req.user.userRole, configAccess.accessLevels.admin)
        if(!(accessLevel && (req.user.userRole === accessLevel || req.user.userRole == configAccess.accessLevels.admin))) {
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};