const path = require('path');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const middleware = require('./middleware/middleware');
const config = require('./config/config');

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

const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach(file => {
  const routerFile = require(path.join(routesDir, file));
  const route = `${file.slice(0, -3)}`;
  let endpoint;

  if (route === 'signup' || route === 'login' || route === 'confirmation') {
    endpoint = `/api/auth/${route}`;
  } else if (route === 'google' || route === 'facebook') {
    endpoint = `/api/auth/oauth/${route}`;
  } else {
    endpoint = `/api/${route}`;
  }

  app.use(endpoint, routerFile);
});

app.use(middleware.forward404);
app.use(middleware.errorHandler);

sequelize.sync({ force: true }).then(() => {
  console.log(`DB sync`);
});

module.exports = app;
