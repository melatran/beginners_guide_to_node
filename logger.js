console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';
//implementation detail so other modules don't need to know about it, just the function

function log(message) {
  //send an http request
  console.log(message);
}

module.exports = log;
// exports.log = log;

// exports = log; //cant do because it's a reference to module.exports

