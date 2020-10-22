const fs = require('fs');
const path = require('path');

//Create folder
// fs.mkdir(path.join(__dirname, '/test'), {}, err => {
//	if(err) throw err;
//	console.log('Folder created...');    //this way we created a folder 'test'
// });

// Create and write to file
//fs.writeFile(
//	path.join(__dirname, '/test', 'hello.txt'), 
//	'Hello World ',
//	err => {
//	if(err) throw err;
//	console.log('File written to...');    //this way we created a folder 'test'
  


	    // File append otherwise it will overwrite
//	    fs.appendFile(
//			path.join(__dirname, '/test', 'hello.txt'), 
//			'  I hate AP',
//			err => {
//			if(err) throw err;
//			console.log('File written to...');    //this way we created a folder 'test'
//	        }
  //     );
 //  }
//);


// Read File
//fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
//	if(err) throw err;
//	console.log(data);    
//});


//Rename File
fs.rename(
	path.join(__dirname, '/test', 'hello.txt'), 
	path.join(__dirname, '/test', 'hello_rename.txt'), 
	err => {
		if(err) throw err;
		console.log('File renamed..');    
    }
);