const Joi = require('joi');

module.exports.signupSchema = Joi.object().keys({
  email: Joi.string()
    .max(50)
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
});

Joi.any();

module.exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .max(50)
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(25)
    .required(),
});
