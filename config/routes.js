const {Router} = require('express');
const router = Router();

const {userController, homeController, errorController, hotelController} = require('../controllers');

router.use('/', homeController);
router.use('/users', userController);
router.use('/hotels', hotelController);
router.use('*', errorController);

module.exports = router;
