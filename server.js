var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var ejs = require('ejs');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require("request");
var express = require("express");
var db = require('./models');
var authCtrl = require('./controllers/auth');


var app = express();
var session = require('express-session');


//app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);


app.set('view engine', 'ejs');

//...
app.use(session({
  secret: 'Salty saltsalt',
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', authCtrl);



app.get('/', function (req, res) {
  res.render('home');
  //file.serve(req, res);
});

app.get('/video/:postid', function (req, res) {
    var postid = req.params.postid;
  res.render('index');
  //file.serve(req, res);
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/posts', function(req, res) {
  db.post.findAll().then(function(posts) {
    // console.log(persons);
    res.render('posts', {posts: posts});
  });
});

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

app.get('/newpost', function(req, res){
  res.render('newpost');
});

app.post('/newpost', function(req, res) {
  var newPost = req.body;
  console.log(newPost);
  db.post.create(newPost).then(function() {
    res.redirect('/posts');
  });
});

app.listen(2500);