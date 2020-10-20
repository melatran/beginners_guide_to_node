const EventEmitter = require('events');
// const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';
//implementation detail so other modules don't need to know about it, just the function

class Logger extends EventEmitter{
  log(message) {
    //send an http request
    console.log(message);
  
    //Raise event
    this.emit('messageLogged', {
      id: 1,
      url: 'http://'
    });
  
  }
}

module.exports = Logger;

//when a function is defined within a class, it's now a method so we don't need the function
//with this change, the Logger class will have all the functions defined within EventEmitter
//this represents the Logger class itself