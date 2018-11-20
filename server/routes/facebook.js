const express = require('express');
const passport = require('passport');
require('../passport/passport');
const FacebookOauthController = require('../controllers/facebook');

const router = express.Router();

router.post('/', passport.authenticate('FacebookToken', { session: false }), FacebookOauthController.facebookOauth);

module.exports = router;
