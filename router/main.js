
module.exports = function(app, fs)
{
  app.get('/', function(req,res){
    console.log("first page loaded");
    res.render('index', {
      title: "PMO Repo",
      length: 5
    })
  });

  app.get('/dashboard', function(req,res){
    console.log("dashboard loaded");
    res.render('dashboard', {
      title: "Dashboard",
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

}





//여기부터 로그인파트

  //app.get('/newproject', function(req,res){
  //  res.render()
  //});
  /*
  app.get('/list', function(req, res) {
    fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function(err,data){
      console.log( data );
      res.end( data );
    });
  })

  app.get('/getUser/:username', function(req, res) {
    fs.readFile( __dirname + "/../data/user.json", function (err, data) {
      var users = JSON.parse(data);
      res.json(users[req.params.username]);
    });
  });

  app.get('/addUser/:username', function(req, res) {
    var result = {};
    var username = req.params.username;

    if(!req.body["password"] || !req.body["name"]) {
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
    }
  })

  app.get('/login/:username/:password', function(req, res) {
    var sess;
    sess = req.session;

    fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
      var users = JSON.parse(data);
      var username = req.params.username;
      var pw = req.params.pw;
      var result = {};
      if(!users[username]) {
        result["success"] = 0;
        result["error"] = "not found";
        res.json(result);
        return;
      }
      if(users[username]["pw"]==pw) {
        result["success"] = 1;
        sess.username = username;
        sess.name = users[username]["name"];
        res.json(result);
      } else{
        result["success"] = 0;
        result["error"] = "incorrect pw";
        res.json(result);
      }
    })
  });
}
*/
