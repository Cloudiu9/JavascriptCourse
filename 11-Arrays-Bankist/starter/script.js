'use strict';

/////////////////////////////////////////////////

/////////////////////////////////////////////////

// BANKIST APP

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',

  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],

  interestRate: 1.2, // %

  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',

  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],

  interestRate: 1.5,

  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',

  movements: [200, -200, 340, -300, -20, 50, 400, -460],

  interestRate: 0.7,

  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',

  movements: [430, 1000, 700, 50, 90],

  interestRate: 1,

  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements

const labelWelcome = document.querySelector('.welcome');

const labelDate = document.querySelector('.date');

const labelBalance = document.querySelector('.balance__value');

const labelSumIn = document.querySelector('.summary__value--in');

const labelSumOut = document.querySelector('.summary__value--out');

const labelSumInterest = document.querySelector('.summary__value--interest');

const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');

const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const btnTransfer = document.querySelector('.form__btn--transfer');

const btnLoan = document.querySelector('.form__btn--loan');

const btnClose = document.querySelector('.form__btn--close');

const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');

const inputLoginPin = document.querySelector('.login__input--pin');

const inputTransferTo = document.querySelector('.form__input--to');

const inputTransferAmount = document.querySelector('.form__input--amount');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');

const inputCloseUsername = document.querySelector('.form__input--user');

const inputClosePin = document.querySelector('.form__input--pin');

// FIXME BUG INSTEAD OF WORKING WITH GLOBAL VARIABLES, PASS NEEDED DATA INTO THE FUNCTION

// FIXME insertAdjacentHTML: 2 strings (position where we want to attach html: usually 'afterbegin' or 'beforeend' (we use afterbegin here to keep order, beforeend => reversed order), string containing html to insert)

// BUG innerHTML is similar to .textContent, but textContent simply returns the text itself

// while innerHTML returns all the html (tags, etc)

// .textContent = 0 (from pig game)

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // emptying the container before inserting new content

  // using slice() to create a copy of the movements

  // (so that sort() doesn't mutate the original)

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    let type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `<div class="movements__row">

          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

          <div class="movements__value">${mov}€</div>

        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// we do not pass in the 'accounts' global variable; we just pass in a new 'accs'

const createUsernames = function (accs) {
  // we want to mutate the original array ==> we need to use the side effects of

  // forEach (we want to do some work without returning anything)

  accs.forEach(acc => {
    acc.username = acc.owner

      .toLowerCase()

      .split(' ')

      .map(
        name => name[0] // same as name.slice(0, 1)
      )

      .join('');
  });
};

createUsernames(accounts);

// console.log(accounts);

// display total balance (reduce)

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

// method chaining: displaying summary

const calcDisplaySummary = function (account) {
  // incoming money

  const incomes = account.movements

    .filter(mov => mov > 0)

    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  // outgoing money

  const out = account.movements

    .filter(mov => mov < 0)

    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  // interest

  // only apply interest if interest is > 1

  const interest = account.movements

    .filter(mov => mov > 0)

    .map(deposit => (deposit * account.interestRate) / 100)

    .filter((inter, _, arr) => {
      // console.log(arr); // one value is 0.84 ==> doesnt get added

      return inter > 1;
    })

    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // Display balance

  calcDisplayBalance(acc);

  // Display summary

  calcDisplaySummary(acc);

  // Display movements

  displayMovements(acc.movements);
};

/*



textContent vs value BUG BUG BUG







value is for form elements to get the value of the form element. (input)



textContent is for other elements to get the content of the element







The textContent property of the Node interface represents the text content of the node and its descendants.







But only input elements have a "value". It represent the input data supplied by the user or provided initially by the code. 



Also, input elements may have a "textContent" property but it will always be empty since they are void elements.



*/

// Event handlers for logging in

let currentAccount;

// btnLogin is a button of a form, so it refreshes the page when clicking it (we need to stop that)

// hitting enter in a form field automatically triggers an event listener (same as clicking submit (login) button)

btnLogin.addEventListener('click', function (e) {
  // stops form from submitting and referesing page

  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // NOTES: BUG FIXME

  // ?. ==> optional chaining ==> pin property is only read if it exists

  // querySelector().style.property to change css property

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message

    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = 100;

    // Reset form fields

    inputLoginUsername.value = '';

    inputLoginPin.value = '';

    inputLoginPin.blur(); // field loses focus

    updateUI(currentAccount);
  }
});

// Transfer money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // stops page refresh (because it is a button from a form)

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value // looking for the account that has the inputTransferTo username inputted
  );

  // VIDEO VERSION:

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount?.username !== receiverAcc.username
  ) {
    // Doing the transfer

    currentAccount.movements.push(-amount);

    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// some() FIXME WHEN WE SEE ANY, THINK OF some()

// Request loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // only grants a loan if a deposit exists >= 10% of loan amount

  if (
    amount > 0 &&
    currentAccount.movements.some(mov => Math.abs(mov) >= (10 / 100) * amount)
  ) {
    // Deposit loan as movement

    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// Delete account (findIndex()) FIXME ==> returns first index for which the condition is true         indexOf(33) also returns an index, but is a lot simpler (findIndex can take complex conditions)

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    Number(inputClosePin?.value) === currentAccount.pin &&
    inputCloseUsername?.value === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account

    accounts.splice(index, 1); // splice(index, number of elements to remove) BUG

    // Hide UI

    containerApp.style.opacity = 0;
  }

  // Reset form fields

  inputCloseUsername.value = '';

  inputClosePin.value = '';

  inputClosePin.blur(); // field loses focus
});

let sortFlag = false;

// Sorting movements

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sortFlag);

  sortFlag = !sortFlag;
});

/////////////////////////////////////////////////

/////////////////////////////////////////////////

// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const currencies = new Map([

//   ['USD', 'United States dollar'],

//   ['EUR', 'Euro'],

//   ['GBP', 'Pound sterling'],

// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// arrays are objects, they get access to special methods

/*







let arr = ['a', 'b', 'c', 'd', 'e'];















// SLICE() FIXME















// slice() extract a part (a slice) of an array, without modifying it







// (does not mutate the arr []), returns a new array







// slice(2), start at 'c' all the way to the end







console.log(arr.slice(2)); // ["c", "d", "e"]















// slice(2, 4) ==> 2 and 3, 4 is not included (length is 4-2 = 2 ==> returns 2 elems)







console.log(arr.slice(2, 4)); // ["c", "d"]















// slice(-2) ==> takes the last two elems of the array







console.log(arr.slice(-2));















console.log(arr.slice(1, -1)); // ["b", "c", "d"] ==> first and all but last















// creating a shallow copy: (personal preference on slice() vs ...)







// same result : ["a", "b", "c", "d", "e"]







console.log(arr.slice());







console.log([...arr]);















// SPLICE BUG















// works the same as slice, BUT modifies the original array







console.log(arr.splice(2)); // ["c", "d", "e"]







console.log(arr); // ["a", "b"]















// usually used to delete elements from array







*/

// AT METHOD BUG

/*







// useful to get last elem of array OR for method chaining BUG FIXME







const arr = [23, 11, 64];







console.log(arr[0]);







// same thing as







console.log(arr.at(0)); // array at position zero















// get last element







console.log(arr[arr.length - 1]); // -1 because array starts at 0







console.log(arr.slice(-1)[0]); // [0], because slice returns an array







console.log(arr.at(-1));















*/

// FOREACH LOOP BUG FIXME

// actually a higher order function that requires a callback func

// CONTINUE AND BREAK DO NOT WORK IN A forEach LOOP BUG BUG BUG

/*















const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];















// old way (for of loop), still valid, but forEach is easier















// [index, curr elem]







// for (const movement of movement) {







for (const [i, movement] of movements.entries()) {







  // access counter variable FIXME







  if (movement > 0) {







    console.log(`Movement: ${i + 1} You deposited ${movement}`);







  } else {







    console.log(`Movement: ${i + 1} You withdrew ${Math.abs(movement)}`);







  }







}







console.log(`------ FOREACH ------`);















// in each iteration, each time the callback is called, it will receive the curr elem of the array as an arg (movement) BUG BUG















// movements.forEach(function (movement) {















// function(1st param: current element, 2nd param: current index, 3rd param: entire array) FIXME















movements.forEach(function (mov, i, arr) {







  if (mov > 0) {







    console.log(`Movement: ${i + 1}  You deposited ${mov}`);







  } else {







    console.log(`Movement: ${i + 1}  You withdrew ${Math.abs(mov)}`);







  }







  console.log(`All transactions: ${arr.join(', ')}`);







});







// iterations:







// 0: function(200)







// 1: function(450)







// 2: function(400)







/*







array.forEach(element => {







  







});







*/

///////////////////////////////////////

// Coding Challenge #1

/* 







Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.















Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:















1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)







2. Create an array with both Julia's (corrected) and Kate's data







3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")







4. Run the function for both test datasets















HINT: Use tools from all lectures in this section so far 😉















TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]







TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]















GOOD LUCK 😀







*/

/*







const dogsJulia = [3, 5, 2, 12, 7];







const dogsKate = [4, 1, 15, 8, 3];







const dogsJulia1 = [9, 16, 6, 8, 3];







const dogsKate1 = [10, 5, 6, 1, 4];















const checkDogs = function (dogsJulia, dogsKate) {







  let realJulia = dogsJulia.slice(1, -2); // shallow copy, remove 1st and last 2 elems







  const dogsAll = [...realJulia, ...dogsKate];







  dogsAll.forEach(function (dog, i) {







    dog >= 3







      ? console.log(`Dog number ${i + 1} is an adult and is ${dog} years old`)







      : console.log(







          `Dog number ${i + 1} is still a puppy 🐶 (${dog} year(s) old)`







        );







  });







};















checkDogs(dogsJulia, dogsKate);















console.log(`====================`);















checkDogs(dogsJulia1, dogsKate1);







*/

/*







Challenge 1: Temperature Forecast







Create a function analyzeForecast that takes two arrays, tempsWeek1 and tempsWeek2, which represent daily temperatures for two weeks. Perform the following tasks:















Merge the Arrays: Combine both arrays into a single array of temperatures.







Identify Extremes: Log the highest and lowest temperatures for the two weeks.







Convert to Fahrenheit: Create a new array with all temperatures converted to Fahrenheit (formula: (temp * 9/5) + 32).







Check Freezing Days: Log a message for each day when the temperature was below freezing (0°C).







*/

/*







const tempsWeek1 = [15, -2, 8, 10, 22, 5, 18];







const tempsWeek2 = [9, -5, 13, 6, -7, 20, 11];















const analyzeForecast = function (tempsWeek1, tempsWeek2) {







  const temps = tempsWeek1.concat(tempsWeek2);















  let highestTemp = -9999999999;







  let lowestTemp = 9999999999;















  temps.forEach(function (temp) {







    temp > highestTemp ? (highestTemp = temp) : '';







    temp < lowestTemp ? (lowestTemp = temp) : '';







    temp < 0 ? console.log(`It is freezing! (${temp}C)`) : '';







  });







  console.log(`Highest: ${highestTemp}\n Lowest: ${lowestTemp}`);















  const tempsFahrenheit = [];















  //   const tempsFahrenheit = temps.map(temp => (temp * 9) / 5 + 32);















  temps.forEach(function (temp) {
    tempsFahrenheit.push((temp * 9) / 5 + 32);

  });

  console.log(`Temperatures in C: ${temps.join('C, ')}C`);







  console.log(`Temperatures in Fahrenheit: ${tempsFahrenheit.join('F, ')}F`);







};















analyzeForecast(tempsWeek1, tempsWeek2);







*/

// REALLY IMPORTANT ARRAY TRANSFORMATION TOOLS: BUG BUG BUG FIXME FIXME FIXME

// MAP

// IS SIMILAR TO FOREACH, BUT CREATES A NEW ARRAY BASED ON THE ARRAY,

// APPLIES A CALLBACK FUNC TO EACH ELEM, (it MAPS values from the og array to a new arr)

// USUALLY MORE USEFUL THAN FOREACH FIXME

// FILTER

// USED TO FILTER FOR ELEMENTS IN THE OG ARRAY (ex: > 2)

// ELEMENTS FOR WHICH THE CONDITION IS TRUE WILL BE INCLUDED IN A NEW ARRAY BUG BUG BUG

// REDUCE (like a snowball that gets bigger and bigger as it rolls down a hill)

// REDUCES ALL ARRAY ELEMENTS TO A SINGLE VALUE

// USES AN "ACCUMULATOR" VARIABLE, AS IT LOOPS OVER THE ARRAY, IT KEEPS ADDING THE

// CURRENT ELEM ONTO THE ACCUMULATOR UNTIL WE HAVE TOTAL SUM OF ALL ELEMS (just an ex)

/*















// map()







// does NOT CREATE 'SIDE EFFECTS' (like forEach does), it just adds items to a new arr







// forEach: in each iter, we performed some action that was then visible in the







// console ==> side effect















const euroToUsd = 1.1;







const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];















// map(callback function(elem, index, whole array){







//







// }) BUG















// functional programming (more modern) BUG















// const movementsUSD = movements.map(function (mov) {







//   return mov * euroToUsd; // multiplies every elem by 1.1







//   // return 23 // ==> makes an array of the same size as movements with 23 in all pos







// });















// using arrow function















const movementsUSD = movements.map(mov => mov * euroToUsd); // return mov * euroToUsd















console.log(movements, movementsUSD); // og is not mutated















// same thing as:







// but this way requires us to MANUALLY create a new array, while map automatically







// solves that problem and it uses a callback function















const movementsUSDFor = [];







for (const mov of movements) {







  movementsUSDFor.push(mov * euroToUsd);







}















const movementsDescriptions = movements.map(







  (mov, i, arr) =>







    `Movement: ${i + 1}  You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(







      mov







    )}`















  // if (mov > 0) {







  //   return `Movement: ${i + 1}  You deposited ${mov}`;







  // } else {







  //   return `Movement: ${i + 1}  You withdrew ${Math.abs(mov)}`;







  // }







);















console.log(movementsDescriptions);















// map method calls this func for each elem in the movement array FIXME







// each time callback occurs, it passes curr elem (mov) and index (i)















*/

/*







// filter() BUG







// similar syntax to forEach and map, uses a callback function(elem, index, arr)







// useful for more modern, functional programming and chaining methods FIXME







const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];







// filter out negative values







// only the elements for which the return condition is true will make it into the new BUG







// deposits array







const deposits = movements.filter(function (mov) {



  return mov > 0;



});







console.log(movements);







console.log(deposits);







// same thing as:







const deposits1 = [];







for (const mov of movements) mov > 0 ? deposits.push(mov) : '';







const withdrawals = movements.filter(mov => mov < 0);







*/

/* 







Challenge 1: Convert Product Prices (map)







You have a list of product prices in USD. Write a function convertPrices that:















Takes an array of prices in USD.







Returns a new array where each price is converted to EUR (use a conversion rate of 0.85).















Example Input:







const pricesUSD = [100, 250, 40, 60, 150];







*/

/*



const pricesUSD = [100, 250, 40, 60, 150];







const convertPrices = function (prices) {



  return prices.map(price => price * 0.85);



};







console.log(convertPrices(pricesUSD));



*/

/* 







Challenge 2: Filter Affordable Products (filter)







You have a list of product prices in EUR. Write a function affordablePrices that:















Takes an array of prices.







Returns a new array containing only prices that are less than 50 EUR.







Example Input:















const pricesEUR = [85, 30, 40, 100, 15, 60, 25];







*/

/*



const pricesEUR = [85, 30, 40, 100, 15, 60, 25];







const affordablePrices = function (prices) {



  return prices.filter(price => price < 50);



};







console.log(affordablePrices(pricesEUR));



*/

/*



// reduce() BUG



// REDUCES an array to a single value



// also uses a callback (accumulator, current elem, position, arr), initial value of acc



// accumulator => SNOWBALL FIXME







const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];







// keeps adding the curr elem to an accumulator every loop







// const balance = movements.reduce(function (acc, cur, i, arr) {



//   console.log(`Iteration #${i}: ${acc}`);



//   return acc + cur;



// }, 0); // 0 => initial value of acc



// console.log(balance); // 3840







const balance = movements.reduce((acc, cur) => acc + cur, 0); // 0 => initial value of acc



console.log(balance); // 3840







// same thing as:







let balance2 = 0;



for (const mov of movements) balance2 += mov;



console.log(balance2); // 3840







// Maximum value







const max = movements.reduce((acc, mov) => {



  if (acc > mov) return acc;



  else return mov;



}, movements[0]);



console.log(max);



*/

///////////////////////////////////////

// Coding Challenge #2

/* 



Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.







Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:







1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.



2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)



3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)



4. Run the function for both test datasets







TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]



TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]







GOOD LUCK 😀



*/

// const movementsUSD = movements.map(mov => mov * euroToUsd); // return mov * euroToUsd

/*



const calcAverageHumanAge = function (ages) {



  const humanAges = ages.map(dogAge =>



    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4



  );



  console.log(`Dog years in human age: ${humanAges.join(', ')}`);







  const humanAgesFiltered = humanAges.filter(age => age >= 18);



  console.log(`Adult dogs in human years: ${humanAgesFiltered.join(', ')}`);







  // my version:



  // const humanAgesAverage = humanAgesFiltered.reduce((sum, age, i, arr) => {



  //   if (i < arr.length - 1) {



  //     console.log(`sum is: ${sum}`);



  //     return (sum += age);



  //   } else {



  //     return (sum + age) / arr.length;



  //   }



  // });







  // video version:



  const humanAgesAverage =



    humanAgesFiltered.reduce((sum, age) => sum + age, 0) /



    humanAgesFiltered.length;







  // OR just divide age by arr length



  // humanAgesFiltered.reduce((sum, age, i, arr) => sum + age / arr.length, 0)



  return humanAgesAverage;



};







console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));



console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



*/

/*



Coding Challenge: Analyze Product Popularity



A local shop tracks the monthly sales volume for a list of products. They want to understand which products are popular and calculate the average sales for these popular products.







Create a function calcAveragePopularSales that:







Takes an array of monthly sales data (number of sales for each product).



Multiplies each sales figure by 1.2 (to account for predicted growth) using map().



Filters out any products with fewer than 50 monthly sales after growth (these are considered unpopular).



Calculates the average sales for the remaining popular products.







Test Data:



*/

/*



const salesData1 = [25, 120, 45, 85, 60, 30];



const salesData2 = [10, 150, 55, 20, 90, 65, 40];







// Expected Output: For salesData1, you should get an average sales figure for products that meet the popularity threshold after predicted growth.







const calcAveragePopularSales = function (sales) {



  const monthlySales = sales.map(product => product * 1.2);



  console.log(monthlySales);







  const unpopularMonthlySales = monthlySales.filter(product => product > 50);



  console.log(unpopularMonthlySales);







  const averageProduct = unpopularMonthlySales.reduce(



    (sum, curr, i, arr) => sum + curr / arr.length,



    0



  );







  return averageProduct;



};







console.log(calcAveragePopularSales(salesData1));



*/

// CHAINING METHODS BUG BUG BUG

/*







// TIPS: BUG FIXME



// 1. Avoid unnecessary chaining (slows performance), sometimes 2 map() can be replaced by 1



// 2. Bad practice to chain methods that mutate the OG array (splice, reverse method)







const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



const euroToUsd = 1.1;







// PIPELINE FIXME



// filter only positive movements (deposits)



// convert to USD



// add everything up



// BUG can add cl to debug after each







const totalDepositsUSD = movements



  .filter(mov => mov > 0)



  // .map(mov => mov * euroToUsd)



  .map((mov, i, arr) => {



    // console.log(arr); // is logged 3 times because the callback fn is called 3 times



    // (one for each value of the movements array)



    return mov * euroToUsd;



  })



  .reduce((sum, mov) => sum + mov, 0);







console.log(totalDepositsUSD);



*/

/*



    BUG Coding Challenge #3



Rewrite calcAverageHumanAge as arrow function with chaining







const calcAverageHumanAge = function (ages) {



  const humanAges = ages.map(dogAge =>



    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4



  );



  console.log(`Dog years in human age: ${humanAges.join(', ')}`);







  const humanAgesFiltered = humanAges.filter(age => age >= 18);



  console.log(`Adult dogs in human years: ${humanAgesFiltered.join(', ')}`);







  // video version:



  const humanAgesAverage =



    humanAgesFiltered.reduce((sum, age) => sum + age, 0) /



    humanAgesFiltered.length;







  // OR just divide age by arr length



  // humanAgesFiltered.reduce((sum, age, i, arr) => sum + age / arr.length, 0)



  return humanAgesAverage;



};







const calcAverageHumanAge = ages =>



  ages



    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))



    .filter(age => age >= 18)



    .reduce((sum, age, i, arr) => sum + age / arr.length, 0);







console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));



console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



*/

/*



// find() METHOD BUG BUG BUG



// retrieve an element from array based on a condition, loops over array, applies callback function



// similar syntax to filter(), BUT BUG BUG unlike filter(), find() FINDS the first element that satisfies this condition (instead of returning an array, like filter())







const firstWithdrawal = movements.find(mov => mov < 0);



console.log(firstWithdrawal);







console.log(accounts);







// search array to find object that matches property



// we use ===, because find() usually finds unique stuff







const account = accounts.find(acc => acc.owner === 'Jessica Davis');



console.log(account); // returns the object with jessica davis' account







// same thing as:







for (const acc of accounts) {



  if (acc.owner === `Jessica Davis`) console.log(acc);



}



*/

// findIndex() BUG

/*

// returns the index of the found element



// some() and every() FIXME



// some() is MORE LIKE any(), ==> true if ANY value for which the condition is true



// checks if there are ANY values / if ALL values match a certain condition



// returns true / false



console.log(movements);



// EQUALITY



console.log(movements.includes(-130)); // returns true if any value is === to the specified value (-130)



// What if we wanted to test for a condition? ==> we use some() and every()



// SOME: CONDITION



console.log(movements.some(mov => mov === -130));



const anyDeposits = movements.some(mov => mov > 2500); // only 1 > 2500 ==> true



console.log(anyDeposits);



// EVERY



// needs EVERY elements to satisfy the condition to return true BUG



console.log(account4.movements.every(mov => mov > 0));



// Separate callback function BUGBUG



const deposit = mov => mov > 0; // Useful for DRY



console.log(account1.movements.every(deposit)); // false



console.log(account4.movements.every(deposit)); // true

*/

/*

// flat() and flatMap() BUG FIXME

// introduced in ES2019

// flat() flattens a multi-layered array, returning all values in

// a single array, only goes 1 level deep



// flatMap() just does map().flat(), combining both methods

// ONLY GOES 1 LEVEL DEEP BUG



const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]



const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeep.flat()); // still contains two inner arrays

console.log(arrDeep.flat(2)); // depth argument



// const accountMovements = accounts.map(acc => acc.movements);

// console.log(accountMovements); // array of arrays of all movements



// const allMovements = accountMovements.flat();

// console.log(allMovements); // length 29, all movements



// const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);



// flat() FIXME

const overallBalance = accounts

  .map(acc => acc.movements)

  .flat()

  .reduce((acc, mov) => acc + mov);



console.log(overallBalance); // adding up all movements



// flatMap() BUG



const overallBalance2 = accounts

  .flatMapmap(acc => acc.movements) //

  .reduce((acc, mov) => acc + mov);

*/

/*

// SORTING BUG FIXME

// .sort() MUTATES THE ARRAY

// .sort() SORTS STRINGS!!! BUG BUG BUG (or converts nums to strings)

// meaning that [-130, 70, 200, 1300] ==> [-130, 1300, 200, 70]

// to sort numbers ==> pass in a compare callback function

// 2 args: sort(curr val, next val)

// can't sort mixed array (nums and strings)



// Strings

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

console.log(owners.sort()); // Adam, Jonas, Martha, Zah

console.log(owners); // Adam, Jonas, Martha, Zah



// Numbers

console.log(movements.sort()); // wrong, sorts as if they were strings



// return < 0 => a, b (keep order)

// return > 0 => b, a (switch order)



// Ascending

// movements.sort((a, b) => {

//   if (a > b) return 1;

//   if (a < b) return -1;

// });



// simplified:



movements.sort((a, b) => a - b);



// Descending

// movements.sort((a, b) => {

//   if (a > b) return -1;

//   if (a < b) return 1;

// });



// simplified:



movements.sort((a, b) => b - a);



console.log(movements); // sorted correctly

*/

// CREATING AND FILLING ARRAYS FIXME BUG
/*
const arr = [1, 2, 3, 4, 5];

console.log(new Array(1, 2, 3, 4, 5));

// Empty array + fill()

const x = new Array(7); // empty array of length 7

console.log(x);

// x.map(() => 5); // nothing happens

// only thing we can do to this empty array is call fill(value to fill arr with, begin parameter, end parameter(not included)) BUG MUTATES ARRAY

x.fill(1, 3, 5);

console.log(x); // 0, 0, 0, 1, 1, 0, 0

arr.fill(23, 2, 4);

console.log(arr); // 1, 2, 23, 23, 5

// Array.from FIXME BUG "BETTER AND CLEANER THAN fill()^^^"

// from(length, map callback fn)

// we can use this to create arrays FROM other things

const y = Array.from({ length: 7 }, () => 1); // puts a 1 in each of the array positions

console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z); // 1,2,3,4,5,6,7

const ranDice = Array.from(
  { length: 100 },

  () => Math.floor(Math.random() * 6) + 1
);

console.log(ranDice);

// strings, maps, sets, result of querySelectorAll (nodeList) are all ITERABLES ==> they can be converted to real arrays FIXME

// nodeList is like an array, but doesn't have methods like map() or reduce() ==> we need to convert to real array first using from() BUG BUG BUG

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

console.log(movementsUI);

// getting the movements from an account (from the UI) FIXME BUG

labelBalance.addEventListener('click', function () {
  // - used Array.from() to create an array from the NodeList returned by querySelectorAll

  // - included mapping function that transforms the array

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),

    el => Number(el.textContent.slice(0, -1))
  );

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // also works, but then we have to do mapping separately ==> Array.from() is better BUG BUG

  console.log(movementsUI);
});
*/

///////////////////////////////////////
// Array Methods Practice
/*
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogSarah = dogs.forEach(dog => {
  if (dog.owners.includes('Sarah'))
    dog.curFood > dog.recommendedFood
      ? console.log(`Sarah's dog has too much food!`)
      : console.log(`Sarah's dog isn't eating enough.`);
});

// vidoe:
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
//   }`
// );

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

// i flatMapped here, because I didn't do it in the other exercise

// const ownersEatTooMuchMap = ownersEatTooMuch.flatMap(
//   (cur, i, arr) => cur.owners
// );
// const ownersMuchCheese = ownersEatTooMuchMap.join(' and ');

// const ownersEatTooLittleMap = ownersEatTooLittle.flatMap(
//   (cur, i, arr) => cur.owners
// );
// const ownersLittleCheese = ownersEatTooLittleMap.join(' and ');

// console.log(`${ownersMuchCheese}'s dogs eat too much!`);
// console.log(`${ownersLittleCheese}'s dogs eat too little!`);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(
  dogs
    .map(dog => dog.curFood)
    .join(' ')
    .includes(dogs.recommendedFood)
);

// video:
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

dogs.forEach(dog => {
  console.log(
    dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  );
});

// video:
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// const dogsOk = dogs.map(dog =>
//   dog.curFood > dog.recommendedFood * 0.9 &&
//   dog.curFood < dog.recommendedFood * 1.1
//     ? dog
//     : 'no'
// );

// const dogsOkArr = [dogsOk.includes('no') ? dogsOk.pop() : dogsOk];

// console.log(...dogsOkArr);

const dogsOkArr = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log(dogsOkArr);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
// const dogsArr = dogsSorted.map(dog => dog.recommendedFood);
// console.log(dogsSorted.map(dog => dog.recommendedFood).sort((a, b) => a - b));

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

// const dogsSorted = dogs.slice('');

// sorting just the recfood array
// console.log(dogsSorted.map(dog => dog.recommendedFood).sort((a, b) => a - b));

// video: BUG BUG FIXME
const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsCopy);
