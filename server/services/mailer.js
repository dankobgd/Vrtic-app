const nodemailer = require('nodemailer');
const config = require('../config/config');

function setupTransport() {
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

module.exports.sendConfirmationEmail = function(toAddress, token) {
  const transport = setupTransport();

  const emailOpts = {
    from: config.email.from,
    to: toAddress,
    subject: 'Welcome to app',
    text: 'Welcome to app',
    html: `
    <p>Welcome to vrtic-app, please confirm your email by clicking the link bellow</p>
    <a>http://localhost:3000/confirmation/${token}</a>
    `,
  };

  transport.sendMail(emailOpts, (err, info) => {
    if (err) return console.log('Send email error: ', err);
    console.log('Success email ID: ', info.messageId);
  });
};

module.exports.sendForgotPasswordEmail = function(toAddress, token) {
  const transport = setupTransport();

  const emailOpts = {
    from: config.email.from,
    to: toAddress,
    subject: 'Reset Password',
    text: 'Reset Password',
    html: `
    <div>You are recieving this because you (or someone else) have requested the reset of password for your account.</div>
    <div>Please click the following link, or paste this into your browser to complete the password reset process.</div><br>
    <a>http://localhost:3000/resetPassword/${token}</a>
    <br><div>If you did not request this, please ignore this email and your password will remain unchanged.</div>`,
  };

  transport.sendMail(emailOpts, (err, info) => {
    if (err) return console.log('Send email error: ', err);
    console.log('Success email ID: ', info.messageId);
  });
};

module.exports.sendResetPasswordEmail = function(toAddress) {
  const transport = setupTransport();

  const emailOpts = {
    from: config.email.from,
    to: toAddress,
    subject: 'Password changed',
    text: 'Password changed',
    html: `
    <div>Your password for the account ${toAddress} has been changed successfuly!</div>`,
  };

  transport.sendMail(emailOpts, (err, info) => {
    if (err) return console.log('Send email error: ', err);
    console.log('Success email ID: ', info.messageId);
  });
};
