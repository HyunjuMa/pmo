
module.exports = function(app, User) {


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
        return res.send("이름/비밀번호를 확인해주세요");
      }
      //success
      sess = req.session;
      sess.name = name;
      console.log("*login succeed with session name : " + sess.name);
      res.redirect('project/dashboard');
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
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면 메인으로 돌려보냄
      res.redirect('/');
    };

    User.find(function(err, allusers){
      if(err) return res.status(500).send({error: 'db failure: failed to retrieve all users'});

      res.render('admin', {
        title: "관리 페이지",
        length: 5,
        page_name: 'admin', // navbar set active에서 쓸 것
        users: allusers,
        name: sess.name
      })
    })
  })

  app.post('/updateUser/:uid', function(req,res) {
    console.log(req.params.uid);
    console.log(req.body.pw);
    User.findOneAndUpdate({_id: req.params.uid},
                          { $set:
                           {pw: req.body.pw}}, function(err, user) {
      if(err) return res.status(500).send({error: 'db failuer'});
    }
    )
    res.redirect("/admin");
  }); //pw update


  app.get('/deleteUser/:uid', function(req,res){
    User.remove({_id: req.params.uid}, function(err) {
       console.log("delete request : "+ req.params.uid);
      if(err) return res.status(500).send({error: 'db failure'});
      res.redirect('/admin');
      //res.end();
    })
  });//delete

}
