var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var mkdirp = require('mkdirp');

/* GET home page. */
router.post('/', function(req, res, next) {

	var count = 0;
	var form = new multiparty.Form();
	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
	});

	// Parts are emitted when parsing the form
	form.on('part', function(part) {
		// You *must* act on the part by reading it
		// NOTE: if you want to ignore it, just call "part.resume()"

		if (!part.filename) {
			// filename is not defined when this is a field and not a file
			console.log('got field named ' + part.name);
			// ignore field's content
			part.resume();
		}

		if (part.filename) {
			// filename is defined when this is a file
			count++;
			console.log('got file named ' + part.name);
			// ignore file's content here
			part.resume();
		}

		part.on('error', function(err) {
			// decide what to do
		});
	});

	// Close emitted after form parsed
	form.on('close', function() {
		console.log('Upload completed! on Close');
		// res.setHeader('text/plain');
		res.end('Received ' + count + ' files');
	});

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

		var tid = fields['tid'];
		var filename = files['myfile1'].filename;
		console.log(filename);

		console.log('Upload completed!');
		//		res.setHeader('text/plain');
		res.end('Received ' + files.length + ' files');
	});

});

module.exports = router;
