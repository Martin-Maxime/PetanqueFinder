var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({

  userId: {
        type: String,
        required: true
    },
  datePlay: {
        type: Date,
        required: true
  },
  timePlay: {
        type: String,
        required: true
  },
  nbPlayer: {
        type: Number,
        required: true
  },
  lvlPlayer: {
        type: String,
        required: true
  },
  address: {
        type: String,
        required: true
  },
  postcode: {
        type: Number,
        required: false
    },
  city: {
        type: String,
        required: false
    },
  created_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema);