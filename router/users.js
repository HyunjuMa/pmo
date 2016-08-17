
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

  app.post('/newuser', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.pw = req.body.pw;

    user.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.redirect('/admin');
    });
  });//create user (can be done by 'Admin' only)



//login**
  app.post('/login', function(req,res){
    var name = req.body.name;
    var pw = req.body.pw;

    //console.log('name: ' + name);
    //console.log('password: ' + pw);

    User.findOne({name: name, pw: pw}, function(err, user) {
      if(err){
        console.log(err);
        return res.status(500);
      }
      if(!user) {
        console.log('not found');
        return res.status(404);
      }
      //success
      sess = req.session;
      sess.name = name;
      console.log("*login succeed with session name : " + sess.name);
      res.redirect('/dashboard');
      //dashboard 부르기 전에 내 프로젝트 목록 받아와서 뿌려야 함.
      //res.redirect('/findmyproject');
      //return res.status(200).send();
    })

  });

  app.get('/logout', function(req,res){
    sess = req.session;
    if(sess.name) {
      req.session.destroy(function(err){
        if(err) {console.log(err);}
        else {res.redirect('/');}
      })
    }
    else {
      console.log("session destroyed, check session: " + sess);
      res.redirect('/');
    }
  })

  app.get('/admin', function(req,res){
    sess = req.session;
    User.find(function(err, allusers){
      if(err) return res.status(500).send({error: 'db failure: failed to retrieve all users'});

      res.render('admin', {
        title: "관리 페이지",
        length: 5,
        page_name: 'adminpage', // navbar set active에서 쓸 것
        users: allusers,
        name: sess.name
      })
    })
  })

  app.post('/changepw', function(req,res){
    User.findOne({_id: req.body.uid}, function(err, user) {
      if(err) res.json(err);
      else {
        user.pw = req.body.pw;
        user.save();
        res.redirect('/admin');
      }

    })
  }); //update using get req

  app.delete('/deleteUser/:uid', function(req,res){
    User.remove({_id: req.params.uid}, function(err) {
      if(err) return res.status(500).send({error: 'db failure'});
      res.redirect('/admin');
    })
  });//delete


}
