//var express = require('express');
//var app = express.Router();

//var Project = require('../models/project');

module.exports = function(app, Project) {


  app.get('/dashboard', function(req,res){
    sess = req.session;
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

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
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

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
        tname: tname,
        state: 'todo'
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

    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

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
    }).sort({"_id": -1});

  })

  app.get('/update/:pid', function(req,res){

    sess = req.session;
    if(!sess.name) {
      //로그인 안된 상태에서 들어오면
      res.redirect('/');
    };

    Project.find({_id: req.params.pid}, function(err, project){
      if(err) return res.status(500).send({error: 'db failure'});
      //console.log(pid); //working fine
      //console.log(project); //working fine

      res.render('updateproject', {
        title: "프로젝트 수정/삭제",
        length: 10,
        page_name: 'updateproject',
        name: sess.name,
        project: project
      });
    });
  })

  app.post('/update/:pid', function(req,res){
    console.log("post update ");
    var pid = req.params.pid;
    var newtasklist = [];
    newtasklist = req.body.task;

    Project.findOneAndUpdate({_id: pid},
      { $set:
        {pname: req.body.pname,
          pdesc: req.body.pdesc
          // task:
        }}, function(err, project){
          if(err) return res.status(500).send({error: 'db failure'});
          //
        })
        res.redirect("/dashboard");
      });//update


      /*
      app.post('/:pid/taskadded', function(req,res){
      console.log("taskadded router got its req");
      var pid = req.params.pid;
      var addedtasklist = [];
      addedtasklist = req.body.task;

      //find 먼저
      Project.findOne({_id: pid}, function(err, project) {
      if(err)
      res.json(err);
      else{

      for(var i=0; i<addedtasklist.length; i++) {
      var tname = addedtasklist[i];
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
res.redirect('/'+pid);
});
}
});
});//get pid, and add tasks and save it
*/

app.post('/taskadded/:pid', function(req,res){
  var pid = req.params.pid;
  var tname = req.body.task;


  Project.findOne({_id: pid}, function(err, project) {
    if(err)
    res.json(err);
    else{
      //console.log(tname);
      project.task.push({
        tname: tname,
        state: 'todo'
      });

        project.save(function(err) {
          if(err) {
            console.error(err);
            res.json({result: 0});
          }
          res.redirect("/update/"+pid);
        });
      }
    });
    //res.redirect('/update/'+pid);
  })


  /////file upload
  app.get('/uploaded/:tid', function(req,res){
    var tid = req.params.tid;

    Project.update({"task._id": tid},
                    { $set: {
                      "task.$.state": 'inprogress',
                      "task.$.lastupdated": Date.now() }
                    }, false, true);
      res.end();
    //res.redirect('/dashboard');
  });


  //////DELETE///
  app.delete('/:pid/:tid', function(req,res){
    var pid = req.params.pid;
    var tid = req.params.tid;

    Project.findOne({_id: pid}, function(err, project) {
      if(err) res.json(err);
      else{
        project.task.pull({_id: tid});
        project.save(function(err, output) {
          if(err) {
            res.json(err);
          }
          //res.json(output));
          res.redirect("/update/"+pid);
        })
      }
    });
    //res.redirect('/dashboard');
  });//delete task from a project, 수정화면에서 마이너스 버튼 누르면 여기로 와야함

  app.delete('/delete/:pid', function(req,res){
    Project.remove({_id: req.params.pid}, function(err, deletedproject){
      if(err) return res.status(500).send({error: 'db failure'});
      console.log("..");
      res.json(deletedproject);
    })
  });// 프로젝트 수정 화면에서 delete

  app.get('/delete/:pid', function(req,res) {
    Project.remove({_id: req.params.pid}, function(err, deletedproject){
      if(err) return res.status(500).send({error: 'db failure'});
      res.redirect('/dashboard');
    })
  }); //delete, 각 PM과 Admin이 프로젝트 보기 에서 삭제할때

};

//module.exports = app;
