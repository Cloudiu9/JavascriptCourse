'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} Million</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
              </div>
          </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/

// 01. Simple AJAX calls IMP

// Old school XML Http Request
/*
const getCountryDataAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.response);
    // Render counry 1
    renderCountry(data);

    // Get neighobour country(2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();

    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );

    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryDataAndNeighbour('portugal');
*/

// const request = new XMLHttpRequest();

// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// );

// request.send();

// MODERN WAY OF AJAX CALLING(fetch API) IMP

// returns a "Promise" IMP
// object used as a placeholder for the future result of an asynchronous operation
// OR a container for a future value

// used to 'chain promises' ==> escaping callback hell IMP
// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );

// to consume fulfilled promise ==> .then() IMP
// to read data from response ==> .json() ==> returns a NEW PROMISE IMP ==> call another .then()

// we get a 'response' ==> turn it into 'json' ==> take the 'data' and render it into DOM
const getCountryDataAndNeighbour = function (country) {
  // Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(
      response => response.json()
      // err => alert(err) // Handling (catching) rejected promises
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; // optional chaining

      if (!neighbour) return;

      // Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(
      response => response.json()
      // err => alert(err) // Handling (catching) rejected promises
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // catch also returns a promise
      // Handling (catching) rejected promises IMP
      console.error(`${err} 📌`);
      renderError(`Something went wrong. 📌 ${err.message}. Try again!`);
    })
    .finally(() => {
      // Is always called regardless of promise result (either fulfillfed / rejected)
      countriesContainer.style.opacity = 1;
    });
};

// instead of callback hell, we have a flat chain of promises IMP
// ALWAYS return a promise and handle it outside, don't do this:

/*
fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`).then()
*/

btn.addEventListener('click', function () {
  getCountryDataAndNeighbour('romania');
});

// Handling rejected promises IMP (fetch only rejects when there is no internet connection)
// second argument of .then()
// BETTER WAY:
// .catch() at the end of the chain (returns a promise)

// finally: always works regardless of promise result

// when 404 happens, fetch promise still gets fulfilled
// getCountryDataAndNeighbour('sssdsdsdsds');
