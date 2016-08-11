module.exports = function(app, Project) {
//user schema test

  app.get('/dashboard', function(req,res){
    sess = req.session;
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

    //.sort({"_id": 1})  ??
    Project.find(function(err, allprojects){
      if(err) return res.status(500).send({error: 'db failure: failed to retrieve all projects'})

      //이부분 조건문으로 빼도 됨
      //for문으로 처리?.......
      Project.find({pm: sess.name}, function(err, myprojects){
      if(err) return res.status(500).send({error: 'db failure'});

//      console.log(myprojects);  //출력 잘됨!!
      res.render('dashboard', {
        title: "Dashboard",
        length: 5,
        page_name: 'dashboard', // navbar set active에서 쓸 것
        name: sess.name,
        allprojects: allprojects,
        myprojects: myprojects
      })
    })
    }).sort({"_id": -1});
  });

    app.get('/newproject', function(req,res){
      sess = req.session;

      res.render('newproject', {
        title: "New Project",
        length: 5,
        page_name: 'newproject',
        name: sess.name
      })
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



  app.get('/:project_id', function(req,res){
    var pid = req.params.project_id;
    sess = req.session;

    Project.find({_id: pid}, function(err, project){
      if(err) return res.status(500).send({error: 'db failure'});
      //console.log(pid); //working fine
      console.log(project); //working fine

      res.render('project1', {
        title: "project1",
        length: 5,
        page_name: 'project1',
        name: sess.name,
        project: project
      });
    });

  })


  app.post('/update/:pid', function(req,res){
    Project.update({_id: req.params.pid}, function(err, updatedproject) {
      if(err) return res.status(500).send({error: 'db failure'});

      // newproject 부분 이랑 똑같이 일단 받아옴
      // 그 다음, $set 말고 'replace'하는 방법으로
      // db.people.update( { name: "Betty" }, { "name": "Betty 2nd", age: 1 }) 처럼
      // Task[]는 어떻게 할지??????????????????????? ***** *** 

      console.log("got to update router");
      res.redirect('/'+pid);
    })
  });//update

  app.get('/delete/:pid', function(req,res){
    Project.remove({_id: req.params.pid}, function(err, deletedproject){
      if(err) return res.status(500).send({error: 'db failure'});
      console.log("delete succeeded with get method???");
      res.redirect('/dashboard');
    })
  });//delete
};
