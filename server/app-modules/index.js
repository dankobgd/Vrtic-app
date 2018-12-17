const router = require('express').Router();
const authRoutes = require('./auth/authRoutes');
const accountRoutes = require('./account/accountRoutes');
const secret = require('./dashboard/secret');

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/secret', secret);

module.exports = router;
