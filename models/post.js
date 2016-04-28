'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    personId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      models.post.belongsTo(models.person);

      }
    }
  });
  return post;
};