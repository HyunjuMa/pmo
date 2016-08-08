
module.exports = function(app, Project) {
//user schema test

  app.get('/dashboard', function(req,res){
    sess = req.session;
    var name = sess.name;

    if(!name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

    Project.find({pm: name}, function(err, myprojects){
      if(err) return res.status(500).send({error: 'db failure'});

//      console.log(myprojects);  //출력 잘됨!!
      res.render('dashboard', {
        title: "Dashboard",
        length: 5,
        page_name: 'dashboard', // navbar set active에서 쓸 것
        name: name,
        myprojects: myprojects
      })
    });
  });

    app.get('/projects', function(req,res) {
      Project.find(function(err, projects) {
        if(err) return res.status(500).send({error: 'db failure'});
        res.json(projects);
      })
    })

    app.get('/projects/:project_id', function(req,res){
      //navbar.pname 클릭하면 projectid가지고 여기로 온다! 이거 가지고 프로젝트 모든 정보 불러와서 띄워야함. .ejs 파일네임??
      var pid = req.param('project_id');
      console.log(pid);
      /*
      Project.find({_id: project_id}, function(err, project){
        if(err) return res.status(500).send({error: 'db failure'});

        console.log(myprojects);
        res.render("?", {
          title: "?",
          length: 5,
          page_name: '?',
          name: sess.name,
          myprojects: myprojects
        })
      });
      */
      res.end();
    });

    app.get('/projects/title/:title', function(req,res){
      res.end();
    });

    app.get('/myproject', function(req,res){
      console.log("myprojectloaded");
      sess = req.session;

      Project.find({pm: sess.name}, function(err, myprojects){
        if(err) return res.status(500).send({error: 'db failure'});

        res.render("myproject", {
          title: "my projects",
          length: 5,
          page_name: 'myproject',
          name: sess.name,
          myprojects: myprojects
        })
      });
    });

  // 여기 바꿔야함.
    app.get('/project1', function(req,res){
      console.log("project1loaded");
      sess = req.session;
      res.render('project1', {
        //title: req.query.projectname, 이건 꼭 해야함! project1이 아니기 때문
        title: "p1",
        length: 5,
        page_name: 'project1',
        name: sess.name
      })
    });


    app.get('/newproject', function(req,res){
      sess = req.session;

      Project.find({pm: sess.name}, function(err, myprojects){
        if(err) return res.status(500).send({error: 'db failure'});

        res.render('newproject', {
          title: "New Project",
          length: 5,
          page_name: 'newproject',
          name: sess.name,
          myprojects: myprojects
        })
      });
    });


    app.post('/newprojectadded', function(req,res){

      sess = req.session;
      var project = new Project();

      project.pname = req.body.pname;
      project.pdesc = req.body.pdesc;
      project.pm = sess.name;

      var tasklist = [];
      var tasknum = 0;
      tasklist = req.body.task;
      tasknum = tasklist.length;

      for(var i=0; i<tasknum; i++) {
        var tname = tasklist[i];
        project.task.push({
          tname: tname
        });
      }

    project.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.redirect('/dashboard');
      });
    });//create a project and then go to dashboard


  app.put('/projects/:project_id', function(req,res){
    res.end();
  });//update

  app.delete('/projects/:project_id', function(req,res){
    res.end();
  });//delete


  //dropdown click event controller 을 만들기 ㅟㅇ해 모든것 전역으로?

/*
  app.get('/:myproject[i].pname', function(req,res) {
  sess = req.session;
  Project.find({pm: sess.name}, function(err, myprojects){
    if(err) return res.status(500).send({error: 'db failure'});

     console.log("?????");
     res.render('myproject[i].pname', {
          title: "...",
          length: 5,
          page_name: 'myproject[i].pname',
          name: sess.name,
          myprojects: myprojects
        })
    });
  }); // notworking as i thought
*/
}