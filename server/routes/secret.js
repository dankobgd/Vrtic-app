const express = require('express');
const passport = require('passport');
require('../passport/passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ msg: 'protected resource msg' });
});

module.exports = router;
