const os = require ('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// console.log('Total Memory: ' + totalMemory);
// console.log('Free Memory: ' + freeMemory);

// ES6 / ES2015 : ECMAScript 6
//defines what features are available in JS
//build string without concatnation

//Template String
// use backticks (``) and ${}
console.log(`Total Memory: ${totalMemory}`)
console.log(`Free Memory: ${freeMemory}`)