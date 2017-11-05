

var MINE_TYPES = {
	'html': 	'text/html',
	'txt': 		'text/plain',
	'css': 		'text/css',
	'js': 		'text/javascript',
	'json': 	'application/json',
	'png': 		'image/png',
	'jpg': 		'image/jpeg'
	
};
var PORT = 3001;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var root = process.cwd();

var server = http.createServer(function(request, response) {
	
	var pathname = url.parse(request.url).pathname;
	var realPath = path.join(root, pathname);
	var ext = path.extname(realPath);
	if (!ext) {
		realPath = path.join(realPath, '/index.html');
		ext = '.html'
	}
	fs.exists(realPath, function(exists) {
		if (exists) {
			fs.readFile(realPath, 'binary', function(err, file) {
				if (!err) {
					response.writeHead(200, {
						'Content-Type': MINE_TYPES[ext.slice(1)] || 'text/plain'
					});
					response.write(file, 'binary');
					response.end();
				} else {
					response.writeHead(500, {
						'Content-Type': 'text/plain'
					});
					response.write('ERROR, the reason of error is ' + err.code + '; Error number is ' + err.errno + '.');
					response.end();
				}
			})
		} else {
			response.writeHead(404, {
				'Content-Type': 'text/plain'
			});
			response.write('This request URL ' + pathname + ' was not found on this server.');
			response.end();
		}
	});

});
server.listen(PORT);
console.log("server running at port " + PORT);
