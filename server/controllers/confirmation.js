const { User } = require('../models');
const { wrap } = require('../middleware/middleware');
const { signToken } = require('../utils/signToken');

module.exports.confirmEmail = wrap(async (req, res, next) => {
  const { token: confirmationToken } = req.body;

  const user = await User.findOne({ where: { confirmationToken } });
  user.update({ confirmationToken: '', isAccountConfirmed: true });

  const token = signToken(user);
  res.status(200).json({ token });
});
