const router = require('express').Router();
const passport = require('passport');
require('../../passport/passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ msg: 'dashboard protected data' });
});

module.exports = router;
