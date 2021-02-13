const {hotelService} = require('../../services');

module.exports = async (req, res, next) => {
    if (req.user) {
        hotelService.getById(req.params.hotelId)
            .then((hotel) => {
                res.locals.isOwner = hotel.owner.toString() === req.user.id.toString();
                res.locals.isBooked = hotel.users.some((value) => {
                    return value._id.toString() === req.user.id.toString();
                });
            })
            .catch((error) => next(error));
    }

    next();
}