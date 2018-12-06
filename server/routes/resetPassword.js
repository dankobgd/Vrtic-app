const express = require('express');
const ResetPasswordController = require('../controllers/resetPassword');
const { validateBody } = require('../validation');
const { resetPasswordSchema } = require('../validation/schemas');

const router = express.Router();

router.post('/', validateBody(resetPasswordSchema), ResetPasswordController.resetPassword);

module.exports = router;
