/*
////////////////////////////////////
// Linking a JavaScript File
let js = "amazing";
console.log(40 + 8 + 23 - 10);

////////////////////////////////////
// Values and Variables
console.log("Jonas");
console.log(23);

let firstName = "Matilda";

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";

console.log(myFirstJob);

////////////////////////////////////
// Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);

////////////////////////////////////
// let, const and var
// const should be default way of declarations
*/

/*
let age = 30;
age = 31;

const birthYear = 2002;
// birthYear = 2001

var job = 'programmer'
job = 'teacher'

// let block scoped, var function scoped

// bad practice, property is created on global object
lastName = 'Boredea'
*/

//const year = 2024
//console.log(now - 1991 > now - 2018)

// CHALLENGE #1

/* 
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall
*/
/*
const weightMark = 78
const heightMark = 1.69
const weightJohn = 92
const heightJohn = 1.95

const markBMI = weightMark / heightMark ** 2
const johnBMI = weightJohn / heightJohn ** 2

let markHigherBMI

if (markBMI > johnBMI)
{
    markHigherBMI = markBMI
    console.log(markHigherBMI)
}
*/

/*
// STRINGS / TEMPLATE LITERALS (above tab, console button)
const firstName = "Claudiu"
const job = 'Student'
const birthYear = 2002
const year = 2024

// year - birthYear doesn't work, parantheses are needed
console.log("I'm " + firstName + ", a " + (year - birthYear) + " year old " + job)

console.log(`I'm ${firstName}, a ${year - birthYear} year old ${job}`)

console.log('String with \n\
multiple \n\
lines   ')

console.log(`String
with
multiple
lines`)
*/


/*
// IF / ELSE
const age = 7;
const isOldEnough = age >= 18;

if (isOldEnough) {
    console.log(`You can get a driver's license!`)
}
// else if (!isOldEnough){
//     console.log(`You cannot get a driver's license`)
// }
else {
    const yearsLeft = 18 - age
    console.log(`Years until you can get a license: ${yearsLeft}`)
}
*/

// CHALLENGE #2

/* 
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

const weightMark = 78
const heightMark = 1.69
const weightJohn = 92
const heightJohn = 1.95

let markBMI = weightMark / heightMark ** 2
let johnBMI = weightJohn / heightJohn ** 2

markBMI = Math.round(markBMI * 10) / 10
johnBMI = Math.round(johnBMI * 10) / 10

let markHigherBMI

if (markBMI > johnBMI)
    {
        markHigherBMI = markBMI
        console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`)
    }
else {
    markHigherBMI = johnBMI
    console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI})`)
}
*/

/*
// TYPE CONVERSION AND COERCION

// conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
// inputYear original variable is still a string
console.log(Number(inputYear) + 18);

// NaN - not a number (invalid number)
console.log(Number('Jonas'), typeof NaN) 

console.log(String(23))

// type coercion

// automatically convers numbers to strings whenever a 
// string is present in the + operation
console.log('I am ' + 23 + ' years old')

// we don't have to do this
console.log('I am ' + String(23) + ' years old')

// - operator triggers the inverse,
// converts strings to numbers
console.log('23' - '10' - 3)
console.log('23' + '10' + 3)

console.log('23' * 2, 26 / 4, 2 ** 2)

let n = '1' + 1 // '11'
n = n - 1 // 11 - 1
console.log(n); // 10
*/

// TRUTHY / FALSY VALUES
/*
// 5 falsy: 0, '', undefined, null, NaN

console.log(Boolean(0)); //false
console.log(Boolean(undefined)); // f
console.log(Boolean(''));// f
console.log(Boolean(null)); // f
console.log(Boolean(NaN)); // f
console.log(Boolean("")); // f
console.log(Boolean(" ")); // true
console.log(Boolean({})); // t

// this conversion is always a coercion, not done manually

const money = 0;
if (money) {
    console.log(`Money`)
} else {
    console.log(`No money`)
}

let height;
if (height) {
    console.log('height');
} else {
    console.log('height is undefined')
}
*/

// EQUALITY OPERATORS == VS ===
/*
// === strict equality operator, does not perform type coercion
// they have to be exactly the same, always use this 
// to avoid bugs

// == loose equality operator, does type coercion

const age = 18;
if (age === 18) console.log('Adult')
if (18 == '18') console.log('A')

const favorite = Number(prompt("What's your favorite number?"));

console.log(favorite) // string, now a number (Number())

if (favorite === 23) console.log('23 is a num')
    else if (favorite === 7) console.log('7 is a num')
        else console.log(`Number is not 23 or 7`)

if (favorite !== 23) console.log('Not 23')
*/

// BOOLEAN LOGIC: AND, OR, NOT
/*
// AND = BOTH TRUE &&
// OR = AT LEAST ONE IS TRUE ||
// NOT = INVERTS !

const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision)
console.log(hasDriversLicense || hasGoodVision)
console.log(!hasDriversLicense || hasGoodVision)

//const shouldDrive = hasDriversLicense && hasGoodVision

if (hasDriversLicense && hasGoodVision) {
    console.log('Sarah can drive')
} else {
    console.log("Don't drive")
}

const isDrunk = true // C

console.log(hasDriversLicense || hasGoodVision || isDrunk)

if (hasDriversLicense && hasGoodVision && !isDrunk)
{
    console.log('Drive')
}
*/

/*
Coding Challenge #3
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

/*
const dolphinScore = (97 + 112 + 81) / 3
const koalaScore = (109 + 95 + 86) / 3

if (dolphinScore > koalaScore && dolphinScore >= 100)
{
    console.log(`Dolphins win: ${dolphinScore}`)
} else if (dolphinScore === koalaScore && dolphinScore >= 100)
{
    console.log("Draw \n" + 'Dolphins: ' + dolphinScore + '\n' + 'Koalas:' + koalaScore )
} else if (dolphinScore === koalaScore && dolphinScore < 100)
{
    console.log('No one wins.')
} else if (dolphinScore < koalaScore && koalaScore >= 100)
{
    console.log(`Koalas win: ${koalaScore}`)
} else {
    console.log('oops')
}
*/

// SWITCH STATEMENT

/*
let day ='thursday';
day = day.toLocaleLowerCase()

switch(day) // strict comparison
{
    case 'monday': // day === 'monday'
        console.log(`It is ${day}`);
        console.log(`Garfield`);
        break;
    case 'tuesday':
        console.log(`It is ${day}`)
        break;
    case 'wednesday':
    case 'thursday': 
        console.log('It is wednesday || thursday')
        break;
    default:
        console.log('a')
}

if (day === 'monday'){
    console.log('monday')
} else if (day === 'tuesday'){
    console.log('tues')
} else if (day === 'wednesday' || day === 'thursday'){
    console.log('It is wed or thur')
} else {
    console.log('a')
}
*/

// STATEMENTS VS EXPRESSIONS
/*
// expressions: (words that make up the sentences), produces a value
// 3 + 4
// 1991
// true && false && !true

// statements/declarations: (complete sentences), doesn't produce a value
// ends with a semicolon ==> statement, not expression
// '23 is bigger' is an expression, but the whole if block is a declar.
if (23 > 10){
    const str = '23 is bigger';
} 

// here, in ${}, JS expects an expression, not a declaration
console.log(`I'm ${2024 - 2002} years old ${if (23 > 10){
    const str = '23 is bigger';
} }`)
*/

// TERNARY OPERATOR
// NEW
/*
const age = 23;
age >= 18 ? console.log(`>= 18`) : console.log('< 18')

// more common usage
const drink = age >= 18 ? '>=18' : '<18';
console.log(drink)

// useful for quick, easy decisions

// same as this, but easier, don't have to 
// declare drink2 outside
let drink2;
if(age >= 18){
    drink2 = '>=18'
} else {
    drink2 = '<18'
}

// can use it in template literals
// because it's an expression

console.log(`I like to drink ${age >= 18 ? 'wine' : 'water'}`)
*/

/* 
Coding Challenge #4
Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.
Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
this. It's not allowed to use an if/else statement � (If it's easier for you, you can
start with an if/else statement, and then try to convert it to a ternary
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430
Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2
§ Value X is between 50 and 300, if it's >= 50 && <= 300 �
*/

const bill = 430;
const tip = bill >= 50 && bill <=300 ? bill * 0.15 : bill * 0.2

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value was ${bill + tip}`)