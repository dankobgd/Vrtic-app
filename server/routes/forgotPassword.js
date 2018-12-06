const express = require('express');
const ForgotPasswordController = require('../controllers/forgotPassword');
const { validateBody } = require('../validation');
const { forgotPasswordSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/', validateBody(forgotPasswordSchema), ForgotPasswordController.forgotPassword);

module.exports = router;
