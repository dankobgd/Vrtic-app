const { wrap } = require('../middleware/middleware');
const { User } = require('../models');
const { signToken } = require('../utils/signToken');

module.exports.login = wrap(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ err: 'No user with that email found' });
  }

  if (!user.comparePassword(password)) {
    return res.status(400).json({ err: 'Invalid password' });
  }

  // respond with JWT
  const token = signToken(req.user);
  res.status(200).json({ token });
});
