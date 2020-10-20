const EventEmitter = require('events'); //this is a class
const emitter = new EventEmitter(); //this is an object

//register listener
emitter.on('messageLogged', function(){
  console.log('Listener called');
})

emitter.emit('messageLogged') //make a noise, produce - signal an event has happened
//every a message is made, an event will be raise
