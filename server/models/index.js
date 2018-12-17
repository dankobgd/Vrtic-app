const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB successfuly');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
