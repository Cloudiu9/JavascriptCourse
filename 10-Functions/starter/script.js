'use strict';

/*
///////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);


///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas);


///////////////////////////////////////
// Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);


///////////////////////////////////////
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');
*/

///////////////////////////////////////
// The call and apply Methods
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// BIND METHOD

// similar to call, but it doesn't immediately call the func
// it returns a new func, where the this keyword is bound

// book.call(eurowings, 23, 'Sarah Williams');

// book.bind(eurowings); will NOT call the book function, it will just create a fnc where "this" = eurowings
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);

bookEW(23, 'Steven');

// can use bind to set in stone parameters
// this is called PARTIAL APPLICATION FIXME
// (applying some parameters before calling the fnc)

const bookEW23 = book.bind(eurowings, 23);
bookEW23('John');

// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

const buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

const buyPlaneLH = buyPlane.bind(lufthansa);

// cl is NaN, because this now points to the button element (because buyPlane is attached to it)
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// first arg of bind() is THIS keyword, but we don't care about it here, so we set it to NULL
const addVAT = addTax.bind(null, 0.23);
// same as:
// addVAT = value => value + value * 0.23
// same as: (function returning function)
console.log(addVAT(100)); // 123

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const VAT23 = addTaxRate(0.23);
console.log(VAT23(100)); // 123
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// MY VERSION

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),

//   /*
//  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)
//   */
//   registerNewAnswer() {
//     const answer = Number(
//       prompt(
//         `What is your favourite programming language \n 0: JavaScript \n1: Python \n2: Rust \n3: C++ \n(Write option number)`
//       )
//     );

//     // console.log(typeof answer, answer);

//     /*
//      1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
//     */
//     if (typeof answer == 'number' && answer < 4 && answer >= 0)
//       this.answers[answer]++;
//     // var regex = /^[a-zA-Z]+$/;
//     // if (answer.match(regex) && answer < 4 && answer >= 0)
//     //   this.answers[answer]++;

//     this.displayRestults(answer);
//   },

//   /*
//     3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
//     */
//   //   displayRestults(type) {
//   //     if (Array.isArray(type)) {
//   //       console.log(poll.answers);
//   //     } else if (typeof type == 'string') {
//   //       console.log(`Poll reults are ${poll.answers.join(', ')}`);
//   //     } else {
//   //       console.log('ERROR! Not a string or an array.');
//   //     }

/*
I misunderstood "The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is"

I thought that the ACTUAL TYPE of type should be an array or a string, not that type is just = 'array'
*/

//   displayRestults(type = 'array') {
//     // console.log(typeof type, type);
//     if (typeof type == 'number' || Array.isArray(type)) {
//       console.log(this.answers);
//     } else if (typeof type == 'string') {
//       console.log(`Poll reults are ${this.answers.join(', ')}`);
//     } else {
//       console.log('ERROR! Not a string or an array.');
//     }
//   },
// };

// // poll.registerNewAnswer();
// // console.log(poll);

// /*
// 2. Call this method whenever the user clicks the "Answer poll" button.
// */

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// // poll.displayRestults(1);
// // poll.displayRestults('string');

// // BONUS TEST DATA 1: [5, 2, 3]
// // BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// poll.displayRestults.call({ answers: [5, 2, 3] }, new Array());

// VIDEO VERSION
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  /*
   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
          What is your favourite programming language?
          0: JavaScript
          1: Python
          2: Rust
          3: C++
          (Write option number)
  
  registerNewAnswer() {
    const answer = Number(
      // Get answer 1.1
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register anwser 1.2
    // using shortcircuiting (if any part is false, last ++ will not execute)
    typeof answer === 'number' &&
      answer < this.answers.length() &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults('string');

poll.displayResults.call({ answers: [5, 2, 3] });
*/

/*
// IMMEDIATELY INVOKED FUNCTIONS FIXME
// executing functions only once

// const runOnce = function() {
//   console.log("This will never run again.");
// }
// runOnce();

// wrap the statement into () ==> becomes an expression ==> () to call
// Immediately Invoked Function Expression (IIFE) BUG

// useful for DATA ENCAPSULATION BUG
// protecting variables from accidentaly being overwritten by
// other parts

(function () {
  console.log('This will never run again.');
})();

(() => console.log('This will also never fun again'))();

// IIFE are not really used anymore, because we can just
// encapsulate data with a block:
// (var ignores current scope, leaks out into the global scope)

{
  const isPrivate = 23;
  var notPrivate = 46;
}

console.log(isPrivate);
console.log(notPrivate);
*/

// CLOSURES
/*
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

// secureBooking() has finished executing;
// its execution context is no longer on the stack
const booker = secureBooking();

// so how does passengerCount increment?
booker();
booker();
booker();

// booker is just a func that exists in the global scope/environment

// the secureBooking() function environment is no longer active; it is gone;
// still, booker() can access the variables that were present when the secureBooking() was created (passengerCount) ==> CLOSURE

// FIXME BUG
// A closure makes a function remember all the variables that existed at the function's birthplace (secureBooking() is the birthplace of booker())

// FIXME
// Any function always has access to the variable environment of the execution context in which the func was created

// BUG
// Closures have priority over scope chain
// ==> if there ws a passengerCount global variable set to 10, the booker() would ignore that, and instead keep using the one from its birthplace that was set to 0
let passengerCount = 10;
booker(); // passengerCount = 4;

console.dir(booker); // [[Scopes]]: [3] ([[]] ==> internal property that cant be accessed from our code)
// 0: Closure (secureBooking) passengerCount: 3
// (the variable environment (VE) is being preserved by the function)

// More closure examples

// we don't necessarily need to return a func from another func to create a closure

// Example 1:

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); // 46
// f variable was defined out, in the global scope, but it still accessed a (it closed over the variable environment of the g function)
// a variable is inside the backpack of the f func

const h = function () {
  const b = 100;
  f = function () {
    console.log(b * 2);
  };
};

h(); // f var will be assigned again
f(); // 200 ==> also closed over the b variable from h

// BUG f remembered a from its birthplace, then f was reborn in h, remembering b FIXME

// Example 2:

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // setTimeout(function to be executed, time to wait until it is executed in MS)
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, (wait = 1000));

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 100000;
boardPassengers(180, 3); // ignores global perGroup ^^
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();

// when body is clicked, addeventlistener is triggered, calling the callback anon arrow function to change the header to blue
// the arrow func has access to the 'header' var because it is a closure; it can change all the variables from its birthplace (the immediately invoked func expression, which has by then executed, meaning the 'header' variable is gone)
