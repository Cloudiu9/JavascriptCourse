'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun '];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  // can also write computations here, like
  // [day-${2+2}]
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literal
  openingHours,

  // OLD WAY
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // ES6
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Immediately destructuring the SINGLE object passed into the function (1 argument)
  orderDelivery({
    starterIndex = 1, // default index = 1
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}}`
    );
  },

  // restaurant.orderDelivery({
  //   time: '22:30',
  //   address: 'Via del Sole, 21',
  //   mainIndex: 2,
  //   starterIndex: 2,
  // });

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here's your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// Array destructuring = unpacking values into separate variables (break a complex DS into a simple DS)
/*
// Without destructuring
const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// Destructuring
// [x, y, z] is NOT an array FIXME
// OG arr is not affected
const [x, y, z] = arr;

// Skipping an element is done with ' ,' FIXME
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Old way of exchanging variables
// const temp = main;
// main = secondary;
// secondary = temp;

// Switching using destructuring
[secondary, main] = [main, secondary];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic bread, pizza

const nested = [2, 4, ['a', 'b']];
const [one, two, three] = nested;
console.log(one, two, three);

// Var for each  of the array's components
// Nested destructuring BUG
const [i, j, [k, l]] = nested;
console.log(i, j, k, l);

// Default values
// const [p, q, r] = [8, 9]; // r = undefined
const [p = 1, q = 1, r = 1] = [8, 9]; // r = 1

// BUG

// FIXME Destructuring Objects
// {exact property names from the object} = object

const { name, openingHours, categories } = restaurant;

// Different names (renaming the properties)

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

// Default values (in case properties are not found)
// empty array instead of undefined

const { menu = [], starterMenu: starters = [] } = restaurant;

// Mutating variables

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
// have to wrap it in ()

({ a, b } = obj);
console.log(a, b);
// a = 23, b = 7

// Nested objects

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 2,
});

*/

/*
// Spread Operator FIXME

const arr = [7, 8, 9];

// Takes all the values out of the arr and writes the individually
const newArr = [1, 2, ...arr];
console.log(newArr); // 1, 2, 7, 8, 9

// just one big value: the array
console.log(newArr);

// each value individually
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Spread operator takes all elements, but does not create new variables BUG
// we can only use it in places where we would write values separated by commas

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// BUG Spread operator works on all ITERABLES (and obj)
// ITERABLES: arrays, strings, maps, sets (NOT objects) FIXME

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // J O N A S ' ' S.
console.log(...str);
// console.log(`${...str}` Schmedtmann); // does not expect multiple values separated by a comma

const ingredients = [
  prompt(`Let's make pasta!: Ingredient 1:`),
  prompt(`Let's make pasta!: Ingredient 2:`),
  prompt(`Let's make pasta!: Ingredient 3:`),
];

console.log(ingredients); // array of "a", "b", "c"

// Old way
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// Better way
restaurant.orderPasta(...ingredients);

// Objects

const newRestaurant = {
  foundingYear: 1998,
  ...restaurant,
  owner: 'Foccacio',
  makePizza: function () {
    console.log('Pizza is done.');
  },
};
console.log(newRestaurant);

// Copying with spread
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante';
console.log(restaurant.name);
console.log(restaurantCopy.name); // different
*/

/*
// REST PATTERN uses same syntax as spread
// but it collects multiple elements and packs them into an array (the opposite of spread)

// DESTRUCTURING FIXME

// SPREAD, because on right side of = FIXME
const arr = [1, 2, ...[3, 4]];

// REST, because on left side of = FIXME
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1, 2, [3, 4, 5] (aka the REST of the elements, hence the name)

// naming variables Pizza and Risotto because those are the names of the 1 and 3rd elements of the mainMenu BUG
// Rest element must be last element FIXME
const [Pizza, , Risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

// does NOT include the skipped element BUG
console.log(Pizza, Risotto, otherFood); // Pizza Risotto [Focaccia, Bruschetta, GB, CS]

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// FUNCTIONS FIXME
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
  // console.log(numbers); // array of all arguments
};
console.log(add(2, 3));
console.log(add(5, 3, 7, 2));
console.log(add(8, 2, 5, 3, 2, 1, 4));

// FIXME FIXME SPREAD EXPAND /// REST COMPRESS FIXME

const x = [23, 5, 7];
add(...x);

// orderPizza: function (mainIngredient, ...otherIngredients) {
//   console.log(mainIngredient, otherIngredients);
// },

restaurant.orderPizza('mushrooms', 'onion', ' olives', 'spinach'); // mushroom, [array of rest args]
restaurant.order('mushrooms'); // mushrooms, [empty]

// SPREAD, REST = LOOK SAME, WORK OPPOSITE FIXME BUG
// SPREAD is used where we would write VALUES separated by ,
// REST is used where we would write VARIABLE NAMES separated by ,

*/

// SHORT CIRCUITING (&& and ||)

// Logical Operator Rules BUG
// FIXME Use ANY data type, return ANY data type, short circuiting
/*
// BUG OR OPERATOR BUG

console.log(3 || 'Jonas'); // 3 (if first value is truthy, return that (opposite of &&))
console.log('' || 'Jonas'); // 'Jonas' ('' is falsy)
console.log(true || 0); // true
console.log(undefined || null); // null (null is also falsy, but undefined is the first falsy)

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello (the first truthy value in the chain FIXME)

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; // guests1 is = to res.numGuests if it exists; otherwise = 10 (default)
console.log(guests1); // 10

// Better way BUG

const guests2 = restaurant.numGuests || 10;
console.log(guest2); // numGuests = undefined (falsy) ==> def val of 10

// if numGuests = 0, ==> 10 (not what we want)

// FIXME AND OPERATOR FIXME
console.log(0 && 'Jonas'); // 0 (if first value is falsy, return that (opposite of ||))
console.log(7 && 'Jonas'); // Jonas

console.log('Hello' && 23 && null & 'Jonas'); // null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// Better way BUG

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); // stops if it doesn't exist

// FIXME BUG
// OR returns first truthy value or last value if all are falsy
// AND returns first falsy value or last value if all are truthy

// OR can be used to set default values
// AND can be used to execute code in the second operand if first is true

*/
/*
// LOGICAL ASSIGNMENT OPERATOR

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Giorgio',
};

// we want to apply a default numGuests to all restaurants that dont have that property

// if first val is truthy, it is returned; 2nd value is not evaluated BUG
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator

// same meaning as above, but more concise BUG
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH assignment operator (works if numGuests = 0)
// nullish = null or undefined BUG
// rest1 is null, rest2 is undefined, both cases work
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// short circuits if first value is falsy; it isn't, so the 2nd is returned
// useful for assigning a value to an already existing variable
// rest1.owner = rest1.owner && '<HIDDEN>'; // UNDEFINED
// rest2.owner = rest2.owner && '<HIDDEN>';

rest1.owner &&= '<HIDDEN>'; // not undefined, just not there BUG
rest2.owner &&= '<HIDDEN>';

console.log(rest1, rest2); // rest2.numGuests = 10
*/

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
/*

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Simple destructuring
const [players1, players2] = game.players;
console.log(players1, players2);

// 2. Using rest operator
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Using spread operator
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4. Using spread and adding at the end
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5. Object destructuring and renaming (x: draw) ==> exact name from object: new name
const { team1, x: draw, team2 } = { ...game.odds };
console.log(team1, draw, team2);

// OR
// const {odds: {team1, x: draw, team2}} = game

// 6. Spread operator in function arguments to allow any number of arguments
// Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
const printGoals = function (...playerName) {
  console.log(...playerName, playerName.length);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7. Use AND logical operator to execute the second operand (because the first is true)

team1 < team2 && console.log('team1 won!');
team2 < team1 && console.log('team2 won!');

*/

// FOR OF loop BUG
// can continue / break

/*
const menu = [...restaurant.categories.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item); // individually logs every item

// loops over the entire array and give us access to the current array elem in each iteration

// to get index:
for (const item of menu.entries()) {
  // old way
  console.log(`${item[0] + 1}: ${item[1]}`); // each item is now an array made of the index and the element
}

console.log(menu.entries()); // array iterator
console.log(...menu.entries()); // an array that has an array on each position that contains the index position + elem

// destructuring (better way, same output as above BUG)
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

*/

// ENHANCED OBJECT LITERALS BUG
// restaurant is an object literal, it's written with {......}

// ES6 enhanced object literal
// openingHours,

// // OLD WAY
// // order: function (starterIndex, mainIndex) {
// //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// // },

// // ES6
// order(starterIndex, mainIndex) {
//   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// },

/*
// OPTIONAL CHAINING FIXME
// if property doesn't exist ==> return undefined
// used together with NULLISH COALESCING OPERATOR to set a default value in case of failure

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); // undefined.open ==> error

// OR
// WITH OPTIONAL CHAINING BUG
console.log(restaurant.openingHours.mon?.open); // only if ...... .mon exists it will read the .open property (it exists if it is not noll or undefined BUG) ==> returns undefined instead of error

console.log(restaurant.openingHours?.mon?.open); // checks for the existance of .openingHours

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);

  // we can't do restaurant.openingHours.day, have to put the variable in []
  // because it is not an actual property of the object
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // default value of closed using nullish coalescing op
  console.log(On ${day}, we open at ${open});

  // ^^^ is the same as doing openingHours.mon , openingHours.tue ..., but it is done dynamically from the array
}

// Methods BUG
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // works
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); // Method does not exist

// Arrays BUG
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? User array empty); // only if elem 0 exists it takes the name

// same as

if (users.length >= 0) console.log(users[0].name);
else console.log(User array empty);
*/

// LOOPING OBJECT KEYS, VALUES, ENTRIES FIXME
/*
// property NAMES (or keys) BUG
const properties = Object.keys(openingHours);
console.log(properties); // array of the 3 prop names

let openStr = `We're open for ${Object.keys(openingHours).length} days: `;

for (const day of Object.keys(openingHours)) {
  // console.log(day); // thu fri sat, the 3 key names of the obj
  openStr += `${day}`; // adds the 3 days at the end
}
console.log(openStr);

// property VALUES BUG
const values = Object.values(openingHours);
console.log(values);
/* {
  open: 11,
  close: 23,
}
*/
/*
// property ENTRIES, ENTIRE OBJECT BUG (key + value)
const entries = Object.entries(openingHours);
// console.log(entries);

// specify exactly the property names of the obj ==> they get destructured FIXME
// [key, value]

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Using destructuring with for of loop of .entries() (an array on each position that contains the index position + elem)
for (const [goal, name] of game.scored.entries()) {
  console.log(`Goal ${goal + 1}: ${name}`);
}

// 2. Looping over the obj values, adding all values into a 'sum' variable then dividing the sum by its length to find avg
// use the object itself, don't destruct it into variables, calc the avg of the var in the obj
let sum = 0;
let avg = 0;

const oddsVals = Object.values(game.odds);

for (const odd of oddsVals) {
  sum += odd;
  console.log(sum);
  avg = sum / oddsVals.length;
  console.log(`Final average of the odds is: ${avg}`);
}

// 3.
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

// for (const name of Object.keys(game))

console.log(Object.entries(game));

for (const [team, odds] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odds}`);
}
*/

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/
/*

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Making a set, populating it with the values from the map, converting it into an array with spread operator
const eventSet = new Set();

for (let [min, event] of gameEvents) {
  eventSet.add(event);
}
// console.log(eventSet);

const events = [...eventSet];

console.log(events);

// OR

const eventsBetter = [...new Set(gameEvents.values())];

// 2. Removing key 64 from map
// console.log(gameEvents);
gameEvents.delete(64);
// console.log(gameEvents);

// 3. Average of game events minutes (of the keys) BUG : OVERCOMPLICATED / MISUNDERSTOOD

// let sum = 0;
// let avg = 0;
// let diff = 0;
// const gameLength = 90;

// for (let [minute, event] of gameEvents) {
//   diff = minute[1] - minute[0];
//   console.log(diff);
//   // avg = sum / gameEvents.size;
//   // console.log(avg);
// }

// for (let i = 0; i <= gameEvents.size; i++) {
//   let min = [...gameEvents.keys()];
//   diff = min[1] - min[0];
//   avg = diff / gameLength;
//   console.log(diff);
// }

// 3. Divide the game length of 90 by the number of events that happened in 90 mins, excluding the final one (its min 92) (OR just size, because we already excluded one)

console.log(
  'An event happened, on average, every ' + 90 / gameEvents.size + ' minutes'
);

// OR to be more precise

const time = [...gameEvents.keys()].pop();
console.log(
  'An event happened, on average, every ' + time / gameEvents.size + ' minutes'
);

// 4. Need to compare key (minute) to 45
/*
Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
*/
/*
for (const [minute, event] of gameEvents) {
  if (minute <= 45) console.log(`[FIRST HALF] ${minute}: ${event}`);
  if (minute > 45) console.log(`[SECOND HALF] ${minute}: ${event}`);
}

// OR better way:
for (const [minute, event] of gameEvents) {
  let half = minute <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${minute}: ${event}`);
}
*/

// STRINGS 1.

/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[2]); // 2
console.log('B7E7'[0]); // B

// reading length BUG
console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // position number 6
console.log(airline.lastIndexOf('r')); // position number 10
console.log(airline.indexOf('Portugal')); // 8
console.log(airline.indexOf('portugal')); // -1

// slice(4) means that the method will start to extract the string from position 4 BUG
console.log(airline.slice(4)); // Air Portugal (substring) FIXME

// slice(4, 7) - 4 is the 'begin' parameter, 7 is the 'end' parameter BUG
// the begin value is included in the string, but the end is not FIXME
// length of the substring is always end-begin (4-7 = 3) BUG
console.log(airline.slice(4, 7)); // Air

// extract first word FIXME
console.log(airline.slice(0, airline.indexOf(' '))); // TAP

// extract last word FIXME
console.log(airline.slice(airline.lastIndexOf(' ', airline.length)));
// OR w/o the end parameter, because it is the last word anyway

console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// start extracting from the end BUG
console.log(airline.slice(-2)); // al

// omit first and last letter
console.log(airline.slice((1, -1))); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  // extracts last letter
  const letter = seat.slice(-1);
  if (letter === 'B' || letter === 'E') console.log('Mid');
  else console.log('Not mid');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// whenever we call a method on a string (which is a primitive), JS converts it into a string object, which allows methods to be called BUG
// this process is called BOXING FIXME
// new String('jonas') // object
// all string methods still return PRIMITIVES BUG BUG BUG

*/
// STRINGS 2
/*
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fixing capitalization in name

const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase + passengerLower.slice[1];

const fixName = function (name) {
  const nameLower = name.toLowerCase();
  const nameCorrect = nameLower[0] + name.slice[1];
  console.log(nameCorrect);
};

// Check / compare email FIXME
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// Usually, first step is to convert to lowercase
const lowerEmail = loginEmail.toLowerCase();

// Getting rid of empty spaces and enter
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// We can do all in 1 step BUG BUG
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

const checkEmail = function (goodEmail, badEmail) {
  const emailNorm = badEmail.toLowerCase().trim();
  console.log(goodEmail === emailNorm ? 'Email verified.' : 'Wrong email');
};

// Replace part of strings FIXME
const priceGB = '288,97₤'; // in Eu u use comma, in US dot

// replace(what you want to replace, what to replace it with)
const priceUS = priceGB.replace('₤', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23';

// replace() only replaces first occurance; 'Door' will not work; it is case sensitive BUG
console.log(announcement.replaceAll('door', 'gate'));

// this regular expression makes every instance of it to be targeted (g = global)
console.log(announcement.replace(/door/g, 'gate'));

// Booleans FIXME

const plane = 'Airbus A320neo';
console.log(plane.includes('20ne')); // true
console.log(plane.startsWith('Airb')); // true

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('New plane');

// Exercise
const checkBaggage = function (items) {
  // again, always start by making it lowercase BUG BUG FIXME
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('Not allowed');
  else console.log('Welcome');
};
checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('Socks and a camera');
checkBaggage('Got some snacks and a gun for protection');
*/

// STRING 3
/*
// SPLIT into multiple parts based on divider FIXME BUG

console.log(`a+very+nice+string`.split('+')); // stores result in an array of 4 elements
console.log(`Jonas Schmedtmann`.split(' '));

// using destructuring BUG BUG BUG
const [firstName, lastName] = `Jonas Schmedtmann`.split(' ');

// JOIN is the opposite of split FIXME BUG

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
const namesUpper = [];

const capitalizeName = function (name) {
  // BUG BUG BUG
  let names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // 1. making first letter uppercase + adding rest
    // push into an array to join later FIXME
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));

    // 2. replacing first letter with uppercase
    // namesUpper.push(n.replace(n[(0, n[0].toUpperCase())]))
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    console.log(typeof namesUpper);
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding a string BUG
const message = 'Go to gate 23';

// padStart(desired length after padding, 'char to use')
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+'));

const maskCreditCard = function (number) {
  // another way to convert a num to a string
  // works because if one of the operands is a string, it will convert all ops into a string BUG BUG
  // String(number)
  const str = number + '';
  const lastFour = str.slice(-4);
  console.log(lastFour.padStart(str.length, '*'));
};

maskCreditCard(1234567899);
maskCreditCard('1314319391943918537');

// REPEAT method repeats same string BUG

const message2 = 'Bad weather... ';
console.log(message2.repeat(5)); // one big string

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(4);
planesInLine(10);
*/

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// MY VERSION

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;

  const separate = text.split('\n');

  // we need separate.entries to get the current index (for the last task of emojis)
  // ===> [index, element] in separate.entries()
  for (const [i, word] of separate.entries()) {
    let words = word.trim().toLowerCase();

    let wIndex = words.indexOf('_');

    // getting the substring after _
    let wIndexSlicePlus = words.slice(wIndex + 1);

    // replacing _ with the letter after in uppercase
    let camelC = words.replaceAll('_', wIndexSlicePlus[0].toLocaleUpperCase());

    // need to skip character after _ (wIndex)
    let combined = camelC.slice(0, wIndex + 1) + camelC.slice(wIndex + 2);

    // ------------ w/o video
    // padEnd(20, ' ') is the same as padEnd(20)
    let emoji = combined.padEnd(20);

    console.log(`${emoji}${'🐱‍👤'.repeat(i + 1)}`);
  }
});

/*
// VIDEO VERSION

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;

  const rows = text.split('\n');

  // we need rows.entries to get the current index (for the last task of emojis)
  // ===> [index, element] in rows.entries()
  for (const [i, row] of rows.entries()) {
    // destructuring into two words by splitting '_'
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'🐱‍🏍'.repeat(i + 1)}`);
  }
});
*/
