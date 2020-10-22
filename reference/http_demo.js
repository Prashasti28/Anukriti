const http = require('http');

//Create server object
http
	.createServer((req, res) => {   // in place of (req, res), it takes function so we have put parameters of a error function
		// Write Response
		res.write('Hello World');    //to respond to the request
		res.end()
	})
	.listen(5000, () => console.log('Server running...'));  // 5000 is port number