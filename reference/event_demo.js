const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter { }

// Init object
const myEmitter = new MyEmitter();

// Event listener
myEmitter.on('event', () => console.log('Event Fired'));

//Init event
myEmitter.emit('event');    
myEmitter.emit('event');    // No matter how many times I run it, it will 
myEmitter.emit('event');   // run whatever is there instead of Event Fired
myEmitter.emit('event');