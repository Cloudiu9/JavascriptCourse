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

let currentScore = 0;

// Switching player
const switchPlayer = function () {
  if (player0Elem.classList.contains('player--active')) {
    player0Elem.classList.remove('player--active');
    player1Elem.classList.add('player--active');
  } else {
    player1Elem.classList.remove('player--active');
    player0Elem.classList.add('player--active');
  }
};

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
    current0El.textContent = currentScore; // CHANGE LATER FIXME
  } else {
    // Switch to next player
    switchPlayer();
  }
});
