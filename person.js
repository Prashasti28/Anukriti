//Module Wrapper Function
// (function(exports, require, module, __filename, __dirname) {

// })

// console.log(__dirname, __filename);

class Person {
	constructor(name, age){      //constructor is a JS class
		this.name = name;
		this.age = age;
	}

	greeting() {                                                //greeting is a method
	console.log(`My name is ${this.name} and I am ${this.age}`);         
	} 
}

module.exports = Person;   //Person is a class above