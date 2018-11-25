const path = require('path');
const fs = require('fs');
const createError = require('http-errors');

// Async catch error routes wrapper
module.exports.wrap = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Forward 404 not found error
module.exports.forward404 = (req, res, next) => {
  next(createError(404, 'Not Found'));
};

//  Error handler
module.exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ err });
};
