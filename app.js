const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//change from emitter to logger
//use an instance of a custom class that extends the EventEmitter
//when logger object raises an event, register this listener
logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
})

logger.log('message');

//Moved raising an event to our logger module; don't belong in app

//event listener won't be called since the EventEmitters are different, there are two different objects called emitter

//don't work with EventEmitter directly so create a class called Log

//load in the Logger class and register listener on the logger object

