const { wrap } = require('../middleware/middleware');
const { signToken } = require('../utils/signToken');

module.exports.facebookOauth = wrap((req, res, next) => {
  const token = signToken(req.user);

  res.status(200).json({ token });
});
