
module.exports = function(app, User) {
//user schema test
  app.get('/api/users', function(req,res){
    User.find(function(err, users){
      if(err) return res.status(500).send({error: 'db failure'});
      res.json(users);
    })
  });//getall

  app.get('/api/users/:user_id', function(req,res){
    res.end();
  });
  app.get('/api/users/name/:name', function(req,res){
    res.end();
  });

// 유저 디비는 미리 넣는다고 가정하므로 필요없음
/*
  app.post('/api/users', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.pw = req.body.pw;

    user.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });//create user

*/

//regi-login, regi부분 테스트
  app.post('/register', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.pw = req.body.pw;

    console.log('name: ' + user.name);
    console.log('pw: ' + user.pw);

    user.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });//create user

//login**
  app.post('/login', function(req,res){
    var name = req.body.name;
    var pw = req.body.pw;

    console.log('name: ' + name);
    console.log('password: ' + pw);

    User.findOne({name: name, pw: pw}, function(err, user) {
      if(err){
        console.log(err);
        return res.status(500).send();
      }

      if(!user) {
        return res.status(404).send();
      }

      //success
      sess = req.session;
      sess.name = name;
      console.log("*login succeed with session name : " + sess.name);
      res.redirect('/dashboard');
      return res.status(200).send();
    })

  });
//결과 alert?

  app.put('/api/users/:user_id', function(req,res){
    res.end();
  });//update

  app.delete('api/users/:user_id', function(req,res){
    res.end();
  });//delete

}
