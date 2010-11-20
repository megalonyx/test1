var	  http = require('http')
	, url = require('url')
	;

var m = {
	  port: 8080
	, host: '127.0.0.1'
	, headbegin: '<!doctype html><html><head>'
	, headend: '</head>'
	, bodybegin: '<body>'
	, bodyend: '</body></html>'
};

m.dispatch = function (req, res) {
	var   i
		, outstr = 
			  m.headbegin
			+ '<title>Test</title>'
			+ m.headend
			+ m.bodybegin
		;
	outstr += '<h1>' + url.parse(req.url).pathname + '</h1><p>';
	for (i in req) {
		if (req.hasOwnProperty(i)) {
			outstr += '' + i + ': ' + req[i] + '<br>';
		}
	}
	outstr += '</p>'
		+ m.bodyend;
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(outstr);
};
	
http.createServer(m.dispatch).listen(m.port, m.host);

console.log('Server running.');
