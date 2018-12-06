const express = require('express');
const ResetTokenController = require('../controllers/resetToken');

const router = express.Router();

router.post('/', ResetTokenController.validateToken);

module.exports = router;
