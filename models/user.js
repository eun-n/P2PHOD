'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
       }
    },
    language: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        associate: function(models) {
  models.user.hasMany(models.post);
}
      }
    }
  });
  return user;
};