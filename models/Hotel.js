const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const {constants} = require('../config/constants');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    freeRooms: {
        type: Number,
        min: constants.FREE_ROOMS_MIN,
        max: constants.FREE_ROOMS_MAX,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = mongoose.model('Hotel', hotelSchema);