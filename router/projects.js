
module.exports = function(app, Project) {
//user schema test
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

  app.post('/testlist', function(req,res) {
    var tasklist = [];
    tasklist = req.body.tasklist;
    //console.log(tasklist);
    res.end();
  })

  app.post('/api/projects', function(req,res){
    var project = new Project();
    project.name = req.body.pname;
    project.desc = req.body.pdesc;
    project.pm = req.body.pm;
    project.task = req.body.task;
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
