const Joi = require('joi');

exports.signupSchema = Joi.object().keys({
  email: Joi.string()
    .max(50)
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required(),
});
