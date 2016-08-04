
module.exports = function(app, Project) {
//user schema test

  var tasknum = 0;
  
  app.get('/api/projects', function(req,res){
    Project.find(function(err, projects){
      if(err) return res.status(500).send({error: 'db failure'});
      res.json(projects);
    })
  });//getall

  app.get('/api/projects/:project_id', function(req,res){
    res.end();
  });
  app.get('/api/projects/title/:title', function(req,res){
    res.end();
  });

  app.post('/testdb', function(req,res) {
    var tasklist = [];
    tasklist = req.body.task;
    //console.log(tasklist);
    res.json(tasklist);
  })

  app.post('/newprojectadded', function(req,res){
    tasknum ++;
    var project = new Project();
    project.pname = req.body.pname;
    project.pdesc = req.body.pdesc;
    project.pm = req.body.pm;
    project.task[tasknum].task_name = req.body.task;
//    project.bp = req.body.bp;

    project.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });//create a project

  app.put('/api/projects/:project_id', function(req,res){
    res.end();
  });//update

  app.delete('api/projects/:project_id', function(req,res){
    res.end();
  });//delete

}
