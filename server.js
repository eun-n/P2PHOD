var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var ejs = require('ejs');
var request = require("request");
var express = require("express");

var app = express();

//app.use(ejsLayouts);
//app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('home');
  //file.serve(req, res);
});

app.get('/video', function (req, res) {
  res.render('index');
  //file.serve(req, res);
});


app.listen(2129);