const path = require('path');
const { Op } = require('sequelize');
require('dotenv').config();

// NODE_ENV
const ENV = process.env.NODE_ENV || 'development';

// Default configuration
const defaultConfig = {
  port: process.env.PORT || 3001,
};

// Development configuration
const developmentConfig = {
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
  },
  db: {
    database: process.env.DB_NAME || 'vrtic-database',
    user: process.env.DB_USER || null,
    password: process.env.DB_PASSWORD || null,
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../../../SQLite3 DB/vrtic-database.db'),
      operatorsAliases: Op,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
};

// Production configuration
const productionConfig = { ...developmentConfig };

// Get proper config based on environment
function getEnvironmentConfig(env) {
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    default:
      return productionConfig;
  }
}

module.exports = {
  ...defaultConfig,
  ...getEnvironmentConfig(ENV),
};
