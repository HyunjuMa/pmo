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


	// Close emitted after form parsed
	// form.on('close', function() {
	// 	console.log('Upload completed! on Close');
	// 	// res.setHeader('text/plain');
	//
	// });

		// form.on('field', function(name, value){
		// 	//console.log('normal field / name = '+name+' , value = '+value);
		// 	//여기서 밸류는 task id
		// 	console.log("fields" + value);
		// 	tid = value;
		//
		// });

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

		var dir = ('/tmp/'+pid+'/'+tid);
		mkdirp(dir, function(err) {
      console.log(err);
		});

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
