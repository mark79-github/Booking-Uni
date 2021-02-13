const {Router} = require('express');
const {hotelService} = require('../services');
const config = require('../config/config');
const {msg} = require('../config/constants');
const {isGuest, isLogged, validate, isCreator} = require('../middlewares');

const router = Router();

router.get('/', (req, res, next) => {
    hotelService.getAll()
        .then((hotels) => {
            res.render('home/home', {hotels});
        }).catch(next);
});

router.get('/create', isLogged, (req, res) => {
    res.render('hotels/create',);
});

router.post('/create', isLogged, (req, res, next) => {
    hotelService.create(req.body, req.user.id)
        .then((hotel) => {
            res.redirect('/');
        }).catch(next);
});

router.get('/details/:hotelId', isLogged, isCreator, (req, res, next) => {
    hotelService.getById(req.params.hotelId)
        .then((hotel) => {
            res.render('hotels/details', {...hotel});
        })
        .catch(next);
});

router.get('/edit/:hotelId', isLogged, (req, res, next) => {
    hotelService.getById(req.params.hotelId)
        .then((hotel) => {
            res.render('hotels/edit', {...hotel});
        }).catch(next);
});

router.post('/edit/:hotelId', isLogged, (req, res, next) => {
    hotelService.edit(req.params.hotelId, req.body)
        .then(() => {
            res.redirect(`/hotels/details/${req.params.hotelId}`);
        }).catch(next);
});

router.get('/delete/:hotelId', isLogged, (req, res, next) => {
    hotelService.remove(req.params.hotelId)
        .then(() => {
            res.redirect('/hotels')
        }).catch(next);
});

router.get('/book/:hotelId', isLogged,  async (req, res, next) => {

    try {
        const hotel = await hotelService.book(req.params.hotelId, req.user.id);
        res.redirect(`/hotels/details/${hotel._id}`);
    } catch (e) {
        next(e)
    }

    // hotelService.book(req.params.hotelId, req.user.id)
    //     .then((hotel) => {
    //         console.log('hotel1', hotel);
    //         res.redirect(`/hotels/details/${hotel._id}`);
    //     })
    //     .catch(next);

});

module.exports = router;
