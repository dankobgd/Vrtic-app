const express = require('express');
const passport = require('passport');
require('../passport/passport');
const LoginController = require('../controllers/login');
const { validateBody } = require('../middleware/validation');
const { signupSchema } = require('../middleware/validation/schemas');

const router = express.Router();

router.post('/', validateBody(signupSchema), passport.authenticate('local', { session: false }), LoginController.login);

module.exports = router;
