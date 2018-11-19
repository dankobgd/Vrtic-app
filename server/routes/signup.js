const express = require('express');
const SignupController = require('../controllers/signup');
const { validateBody } = require('../middleware/validation');
const { signupSchema } = require('../middleware/validation/schemas');

const router = express.Router();

router.post('/', validateBody(signupSchema), SignupController.signup);

module.exports = router;
