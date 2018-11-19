const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { wrap } = require('../middleware/middleware');
const { signToken } = require('../utils/signToken');

module.exports.signup = wrap(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user with the same mail exists
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) {
    return res.status(403).json({ error: 'Email already exists' });
  }

  // create new user record in db
  const newUser = await User.create({ email, password, auth_method: 'local' });

  // respond with JWT
  const token = signToken(newUser);
  res.status(200).json({ token });
});
