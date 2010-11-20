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

m.title = function (str) {
	return '<title>' + str + '</title>';
}

m.root = function (req) {
	var   i
		, outstr = 
			  m.headbegin
			+ '<title>Request</title>'
			+ m.headend
			+ m.bodybegin
		;
	outstr += m.title('Request') + '<p>';
	for (i in req) {
		if (req.hasOwnProperty(i)) {
			outstr += '' + i + ': ' + req[i] + '<br>';
		}
	}
	outstr += '</p>' + m.bodyend;
	return outstr;
}

m.hello = function (req) {
	var hello = 'Hello, World!';
	return m.headbegin
			+ m.title(hello)
			+ m.headend
			+ m.bodybegin
			+ '<h1>' + hello + '</h1>'
			+ m.bodyend;

}

m.parse = function (str) {
	return str.split('/')[1];
};

m.default = m.root;
m.table = {'hello': m.hello};

m.dispatch = function (req, res) {
	var   component = m.parse(url.parse(req.url).pathname)
		, answer = (component in m.table) ?
			  m.table[component](req)
			: m.default(req)
		;
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(answer);
};
	
http.createServer(m.dispatch).listen(m.port, m.host);

console.log('Server running.');
