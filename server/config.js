var config = module.exports;

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

var userRoles = config.userRoles = {
    admin: 1,
    user: 2
};

config.accessLevels = {
    user: userRoles.user,
    admin: userRoles.admin
};