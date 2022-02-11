// A small HTTP server to host this project locally

const pfs = require('fs/promises');
const http = require('http');


const host_info = {
	address: '127.0.0.1',
	port: 8080
};

const args = process.argv.slice(2);

if(args.length === 1) {
	if(args[0] === '--help' || args[0] === '-h')
		console.info("Usage: node server.js [hostname:port]");
	else {
		[host_info.address, host_info.port] = args[0].split(':');
		host_info.port = +host_info.port;
	}
}
else if(args.length !== 0)
	console.warn("Invalid amount of arguments! Use --help to see command usage.");


const mime = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	'mjs': 'application/javascript',
	'ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
	let path = (new URL(req.url, `http://${host_info.address}:${host_info.port}`)).pathname;

	if(!path.includes('.')) {
		if(!path.endsWith('/')) path += '/';
		path += 'index.html';
	}

	const ext = path.slice(path.lastIndexOf('.') + 1);

	pfs.readFile(`.${path}`)
		.then((data) => {
			res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
			res.end(data);
		})
		.catch(() => {
			res.writeHead(404);
			res.end("404 Not Found");
		});
});

server.listen(host_info.port, host_info.address, () => {
	console.info(`Hosting server at ${host_info.address}:${host_info.port}`);
});
