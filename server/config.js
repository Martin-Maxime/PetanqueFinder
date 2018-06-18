var config = module.exports;


var userRoles = config.userRoles = {
    admin: 1,
    user: 2
};

config.accessLevels = {
    user: userRoles.user,
    admin: userRoles.admin
};