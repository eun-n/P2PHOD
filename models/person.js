'use strict';
var bcrypt = require('bcrypt');

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
        models.person.hasMany(models.post);
      },
      authenticate: function(username, password, callback) {
        // find the user in the database
        this.find({where: {username: username}}).then(function(person) {
          // if there's no username with the username then raise a 'no user' error
          if (!person) callback(null, false);
          // if a user record comes back, compare the password to the hash
          bcrypt.compare(password, person.password, function(err, result) {
            // if there's a database error then raise 'sorry, something went wrong'
            if (err) return callback(err);
            // the passwords match. return the user info
            if (result) {
              callback(null, person);
            // otherwise, raise a 'wrong password' error
            // the password is incorrect.
            }  else {
              callback(null, false);
            }
          })
        }).catch(callback);
      }
    }, 
    hooks: {
      beforeCreate: function(person, options, callback) {
        // if the user gave a password then hash it
        console.log(person.password);
        if (person.password) {
          // hash the plaintext password before saving.
          bcrypt.hash(person.password, 10, function(err, hash) {
            if (err) return callback(err);
            person.password = hash;
            callback(null, person);
          });
        // the user didn't provide a password
        } else {
          callback(null, person);
        }
      }
    }
  });
  return person;
};