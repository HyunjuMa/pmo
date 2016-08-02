
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

//regi-login
  app.post('/register', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
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

  app.post('/login', function(req,res){
    var name = req.body.name;
    var pw = req.body.pw;

    User.findOne({name: name, pw: pw}, function(err, user) {
      if(err){
        console.log(err);
        return res.status(500).send();
      }

      if(!user) {
        return res.status(404).send();
      }

      return res.status(200).send();
    })
  });


  app.put('/api/users/:user_id', function(req,res){
    res.end();
  });//update

  app.delete('api/users/:user_id', function(req,res){
    res.end();
  });//delete

}
