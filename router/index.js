// 160731 for module dependencies, can be redundant

var express = require('express');
var app = express();
//var router = require('./router/main')(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var mongoose = require('mongoose');


//var user_db = require('./user_db');
//var project_db = require('./project_db');


module.exports = function(app, fs) {
  require('./main')(app, fs);
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


// 여기서부터 main
/*
app.get('/', function(req,res){
  console.log("first page loaded");
  res.render('index', {
    title: "PMO Repo",
    length: 5
  })
});

app.get('/myproject', function(req,res){
  console.log("myprojectloaded");
  res.render('myproject', {
    //title: req.query.projectname,
    title: "myproject",
    length: 5
  })
});

app.get('/project1', function(req,res){
  console.log("project1loaded");
  res.render('project1', {
    //title: req.query.projectname, 이건 꼭 해야함! project1이 아니기 때문
    title: "p1",
    length: 5
  })
});


app.get('/newproject', function(req,res){
  console.log("newprojectloaded");
//    console.log(req.query.username);
  res.render('newproject', {
    title: "New Project",
    length: 5
  })
});

app.get('/messages', function(req,res){
  console.log("messagesloaded");
  res.render('messages', {
    title: "messages",
    length: 5
  })
});

app.get('/mypage', function(req,res){
  console.log("mypage loaded");
  res.render('mypage', {
    title: "mypage",
    length: 5
  })
});

require('./main')(app,)
}
*/
