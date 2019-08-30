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
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        location: {
            type: { type: String },
            coordinates: [Number]
        }
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

RequestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Request', RequestSchema);
