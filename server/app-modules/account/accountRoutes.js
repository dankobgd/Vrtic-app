const router = require('express').Router();
const AccountController = require('./accountController');
const { wrap } = require('../../middleware/middleware');
const { validateBody } = require('../../validation');
const { forgotPasswordSchema, resetPasswordSchema } = require('../../validation/schemas');

router.post('/forgotPassword', validateBody(forgotPasswordSchema), wrap(AccountController.forgotPassword));
router.post('/resetToken', wrap(AccountController.resetToken));
router.post('/resetPassword', validateBody(resetPasswordSchema), wrap(AccountController.resetPassword));

module.exports = router;
