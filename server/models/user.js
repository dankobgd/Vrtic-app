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
    isAccountConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
    },
  });

  /* eslint no-param-reassign: 0 */
  User.addHook('beforeCreate', (user, options) => {
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

  User.addHook('beforeUpdate', (user, options) => {
    if (user.auth_method === 'local' && user.changed('password')) {
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
    return bcrypt.compareSync(candidatePassword, this.password);
  };

  return User;
};
