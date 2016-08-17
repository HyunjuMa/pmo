// 160731 for module dependencies, can be redundant

var express = require('express');
var app = express();
//var router = require('./router/main')(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var mongoose = require('mongoose');

module.exports = function(app, fs) {
  require('./main')(app, fs);
//  require('./projecs')(app, Project);
//  require('./users')(app, User);
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret:'11',
  resave: false,
  saveUninitialized: true
}));
//
