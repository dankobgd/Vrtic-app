const Joi = require('joi');
const opts = require('./errorMessages');

// validate request query params
module.exports.validateParam = (schema, name) => (req, res, next) => {
  Joi.validate({ param: req.params[name] }, schema, opts, (err, val) => {
    if (err) {
      return res.status(400).json(err);
    }

    req.params[name] = val.params;
    next();
  });
};

// validate request body
module.exports.validateBody = schema => (req, res, next) => {
  Joi.validate(req.body, schema, opts, (err, val) => {
    if (err) {
      return res.status(400).json(err);
    }

    req.body = val;
    next();
  });
};
