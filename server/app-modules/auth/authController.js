const { User } = require('../../models');
const { sendConfirmationEmail } = require('../../services/mailer');
const { signToken } = require('../../utils/signToken');
const generateToken = require('../../utils/generateToken');

// Register local
async function signup(req, res, next) {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) {
    return res.status(403).json({ error: 'Email already exists' });
  }
  const hexToken = await generateToken();
  const newUser = await User.create({ email, password, auth_method: 'local', confirmationToken: hexToken });
  sendConfirmationEmail(email, hexToken);
  const token = signToken(newUser);
  res.status(200).json({ token });
}

// Login local
async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ err: 'No user with that email found' });
  }
  if (!user.comparePassword(password)) {
    return res.status(400).json({ err: 'Invalid password' });
  }
  const token = signToken(req.user);
  res.status(200).json({ token });
}

// Confirm account with email
async function confirmEmail(req, res, next) {
  const { token: confirmationToken } = req.body;
  const user = await User.findOne({ where: { confirmationToken } });
  user.update({ confirmationToken: '', isAccountConfirmed: true });
  const token = signToken(user);
  res.status(200).json({ token });
}

// Google Oauth
async function googleOauth(req, res, next) {
  const token = signToken(req.user);
  res.status(200).json({ token });
}

// Facebook Oauth
async function facebookOauth(req, res, next) {
  const token = signToken(req.user);
  res.status(200).json({ token });
}

module.exports = {
  signup,
  login,
  confirmEmail,
  googleOauth,
  facebookOauth,
};
