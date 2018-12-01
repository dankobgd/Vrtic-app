const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { wrap } = require('../middleware/middleware');
const { signToken } = require('../utils/signToken');
const { sendConfirmationEmail } = require('../services/mailer');
const generateToken = require('../utils/generateToken');

module.exports.signup = wrap(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user with the same mail exists
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) {
    return res.status(403).json({ error: 'Email already exists' });
  }

  // generate hex token
  const hexToken = await generateToken();

  // create new user record in db
  const newUser = await User.create({ email, password, auth_method: 'local', confirmationToken: hexToken });

  // send confirmation email to the user
  sendConfirmationEmail(email, hexToken);

  // respond with JWT
  const token = signToken(newUser);
  res.status(200).json({ token });
});
