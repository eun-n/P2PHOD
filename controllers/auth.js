var express = require('express');
var router = express.Router();
var db = require('../models');
var flash = require('express-flash');
var app = express();

 app.use(flash());

router.post('/logout', function(req, res) {
  req.currentUser = false;
  res.locals.currentUser = false;
  res.redirect('/');
});

router.post('/signin', function(req, res) {
  // proving we get the username and password
  var person = req.body.username;
  var pass = req.body.password;
  db.person.authenticate(person, pass, function(err, person) {
    if (person) {
      req.session.personId = person.id;
      console.log('success', 'Successfully logged in.');
      currentUser = person;
      console.log(currentUser);
      res.redirect('/posts');
    }
  });
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  db.person.findOrCreate({
  	where: {
  		username: req.body.username,
  	},
  	defaults: {
  		password: req.body.password
  	}
  }).spread(function(user, isNew) {
  	if (isNew) {
    	res.redirect('/posts');
  	} else if (db.person.find({where: {username:req.body.username}}) != null) {
  		console.log("danger");
  		req.flash('danger', 'Username already taken. Please choose another.')
    	res.redirect('/auth/signup');
  	}
  }).catch(function(err) {
    req.flash('danger', err.message);
    res.redirect('/auth/signup')
  });
});

module.exports = router;