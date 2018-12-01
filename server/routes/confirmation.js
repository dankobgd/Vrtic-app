const express = require('express');
const ConfirmationController = require('../controllers/confirmation');

const router = express.Router();

router.post('/', ConfirmationController.confirmEmail);

module.exports = router;
