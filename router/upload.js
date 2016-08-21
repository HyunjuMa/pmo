var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/', function(req, res, next) {

	var form = new multiparty.Form();

//	res.setTimeout(0);

/*
	res.setTimeout(480000, function(){ // 4 minute timeout adjust for larger uploads
        console.log('Request has timed out.');
            res.send(408);
        });
*/

form.on('error', function(err) {
console.log('Error parsing form: ' + err.stack);
});


	// file upload handling
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

    console.log("Write Streaming file :"+filename);

    // get field name & value
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

	// all uploads are completed
	form.on('close',function(){
		res.status(200).send('Upload complete');
	});


	// track progress
	form.on('progress',function(byteRead,byteExpected){
		console.log(' Reading total  '+byteRead+'/'+byteExpected);
	});

//	form.parse(req);

		form.parse(req, function(err, fields, files) {
			console.log(fields);
		Object.keys(fields).forEach(function(name) {
			console.log('got field named ' + name);
			console.log('got field value ' + fields[name]);
		});

		Object.keys(files).forEach(function(name) {
			console.log('got file named ' + name);
			console.log('got file value ' + files[name]);
		});

		console.log('Upload completed!');
//		res.setHeader('text/plain');
		res.end('Received ' + files.length + ' files');
		});

});

module.exports = router;
