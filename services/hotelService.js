const {Hotel, User} = require('../models');
const {constants} = require('../config/constants');

async function create(data, userId) {
    await User.findById(userId)
        .then(user => {
            let hotel = new Hotel(data);
            hotel.owner = user;

            return Promise.all([user, hotel.save()]);
        }).then(([user, h]) => {
            user.offeredHotels.push(h._id);

            return Promise.all([h, user.save()]);
        })
}

function edit(hotelId, data) {
    return Hotel.findByIdAndUpdate(hotelId, data);
}

function getAll() {
    return Hotel.find({}).sort({'freeRooms': -1}).lean();
}

function getById(hotelId) {
    return Hotel.findById(hotelId).lean();
}

function remove(hotelId) {
    return Hotel.findByIdAndDelete(hotelId);
}

async function book(hotelId, userId) {
    let hotel = await Hotel.findById(hotelId);
    let user = await User.findById(userId);

    if (!hotel || !user) {
        throw {message: "Invalid data"}
    }

    if (+hotel.freeRooms <= constants.FREE_ROOMS_MIN) {
        throw {message: "No free rooms"}
    }

    hotel.users.push(user);
    hotel.freeRooms = Number(hotel.freeRooms) - 1;
    user.bookedHotels.push(hotel);

    hotel.save();
    user.save();

    return hotel;

}

module.exports = {
    create,
    edit,
    remove,
    book,
    getAll,
    getById,
}
