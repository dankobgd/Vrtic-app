const JWT = require('jsonwebtoken');

module.exports.signToken = user => {
  const token = JWT.sign(
    {
      iss: 'Vrtic-App',
      sub: user.id,
      iat: new Date().getTime(), // current time
      epx: new Date().setDate(new Date().getDate() + 1), // current + 1 day
    },
    process.env.JWT_SECRET
  );

  return token;
};
