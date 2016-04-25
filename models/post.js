'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        associate: function(models) {
  models.post.belongsTo(models.user);
}
      }
    }
  });
  return post;
};