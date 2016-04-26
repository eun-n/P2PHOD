var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var ejs = require('ejs');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require("request");
var express = require("express");
var db = require('./models');

var app = express();
var session = require('express-session');


//app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

//...
app.use(session({
  secret: 'Salty saltsalt',
  resave: false,
  saveUninitialized: true
}));


app.get('/', function (req, res) {
  res.render('home');
  //file.serve(req, res);
});

app.get('/video', function (req, res) {
  res.render('index');
  //file.serve(req, res);
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

// app.get('/users', function(req, res) {
//   db.user.findAll().then(function(users) {
//     res.render('user');
//   });
// });

app.get('/users', function(req, res) {
  db.person.findAll().then(function(persons) {
    // console.log(persons);
    res.render('user', {persons: persons});
  });
});

app.post('/signup', function(req, res) {
  var newPerson = req.body;
  // console.log(newPerson);

  db.person.create(newPerson).then(function() {
    res.redirect('/users');
  });
});

app.listen(2131);