const path = require('path');
const { Op } = require('sequelize');

module.exports = {
  port: 3001,
  db: {
    database: process.env.DB_NAME || 'vrtic-app',
    user: process.env.DB_USER || null,
    password: process.env.DB_PASSWORD || null,
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../db-storage/vrtic-app.db'),
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
