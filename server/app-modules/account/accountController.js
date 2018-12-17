const Sequelize = require('sequelize');
const { User } = require('../../models');
const { sendForgotPasswordEmail, sendResetPasswordEmail } = require('../../services/mailer');
const generateToken = require('../../utils/generateToken');

const { Op } = Sequelize;

// Forgot password - ask for reset process
async function forgotPassword(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const hexToken = await generateToken();
    sendForgotPasswordEmail(email, hexToken);
    user.update({ resetPasswordToken: hexToken, resetPasswordExpires: Date.now() + 3600000 });
    res.status(200).json({ msg: 'Success, reset password email sent' });
  } else {
    res.status(400).json({ err: "User with this email can't be found" });
  }
}

// Validate reset password token
async function resetToken(req, res, next) {
  const { token } = req.body;
  const user = await User.findOne({
    where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gt]: Date.now() } },
  });
  if (user) {
    res.status(200).json({ msg: 'Success, valid token' });
  } else {
    res.status(400).json({ err: 'Password reset token is invalid or has already expired' });
  }
}

// Reset password
async function resetPassword(req, res, next) {
  const { token, password } = req.body;
  const user = await User.findOne({
    where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gte]: Date.now() } },
  });
  if (user) {
    user.update({ password, resetPasswordToken: null, resetPasswordExpires: null });
    sendResetPasswordEmail(user.email);
    res.status(200).json({ msg: 'Password was reset successfuly' });
  } else {
    res.status(400).json({ err: 'Password reset token is invalid or has already expired' });
  }
}

module.exports = {
  forgotPassword,
  resetToken,
  resetPassword,
};
