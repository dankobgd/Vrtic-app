const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    auth_method: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    googleID: {
      type: DataTypes.STRING,
    },
    facebookID: {
      type: DataTypes.STRING,
    },
  });

  /* eslint no-param-reassign: 0 */
  User.hook('beforeCreate', (user, options) => {
    if (user.auth_method === 'local') {
      return bcrypt
        .hash(user.password, 10)
        .then(hash => {
          user.password = hash;
        })
        .catch(err => {
          throw err;
        });
    }
  });

  User.prototype.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
