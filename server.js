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
var flash = require('connect-flash');

var app = express();
var session = require('express-session');


app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.use('/auth', authCtrl);
app.use('/posts', postCtrl);

app.set('view engine', 'ejs');

app.use(session({
  secret: 'a bunch of random LETTERS',
  resave: false,
  saveUninitialized: true
}));


app.use(flash());

app.use(function(req, res, next) {
  if (req.session.personId) {
    db.person.findById(req.session.personId).then(function(person) {
      req.currentUser = person;
      res.locals.currentUser = person;
      next();
    })
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});


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

app.get('/random', function(req, res) {
  var query = req.query.q;

  request('http://www.reddit.com/r/kpics/search.json?q=' + query + '&restrict_sr=on', function(err, response, body) {
    var data = JSON.parse(body);
    var results = data.data.children;
    var im = []
     for (var i = 0; i < results.length; i++) {
      var result = results[i].data;
      im.push(result.url);
    }
    console.log(im);
      res.render('random');
  });
});

app.listen(2500);