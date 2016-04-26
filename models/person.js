'use strict';
module.exports = function(sequelize, DataTypes) {
  var person = sequelize.define('person', {
    username: DataTypes.STRING,
    language: DataTypes.STRING,
    location: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return person;
};