const path = require('path');
const { Op } = require('sequelize');

require('dotenv').config();

module.exports = {
  port: 3001,
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
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
      },
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
};
