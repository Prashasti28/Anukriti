const path = require('path');    //we don't require to attach it to any path

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename).base);

// Concatenate paths
// ../test/hello.html
console.log(path.join(__dirname, 'test', 'hello.html'));   //this way you can join a html page here
