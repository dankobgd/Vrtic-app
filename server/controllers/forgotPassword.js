const { wrap } = require('../middleware/middleware');
const { User } = require('../models');
const { sendForgotPasswordEmail } = require('../services/mailer');
const generateToken = require('../utils/generateToken');

module.exports.forgotPassword = wrap(async (req, res, next) => {
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
});
