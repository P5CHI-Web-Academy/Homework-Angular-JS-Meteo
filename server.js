const http = require('http');

const fs = require('fs');
const server =  http.createServer();

server.on('request', (request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./index.js', null, function(error, data) {
		if(error) {
			response.writeHead(404);
			response.write('File not fount');
		}
		else {
			response.write(data);
		}
		response.end();
	});
});

server.listen(3000, () => console.log('Server NodeJS pornit!!!'));