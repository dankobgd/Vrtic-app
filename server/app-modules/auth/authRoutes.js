const router = require('express').Router();
const passport = require('passport');
const AuthController = require('./authController');
const { wrap } = require('../../middleware/middleware');
const { validateBody } = require('../../validation');
const { signupSchema, loginSchema } = require('../../validation/schemas');
require('../../passport/passport');

const localAuth = passport.authenticate('local', { session: false });
const googleOauth = passport.authenticate('GooglePlusToken', { session: false });
const facebookOauth = passport.authenticate('FacebookToken', { session: false });

router.post('/signup', validateBody(signupSchema), wrap(AuthController.signup));
router.post('/login', validateBody(loginSchema), localAuth, wrap(AuthController.login));
router.post('/confirmation', wrap(AuthController.confirmEmail));
router.post('/oauth/google', googleOauth, wrap(AuthController.googleOauth));
router.post('/oauth/facebook', facebookOauth, wrap(AuthController.facebookOauth));

module.exports = router;
