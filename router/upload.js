var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/:pid', function(req, res, next) {

	var form = new multiparty.Form();

	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
	});

	form.on('part',function(part){
		var filename;
		var size;
		if (part.filename) {
			filename = part.filename;
			size = part.byteCount;
		}else{
			part.resume();
		}

// 		var dirname = part.name;
    var tid = part.name;
    var pid = req.params.pid;

//     console.log("pid: " + pid);

		var dir = ('/tmp/'+pid);
    var dir2 = (dir+'/'+tid);
		mkdirp(dir, function(err) {
      if(err) console.error(err);
		});
    mkdirp(dir2, function(err2){
          if(err2) console.log("mkdir 2 error:" + err2);
          else{ console.log("mkdir works fine"); }
    }); //callback 고려해서 mkdir 두개 따로둬야함

		var writeStream = fs.createWriteStream('/tmp/'+pid+'/'+tid+'/'+filename);
		part.pipe(writeStream);

		part.on('data',function(chunk){
			console.log(filename+' read '+chunk.length + 'bytes');
		});

		part.on('end',function(){
			console.log(filename+' Part read complete');
			writeStream.end();
			//res.end('Received files');
      res.redirect('/uploaded/'+pid+'/'+tid);
		});

		part.on('error', function(err) {
			console.log('error' + err.stack);
		});
	});

	form.parse(req);
});

module.exports = router;
