const express = require('express');
const passport = require('passport');
require('../passport/passport');
const SignupController = require('../controllers/signup');
const { validateBody } = require('../validation');
const { signupSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/', validateBody(signupSchema), SignupController.signup);

module.exports = router;
