var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  email: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
  facebookId: {
        type: String,
        required: false
  },
  firstname: {
        type: String,
        required: true
    },
  lastname: {
        type: String,
        required: true
    },
  birthday: {
        type: String,
        required: false
    },
  address: {
        type: String,
        required: false
    },
  postcode: {
        type: Number,
        required: false
    },
  city: {
        type: String,
        required: false
    },
  picture: {
        type: String,
        required: false
    },
  created_on: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        user.cryptPassword(user.password, function(err, crypted) {
            user.password = crypted;
            return next();
        });
    }
    return next();
});

UserSchema.methods.cryptPassword = function (password, crypted) {
    bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                if (err) {
                    return crypted(err);
                }
                crypted(null, hash);
            });
     });
} 

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);