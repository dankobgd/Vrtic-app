const express = require('express');
const SignupController = require('../controllers/signup');

const router = express.Router();

router.post('/', SignupController.signup);

module.exports = router;
