const EventEmitter = require('events');
const uuid = require('uuid');

console.log(uuid.v4());   //copying this same line to down the lines,
                         //  you will get as many as you want

class Logger extends EventEmitter {
	log(msg) {
		// Call event
		this.emit('message', { id: uuid.v4(), msg });
	}
}

// module.exports = Logger;

const logger = new Logger();

logger.on('message', data => console.log('Called Listener:', data));

logger.log('Hello World');
logger.log('Hey');
logger.log('Namaste');