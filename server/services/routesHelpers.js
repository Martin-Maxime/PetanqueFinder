exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        console.log(accessLevel, req.user.userRole)
        if(!(accessLevel && req.user.userRole === accessLevel)) {
        	console.log('enter '+ req.user.userRole)
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};