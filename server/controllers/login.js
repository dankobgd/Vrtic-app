const { wrap } = require('../middleware/middleware');
const { signToken } = require('../utils/signToken');

module.exports.login = wrap((req, res, next) => {
  console.log('SUCCESSFUL LOGIN');

  // respond with JWT
  const token = signToken(req.user);
  res.status(200).json({ token });
});
