const express = require('express');
const passport = require('passport');
require('../passport/passport');
const LoginController = require('../controllers/login');
const { validateBody } = require('../validation');
const { loginSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/', validateBody(loginSchema), passport.authenticate('local', { session: false }), LoginController.login);

module.exports = router;
