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
    <a>http://localhost:3000/api/confirmation/${token}</a>
    `,
  };

  transport.sendMail(emailOpts, (err, info) => {
    if (err) return console.log('transport.send.email error: ', err);
    console.log('success info: ', info);
  });
};
