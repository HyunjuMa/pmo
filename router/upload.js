var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/', function(req, res, next) {

	var form = new multiparty.Form();
	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
	});


	// Close emitted after form parsed
	// form.on('close', function() {
	// 	console.log('Upload completed! on Close');
	// 	// res.setHeader('text/plain');
	// 	res.end('Received ' + count + ' files');
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

		part.on('error', function(err) {
			console.log('error' + err.stack);

		});

	form.on('field', function(name, value){
		//console.log('normal field / name = '+name+' , value = '+value);
		//여기서 밸류는 task id
		var dir = ('/tmp/'+value);
		mkdirp(dir, function(err) {
		});

		var writeStream = fs.createWriteStream('/tmp/'+value+'/'+filename);
		part.pipe(writeStream);

		part.on('data',function(chunk){
			console.log(filename+' read '+chunk.length + 'bytes');
		});

		part.on('end',function(){
			console.log(filename+' Part read complete');
			writeStream.end();
		});
	});
});

form.parse(req);

	// form.parse(req, function(err, fields, files) {
	// 	console.log(fields);
	// 	Object.keys(fields).forEach(function(name) {
	// 		console.log('got field named ' + name);
	// 		console.log('got field value ' + fields[name]);
	// 	});
	//
	// 	Object.keys(files).forEach(function(name) {
	// 		console.log('got file named ' + name);
	// 		console.log('got file value ' + files[name]);
	// 	});
	//
	// 	var tid = fields['tid'];
	//
	// 	// filename = files['myfile1'][0].filename;
	//
	// 	console.log('Upload completed!');
	// 	//		res.setHeader('text/plain');
	// 	res.end('Received ' + files.length + ' files');
	// });

});

module.exports = router;
