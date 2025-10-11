'strict mode';

// const { tail } = require('lodash-es');

// obj.freeze only freezes first level of the object (arrays are still objects) (not a deep freeze)
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000; // this works through the freeze
// budget[9] = 'jonas'; // this doesn't

// by adding Obj.freeze(), we make this object IMMUTABLE: can't add more properties into it
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// if there is a property with this name, user it; else, set it to 0
const getLimit = (limits, user) => limits?.[user] ?? 0;

// impure function, because it tries to manipulate an object outside of it

// now it is a PURE FUNCTION
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase(); // don't mutate, make a new variable

  return value <= getLimit(limits, cleanUser)
    ? // copy of state array
      [...state, { value: -value, description, user: cleanUser }]
    : state;

  // outside manipulated object (bad)
  // budget.push({ value: -value, description, user: cleanUser });
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget);

console.log(newBudget3);

// const checkExpenses = function (state, limits) {
//   // make a copy ==> add a property to the copy
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
// };

// PURE FUNCTION (because it returns a brand new array)
const checkExpenses = (state, limits) =>
  // make a copy ==> add a property to the copy
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure (because of console.log)
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    // .map(entry => entry.description.slice(-2))
    // .join(', ');
    // OR use reduce
    .reduce((str, cur) => `${str}, ${cur.description.slice(-2)}`, '')
    .slice(1); // skipping first ,

  console.log(bigExpenses);

  //   let output = '';
  //   for (const entry of budget)
  //     output +=
  //       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Emojis are 2 chars
  //   output = output.slice(0, -2); // Remove last '/ '
  //   console.log(output);
};

logBigExpenses(finalBudget, 1000);
