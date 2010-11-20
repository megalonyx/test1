var http = require('http');

var m = {
	  port: 8080
	, host: '127.0.0.1'
	, headbegin: '<!doctype html><html><head>'
	, headend: '</head>'
	, bodybegin: '<body>'
	, bodyend: '</body></html>'
};

m.dispatch = function (req, res) {
	var outstr = 
			  m.headbegin
			+ '<title>Test</title>'
			+ m.headend
			+ m.bodybegin
			+ '<p>Hello, world!</p>'
			+ m.bodyend;
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(outstr);
};
	
http.createServer(m.dispatch).listen(m.port, m.host);

console.log('Server running.');
