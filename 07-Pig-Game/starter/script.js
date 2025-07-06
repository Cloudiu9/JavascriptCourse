'use strict';

// BUG getElementById is 'faster', usually only use querySelector

// Selecting elements
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const diceElem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');

// Starting conditions
score0Elem.textContent = 0;
score1Elem.textContent = 0;
diceElem.classList.add('hidden');

const scores = [0, 0]; // total scores
let currentScore = 0;
let activePlayer = 0;

// Switching player; works, but easier way
// const switchPlayer = function () {
//   if (player0Elem.classList.contains('player--active')) {
//     player0Elem.classList.remove('player--active');
//     player1Elem.classList.add('player--active');
//   } else {
//     player1Elem.classList.remove('player--active');
//     player0Elem.classList.add('player--active');
//   }
// };

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating random dice roll
  // FIXME we define the roll here because we want a new roll every time
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceElem.classList.remove('hidden');
  // FIXME FIXME FIXME FIXME
  diceElem.src = `dice-${dice}.png`;

  // 3. Check for 1 roll; if true, next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    // reset first player's current score b4 swap
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    // if active player is 0, switch to 1; else 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    // toggling both ensures that it's only everp present on 1 at a time
    player0Elem.classList.toggle('player--active');
    player1Elem.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', () => {
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is >= 100
  // Finish game

  // Switch to the next player
});
