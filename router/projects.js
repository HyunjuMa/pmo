
module.exports = function(app, Project) {
//user schema test

  //모든 프로젝트 보는것은 따로 버튼 만들어서?????
  app.get('/findmyproject', function(req,res){
    sess = req.session;
    var name = sess.name;
    //console.log(name);

    Project.find({pm: name}, function(err, myprojects){
      if(err) return res.status(500).send({error: 'db failure'});
      
      //res.send(myprojects);  //출력 잘됨!!
      //res.redirect('/dashboard');
    })

    //res.redirect('/dashboard');
  });//getmyproject


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
/*
    for(var i=0; i<tasknum; i++) {
      task.tname = tasklist[i];
      //console.log(project.task.tname);
    }
*/
    //project.bp = req.body.bp;

    project.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json(project);
    });
  });//create a project

  app.put('/api/projects/:project_id', function(req,res){
    res.end();
  });//update

  app.delete('api/projects/:project_id', function(req,res){
    res.end();
  });//delete
}
