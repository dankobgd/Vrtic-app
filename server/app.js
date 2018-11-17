const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const logger = require('morgan');

const app = express();

dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
})

app.use((req, res, next) => {
  next(createError(404));
})

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ err });
})


module.exports = app;
