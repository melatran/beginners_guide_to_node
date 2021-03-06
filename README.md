# Node.JS

- runtime envrionment for executing JS code

- often used for backend services to build APIs to power our client apps

- client apps are what the user interacts with

- created by Ryan Dahl to execute JS outside of a browser

- [tutorial](https://www.youtube.com/watch?v=TlB_eWDSMt4&t=221s&ab_channel=ProgrammingwithMosh)

**Pros**

- great for protyping and agile development

- superfast, can double requests/sec

- example: PayPal, Netflix

- JS everywhere

- cleaner and more consistent codebase

- large ecosystem of open course libraries available

## Architecture of Node

<img width="848" alt="Screen Shot 2020-10-20 at 2 37 44 PM" src="https://user-images.githubusercontent.com/59414750/96641370-da0a9400-12e1-11eb-9ec2-10df1ab450c0.png">

- before Node, only built JS to run inside a browser so every browser has a JS engine that takes JS code and coverts to machine code for a computer to understand

- due to the variety of engines, JS behaves differently in different browsers

- no document objects but can read files

- Chrome and Node share the same JS engine with different abilities

- Node is not a programming language but also not a framework like Rails but a **Runtime Environment**

## How Node Works

**async**: (not waiting until an action is complete to move on)

   - a single thread is used to handle multiple requests

   - when request arrives, the thread will handle that request and put it into an `event queue`

**sync**: (waiting until something frees up) 

- not used for CPU-intensive apps(video uploading or photos)

- Node should only be used for real time applications

## Getting Started

- run `node --version` to check if it's installed on machine

- create a new folder

- create `app.js` (can write regular JS in file)

- to run the file, enter `node app.js`

- can't run `console.log(window);` because Node is not a browser

## Global Object

**Global Object:** objects that are part of Node or JS; similar to how certain methods in Rails and Ruby are abstracted away from the user; not specific for any framework; can be used in browsers, client, or inside Node

- `console.log();` is a global object meaning it can be accessed anywhere in any files

- `setTimeout()` used to call a function to set a delay

- `clearTimeout()`

- `setInterval()` call a function after a delay

- `clearInterval()` stop function from being called repeatedly

- `window.console.log` object only defined within browsers

- the objects above belong to a window

- `var message = '';`

- global object defined within Node and can use the objects above `global.setTimeout`

- variables defined in are not added to global object so not available outside due to Node's Modular System

```
var message = '';

console.log(global.message);

=> undefined
```

- avoid defining functions and variables in global scope meaning if we define this function in another file, that new function will override this function

## Modules

- create small modules where variables and functions are defined so they don't override it and are encapsulated inside the module

- every file in a Node app is considered a module

- the variables and functions defined are only scoped within that file

- need to export it if you want to use that file in other files

```
app.js ------> cosole.log(module);

TERMINAL RESULT
----------------

Module {
  id: '.',
  path: '/Users/melanietran/personal_projects/node_app',
  exports: {},
  parent: null,
  filename: '/Users/melanietran/personal_projects/node_app/app.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/melanietran/personal_projects/node_app/node_modules',
    '/Users/melanietran/personal_projects/node_modules',
    '/Users/melanietran/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

- a module has all these key/value pairs

- JSON object

### Creating a Module
```
var url = 'http://mylogger.io/log';
//implementation detail so other modules don't need to know about it, just the function

function log(message) {
  //send an http request
  console.log(message);
}

module.exports.log = log;
```

- `logger.js` is our module responsible for logging messages

- use remote login service to log in messages

- send HTTP request to the endpoint

- the variable `url` and the function are scoped to only this module

- if we want to call on the module in app.js, we have to export it

### Loading a Module
```
app.js

const logger = require('./logger');

console.log(logger);
==> { log: [Function: log] }
```

- can call these functions `logger.log('message');`

- to load module in, just use the require

- store as a const instead of var so it can't be overriden based on the most recent line

```
var logger = require('./logger');
logger = 1;

logger.log('message');

==> logger.log is not a function
```

- the error message with const used instead

```
const logger = require('./logger');
logger = 1;

logger.log('message');

==> Assignment to constant vartiable
```

**Exporting a Single Function**

`module.exports = log;`

```
app.js

const log = require('./logger');
log('message');

==> message
```

- we want to export an entire module if there are multiple properties or functions available

- feel free to change the names on the other module

### Check for Errors
- run ` jshint app.js`

```
app.js: line 1, col 1, 'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).
app.js: line 3, col 1, Attempting to override 'logger' which is a constant.

2 errors
```

### Module Wrapper function
```
module.exports = log;
exports.log = log;

exports = log; //cant do because it's a reference to module.exports
```

- modules are wrapped

- if you run `console.log(__filename)`, it will show you the path this module lives under


### Path Module (Built In)
```
app.js

const path = require ('path');
var pathObj = path.parse(__filename);

==> node app.js
  root: '/',
  dir: '/Users/melanietran/personal_projects/node_app',
  base: 'app.js',
  ext: '.js',
  name: 'app'
}
```
- [docs](https://nodejs.org/dist/latest-v12.x/docs/api/path.html) of functions available for a path module

- path of the folder containing this file

### OS Module (Built In)

```
const os = require ('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`)
console.log(`Free Memory: ${freeMemory}`)

==> node app.js
Total Memory: 8589934592
Free Memory: 260997120
```
- how to get information about the current operating system

- [docs](https://nodejs.org/dist/latest-v12.x/docs/api/os.html) about the functions available for the OS module

- totalmem and freemem are defined functions

- before node, you were unable to get this information but node allows JS code to be executed outside of the browser which allows us to build APIs

### File System Module (Built In)

**Sync Function**

```
const fs = require('fs');
const files = fs.readdirSync('./')

console.log(files);

==>[ '.git', 'README.md', 'app.js', 'logger.js' ]
```

**Async Function**

```
const fs = require('fs');

fs.readdir('./', function(err, files) {
  if (err) console.log('Error', err);
  else console.log('Result', files);
})

==> Result [ '.git', 'README.md', 'app.js', 'logger.js' ]
==> Error [Error: ENOENT: no such file or directory, scandir '@']
```

- [docs](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html)

- these are the files in my machine inside this current folder

- use async methods instead of sync

## Events Module
```
const EventEmitter = require('events'); //this is a class
const emitter = new EventEmitter(); //this is an object

emitter.on('messageLogged', function(){
  console.log('Listener called');
})

emitter.emit('messageLogged')

==> Listener called
```

- events indicate that something has happened within our app

- [docs](https://nodejs.org/dist/latest-v12.x/docs/api/events.html)

- name convention indicates its a class `EventEmitter` with related methods and properties

- order is important, listener before event

**Event Arguments**

```
emitter.on('messageLogged', function(arg){
  console.log('Listener called', arg);
})

emitter.emit('messageLogged', { id: 1, url: 'http://' });

==> Listener called { id: 1, url: 'http://' }
```

- often when we want to raise an event, we want to send data

- don't do `emitter.emit('messageLogged', 1, 'url');`

- better to encapsulate those arguments within the object

- convention `arg` or `e`

- can pass data about the event that just happened

- ES6 arrow syntax

```
emitter.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
})
```

## HTTP Module (Built In)
- used to create network apps

- create webserver that listens for HTTP requests on the port; backend service

- many can use the same methods as EventEmitter

- not using this HTTP module to build api because the routes become complex

- so we use **Express** framework to build the backend service

- express is built on top of the HTTP module in Node