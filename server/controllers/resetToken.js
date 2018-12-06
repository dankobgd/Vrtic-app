const Sequelize = require('sequelize');

const { wrap } = require('../middleware/middleware');
const { User } = require('../models');

const { Op } = Sequelize;

module.exports.validateToken = wrap(async (req, res, next) => {
  const { token } = req.body;

  const user = await User.findOne({
    where: { resetPasswordToken: token, resetPasswordExpires: { [Op.gt]: Date.now() } },
  });

  if (user) {
    res.status(200).json({ msg: 'Success, valid token' });
  } else {
    console.log('invalid token');
    res.status(400).json({ err: 'Password reset token is invalid or has already expired' });
  }
});
