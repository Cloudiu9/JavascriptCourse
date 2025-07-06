'use strict';

// convention: constructor functions start with a capital letter

// 1. Constructor functions
// arrow functions do NOT work (don't have 'this'), func declaratios and expression work
// jonas, matilda, jack are INSTANCES / OBJECTS, but Person is not a real 'class', only a constructor function (JS DOES NOT HAVE ACTUAL TRADITIONAL CLASSES (C++) BUG BUG BUG BUG)

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // method
  // BAD PRACTICE, NEVER DO THIS HERE BUG BUG BUG
  // instead, use prototypes and prototypal inheritance
  // this.calcAge = function () {
  //   console.log(2025 - this.birthYear);
  // };
};

// only diff between constr func and normal func ==>
// we call constr with 'new' keyword

const jonas = new Person('Jonas', 1991);

// new: FIXME FIXME
// 1. New {} is created (empty obj)
// 2. function is called, this = {} (in the executio context, 'this' will point to the new empty obj)
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1998);

const jay = 'Jay';

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

// Prototypes
// all obj created from this constr fun inherit all methods and props defined on the prototype property
// we do this so we don't repeat code stating the function (all objs can use this function (prototypal inheritance))
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear); // this => set to the obj calling the method
};

jonas.calcAge();

// jonas itself does NOT contain this calcAge method

// every obj has a special property called __proto__
console.log(jonas.__proto__); // prototype of jonas

// Person.prototype is actually not the prototype of person, but is used as the prototype of all the objs created with the function
console.log(jonas.__proto__ === Person.prototype); // true, but confusing

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// can also set properties on the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// 008
// prototype property of Person
console.log(jonas.__proto__);

// prototype of jonas' prototype (of Person) == Object
// works because of PROTOTYPE CHAIN FIXME
console.log(jonas.__proto__.__proto__);

// prototype of Object == null (top of the prototype chain)
console.log(jonas.__proto__.__proto__.__proto__);

// points back at Person
console.dir(Person.prototype.constructor);

// any function is ALSO an object, it also has a prototype
// same for arrays

const arr = [3, 4, 6, 6, 6, 6, 6, 4, 3, 9, 8, 9]; // same as new Array

// Array
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

// Object
console.log(arr.__proto__.__proto__);

// make all arrays inherit a method
// GENERALLY NOT A GOOD IDEA BUG
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
// all DOM elements are objects
// huge proto chain: ... -> htmlelement -> element -> node
console.dir(h1);

// function prototype
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (brand, speed) {
//   this.brand = brand;
//   this.speed = speed;
// };

// // SPEED += 10 BUGBUGBUG NOT JUST SPEED + 10 FIXME
// Car.prototype.accelerate = function () {
//   console.log(`'${this.brand}' has ${(this.speed += 10)} km/h`);
// };

// Car.prototype.brake = function () {
//   console.log(`'${this.brand}' has ${(this.speed -= 5)} km/h`);
// };

// const BMW = new Car('BMW', 110);
// const Mercedes = new Car('Mercedes', 100);

// BMW.accelerate();
// BMW.brake();
// BMW.accelerate();
// BMW.brake();
// BMW.accelerate();
// BMW.brake();

// Mercedes.accelerate();
// Mercedes.brake();

// ES6 Classes - same thing, nicer syntax
// classes are still functions

// class expression
// const PersonCl = class {
// }

// class declaration
// class PersonCl {
//   // is auto called when making a new obj
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

// Instance methods
// Methods will be added to .prototype property

// this is not on the actual objects, just on their prototypes
// (prototypal inheritance)
// calcAge() {
//   console.log(2037 - this.birthYear);
// }

// greet() {
//   console.log(`Hello ${this.firstName}`);
// }

// get age() {
//   return 2025 - this.birthYear;
// }

// fullName prop already exists ==> this setter gets executed each time the constructor func is executed (fullName becomes name)
// leaving this.fullName creates an error as they're both assigning to the same variable ==> we need this._fullName (different variable, _ as a covention) ==> but this is undefined, so we need a getter
// set fullName(name) {
//   if (name.includes(' ')) this._fullName = name;
//   else alert(`${name} is not a full name.`);
// }

// get fullName() {
//   return this._fullName;
// }

// ==> setter makes the property be called "_fullName", but then jessica.fullName becomes undefined, so we need the getter

//   static hey() {
//     console.log('Wave');
//     console.log(this); // entire class
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1999);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // same return as calcage func, but as a getter
// console.log(jessica.age);

// // same thing
// // PersonCl.prototype.greet = function () {
// //   console.log(`Hello ${this.firstName}`);
// // };

// jessica.greet();

// const walter = new PersonCl('Walter White', 1965);
// console.log(walter.fullName);

// 1. Classes are NOT hoisted FIXME (function declarations are hoisted) (can be used anywhere before being declared)
// 2. Classes are first-class citizens (pass them into functions, return them from functions) (because classes are just special functions)
// 3. Classes are executed in strict mode

// Setters and getters (useful for data validation) FIXME
// object literals:
const account = {
  owner: 'jonas',
  movements: [200, 520, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// dont call the method, call as if it were a property
console.log(account.latest); // 300

// call as if it were a property BUGBUG
account.latest = 50;
console.log(account.movements); // 50 at the end

// 012. Static methods
// Array.from
Array.from(document.querySelectorAll('h1')); // [h1] NodeList

// [1,2,3].from() // error, because .from is attached to the entire constructor, NOT to the PROTOTYPE property ==> it does NOT get inherited (it's in the array namespace)
// another ex: Number.parsefloat() (only works when called like this)

Person.hey = function () {
  console.log('Wave');
  console.log(this); // entire constructor function
};

Person.hey();
// jonas.hey(); // does NOT work (hey doesn't get inherited)

// PersonCl.hey();

// 013. Object.create
// third way of creating objects

// prototype of all person obj
const PersonProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },

  // can have any name, acts as a constructor
  // does not actually have anything to do with a constructor func, we're not using 'new' to call this, instead we call this func manually
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // returns a brand new obj linked to the prototype

console.log(steven); // empty properties but has calcAge from prototype
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // works

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1999);
console.log(sarah);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (brand, speed) {
//   this.brand = brand;
//   this.speed = speed;
// };

// // SPEED += 10 BUGBUGBUG NOT JUST SPEED + 10 FIXME
// Car.prototype.accelerate = function () {
//   console.log(`'${this.brand}' has ${(this.speed += 10)} km/h`);
// };

// Car.prototype.brake = function () {
//   console.log(`'${this.brand}' has ${(this.speed -= 5)} km/h`);
// };

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     console.log(`${this.make} has ${(this.speed += 10)} km/h`);
//   }

//   brake() {
//     console.log(`${this.make} has ${(this.speed -= 5)} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   // converts speedUS property (that we have to set manually) to km/h
//   // so .speedUS = 50 => .speed = 80
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const Ford = new Car('Ford', 120);
// console.log(Ford.speedUS);
// Ford.accelerate();
// Ford.accelerate();
// Ford.brake();
// console.log(Ford.speedUS);

// Ford.speedUS = 50;
// console.log(Ford.speedUS);
// console.log(Ford.speed);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
*/

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // BUG in video:
  // console.log(`My name is ${this.fullName} and I study ${this.course}`);

  // FIX:
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

// Encapsulation
// access properties only through public interfaces (APIs)
// essential in every normal app

// real private class fields were added in ~2022
// we use 'fake encapsulation' here (this._movements => convention 'protected' property, still accessible if we use _ outside, but marked as 'not supposed to be touched')

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances)
  // exist in all instances (NOT ON THE PROTOTYPE BUG), but not passed in
  // looks like  variable, but no const or let or this.
  locale = navigator.language;

  // 2) Private fields (instances) FIXME
  // truly not accesible from the outside
  // property is actually called #movements

  // console.log(acc1.#movements); // SYNTAX ERROR: Private Field

  // the point of this is to modify it ONLY by using methods (getMovements)
  #movements = [];
  #pin; // creating an 'empty variable' for the private property (because it's in the constructor func)

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this; // chaining
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      // if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this; // chaining
    }
  }

  // not available on all instances, only on the class itself
  // account.helper()
  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  #approveLoan(val) {
    // _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// console.log(acc1.#movements);

// Chaining methods
// return the object (return this) itself at the end of a chainable method

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(400);

console.log(acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 110, 22);

rivian.accelerate().accelerate().brake().chargeBattery(22).accelerate();
