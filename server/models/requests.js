var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({

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
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Request', RequestSchema);