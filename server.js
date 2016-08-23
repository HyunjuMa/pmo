var express = require('express');
var app = express();
//var multer = require('multer');
//var router = require('./router/main')(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var mongoose = require('mongoose');
var busboy = require('connect-busboy');
//var fileUpload = require('express-fileupload');
//var path = require('path');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port: ' + 3000);
});

app.use(express.static('public'));
//app.use(fileUpload());
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret:'password for pmo',
  resave: false,
  saveUninitialized: true
}));


var router = require('./router/index')(app, fs);

var User = require('./models/user');
var router2 = require('./router/users')(app, User);
//일단 유저는 그대로

// var Project = require('./models/project');
// var router3 = require('./router/projects')(app, Project);


var upload = require('./router/upload');
app.use('/upload', upload);

var Project = require('./models/project');
var router3 = require('./router/projects');
app.use('/project', router3);
//이렇게 바꾸면서 바꿔야하는것들: views/ejs의 모든 클릭 이벤트


// connect to mongod server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("**** Conneced to mongod server ****");
});

mongoose.connect('mongodb://localhost/pmo'); //사용할 디비 이름
