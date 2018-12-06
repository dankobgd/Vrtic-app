const Sequelize = require('sequelize');
const { wrap } = require('../middleware/middleware');
const { User } = require('../models');
const { sendResetPasswordEmail } = require('../services/mailer');

const { Op } = Sequelize;

module.exports.resetPassword = wrap(async (req, res, next) => {
  const { token, password } = req.body;
  console.log('resetpw cntrlr req.body:', req.body);

  const user = await User.findOne({
    where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gte]: Date.now() } },
  });

  if (user) {
    // updated pw here and hash it...
    user.update({ password, resetPasswordToken: null, resetPasswordExpires: null });
    sendResetPasswordEmail(user.email);
    res.status(200).json({ msg: 'Password was reset successfuly' });
  } else {
    res.status(400).json({ err: 'Password reset token is invalid or has already expired' });
  }
});
