const path = require('path');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const { sequelize } = require('./db-models');
const middleware = require('./middleware/middleware');
const config = require('./config/config');

dotenv.config();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
// });

const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach(file => {
  const routerFile = require(path.join(routesDir, file));
  const routeName = `${file.slice(0, -3)}`;
  let routeEndpoint;

  if (file === 'signup.js' || file === 'login.js') {
    routeEndpoint = `/api/auth/${routeName}`;
  } else {
    routeEndpoint = `/api/${routeName}`;
  }

  app.use(routeEndpoint, routerFile);
});

app.use(middleware.forward404);
app.use(middleware.errorHandler);

sequelize.sync().then(() => {
  console.log(`Sequelize sync -> App running on port ${config.port}`);
});

module.exports = app;
