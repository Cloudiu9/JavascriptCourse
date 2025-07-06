'use strict';

/*
function calcAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;

  function printAge() {
    let output = `${firstName} is ${age}, born in ${birthYear}`;

    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      // can have different variables with the same name
      // Creating new variables with same name as outer scopes
      const firstName = 'Steven';

      // REASSIGNING outerscope variable
      output = 'NEW';
      var millenial = true;
      const str = `${firstName} is a millenial`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // error
    // console.log(str);
    // only works with strict mode off
    // console.log(add(2, 5));
    // var == function scoped, cant be block scoped
    console.log(millenial);
    console.log(output);
  }

  //   console.log(millenial);
  // error
  //   console.log(str);
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// error
// console.log(age);
// printAge()

*/

/*
// THIS

console.log(this); // ==> points to window

// regular function call, no object owner
const calcAge = function (birthYear) {
  console.log(2034 - birthYear);
  console.log(this); // ==> points to undefined
};

calcAge(1994);

// arrow function does NOT get a this keyword
// it only has a 'lexical this' ==> parent scope (window)

const calcAgeArrow = birthYear => {
  console.log(2034 - birthYear);
  console.log(this); // ==> undefined
};
calcAgeArrow(1994);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(2024 - this.year);
    console.log(this); // ==> points to 'jonas' object
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

// FIXME METHOD BORROWING
matilda.calcAge = jonas.calcAge;

matilda.calcAge(); // ==> 'matilda' object

// FIXME A FUNCTION IS JUST A VALUE
const f = jonas.calcAge;
f(); // ==> UNDEFINED, no owner anymore, just a regular function
*/

// REGULAR FUNCTIONS VS ARROW FUNCTIONS

// this causes the Global WINDOW object to have a 'firstName' attribute, leading to the 'greet' function to say 'Hey Matilda'
var firstName = 'Matilda';

// 'this' in the arrow functions does not work, because
// FIXME an object does NOT CREATE A CODE BLOCK
// all of the object is still in the globl scope

const jonas = {
  year: 1991,
  firstName: 'jonas',
  calcAge: function () {
    console.log(2024 - this.year);
    //console.log(this); // ==> points to 'jonas' object

    // SOLUTION 1 (PRE ES6)

    // saving the 'this' that points to the object in a variable for the function
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self); // ==> undefined, FIXME BECAUSE IT IS A REGULAR FUNCTION CALL
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996); // undefined
    // };
    // isMillenial();

    // SOLUTION 2
    // FIXME ARROW FUNCTION WORKS BECAUSE IT POINTS TO THE PARENT SCOPE

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  // FIXME NEVER USE ARROW FUNCTIONS AS METHODS FIXME
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`); // undefined, becomes window.firstName
  },

  /* // works correctly
  greet: function() {
    console.log(this);
    console.log(`Hey ${this.firstName}`); // undefined, becomes window.firstName
  },
  */
};

jonas.greet();
jonas.calcAge();

// ARGUMENTS keyword BUG
// only exists in regular functions (expr, decl), not in arrow
// useful for dealing with more parameters, but is outdated

const addExpr = function (a, b) {
  console.log(arguments); // returns an array of the parameters
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 6, 7); // still works despite not being assigned variable names

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
// addArrow(2, 5, 7); // arguments not defined

let age = 30;
let oldAge = age;
age = 31;
console.log(age); // 31
console.log(oldAge); // 30

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;

// console.log('Friend:', friend);
// console.log('Me:', me); // both are 27

// Primitive types
let lastName = 'Wiliams';
let oldLastName = lastName;
lastName = 'Davis';

// Reference types
const jess = {
  firstName: 'Jess',
  lastName: 'Williams',
  age: 27,
};

// FIXME instead of copying the object, we are just creating a new variable that points to the exact same object

// BUG const works here because the actual change is made in the heap; the value in the call stack does NOT change (pointer to the obj)
// can't do marriedJessica = {}, it is an entirely new object
const marriedJessica = jess;
marriedJessica.lastName = 'Davis'; // changes both the original obj and var

// Copying objects
const jess2 = {
  firstName: 'Jess',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// Creates a new object (works on first level)
// only creates a 'shallow copy' (if there is an object inside the object, the inner object will still be the same)
const jessicaCopy = Object.assign({}, jess2);
jessicaCopy.lastName = 'Davis';

console.log(`Before marriage:`, jess2); // Williams
console.log(`After marriage:`, jessicaCopy); // Davis

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

// both have a family of 4 members
console.log(`Before marriage:`, jess2); // Williams
console.log(`After marriage:`, jessicaCopy); // Davis
