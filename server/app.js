const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const middleware = require('./middleware/middleware');
const apiRouter = require('./app-modules');

dotenv.config();
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
// });

app.use('/api', apiRouter);

app.use(middleware.forward404);
app.use(middleware.errorHandler);

sequelize.sync({ force: true }).then(() => {
  console.log(`DB sync`);
});

module.exports = app;
