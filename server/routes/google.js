const express = require('express');
const passport = require('passport');
require('../passport/passport');
const GoogleOauthController = require('../controllers/google');

const router = express.Router();

router.post('/', passport.authenticate('GooglePlusToken', { session: false }), GoogleOauthController.auth);

module.exports = router;
