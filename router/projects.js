
module.exports = function(app, Project) {
//user schema test

/*
  //모든 프로젝트 보는것은 따로 버튼 만들어서?????
  app.get('/findmyproject', function(req,res){
    sess = req.session;
    var name = sess.name;
    //console.log(name);

    Project.find({pm: name}, function(err, myprojects){
      if(err) return res.status(500).send({error: 'db failure'});

      res.redirect('/dashboard');  //출력 잘됨!!
      //res.redirect('/dashboard').send(myprojects);
    });

    //res.redirect('/dashboard');
  });//getmyproject
*/

  app.get('/dashboard', function(req,res){
    sess = req.session;
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

    var name = sess.name;

    console.log("dashboard loaded--");

    Project.find({pm: name}, function(err, myprojects){
      if(err) return res.status(500).send({error: 'db failure'});

      console.log(myprojects);  //출력 잘됨!!
      //res.redirect('/dashboard').send(myprojects);

      //name = req.session.name;
      //console.log("session test: " + name);
      res.render('dashboard', {
        title: "Dashboard",
        length: 5,
        page_name: 'dashboard', // navbar set active에서 쓸 것
        name: sess.name,
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

    app.get('/api/projects/:project_id', function(req,res){
      res.end();
    });
    app.get('/api/projects/title/:title', function(req,res){
      res.end();
    });


    app.get('/myproject', function(req,res){
      console.log("myprojectloaded");
      sess = req.session;
      res.render('myproject', {
        //title: req.query.projectname,
        title: "myproject",
        length: 5,
        page_name: 'myproject',
        name: sess.name
      })
    });

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

      Project.find({pm: name}, function(err, myprojects){
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
    });//create a project

  app.put('/api/projects/:project_id', function(req,res){
    res.end();
  });//update

  app.delete('api/projects/:project_id', function(req,res){
    res.end();
  });//delete
}
