const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/hotels');
});

module.exports = router;
