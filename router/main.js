
module.exports = function(app, fs)
{

  app.get('/', function(req,res){
    //console.log("first page -currently login- loaded");
    res.render('index', {
      title: "PMO Repo",
      length: 5
    })
  });

  
}
