const {Router} = require('express');
const {userService} = require('../services');
const config = require('../config/config');
const {msg} = require('../config/constants');
const {isGuest, isLogged, validate} = require('../middlewares');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('users/login',);
});

router.post('/login', isGuest, validate.user.login, (req, res) => {

    const cookieOptions = {maxAge: 1000 * 60 * 60, httpOnly: true}

    userService.login(req.body)
        .then((token) => {
            if (!token) {
                throw {message: msg.WRONG_CREDENTIALS};
            }
            return res
                .cookie(config.authCookie, token, cookieOptions)
                .redirect('/');
        })
        .catch((error) => {
            res.render('users/login', {message: error.message});
        });
});

router.get('/register', isGuest, (req, res) => {
    res.render('users/register');
});

router.post('/register', isGuest, validate.user.register, (req, res) => {
    userService.register(req.body)
        .then(() => {
            res.redirect('/users/login');
        })
        .catch(error => {
            res.render('users/register', {message: error.message});
        });
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(config.authCookie);
    res.redirect('/users/login');
});

router.get('/profile', isLogged, (req, res, next) => {
    userService.getUserById(req.user.id, true)
        .then((user) => {
            user.hotels = user.bookedHotels.reduce((acc, v)=>{
                acc.push(v.name);
                return acc;
            },[]).join(', ');

            res.render('users/profile', {...user});
        }).catch(next);

});

module.exports = router;
