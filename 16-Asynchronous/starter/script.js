('use strict');
import { AUTH } from './config.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// Fix function to work with new API
const renderCountry = function (data, className = '') {
  const html = `
<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1_000_000
    ).toFixed(1)} Million</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>
`;

  countriesContainer.style.opacity = 1;
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

// version 2: escaping callback hell
// const getCountryDataAndNeighbour = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok)
//           // if it's false,
//           throw new Error(`Country not found. ${response.status}`);
//         // this msg propagates down and gets displayed by the catch block

//         return response.json();
//       }
//       // err => alert(err) // Handling (catching) rejected promises
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0]; // optional chaining

//       if (!neighbour) return;

//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(
//       // err => alert(err) // Handling (catching) rejected promises
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found. ${response.status}`);

//         return response.json();
//       }
//     )
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // catch also returns a promise
//       // Handling (catching) rejected promises IMP
//       console.error(`${err} 📌`);
//       renderError(`Something went wrong. 📌 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // Is always called regardless of promise result (either fulfillfed / rejected)
//       countriesContainer.style.opacity = 1;
//     });
// };

// instead of callback hell, we have a flat chain of promises IMP
// ALWAYS return a promise and handle it outside, don't do this:

/*
fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`).then()
*/

// returns a promise
const getJSON = function (url, errorMsg = 'Something went wrong.') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Error: ${errorMsg}${response.status}`);

    return response.json();
  });
};

// cleaner version 3 with helper function
const getCountryDataAndNeighbour = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbours = data[0].borders;
      if (!neighbours || neighbours.length === 0)
        throw new Error('No neighbours found!');

      // Fetch ALL neighbours in parallel
      return Promise.all(
        neighbours.map(code =>
          getJSON(
            `https://restcountries.com/v3.1/alpha/${code}`,
            'Country not found'
          )
        )
      );
    })
    .then(dataArr => {
      // Each neighbour response is an array of [ { countryObj } ]
      dataArr.forEach(neighbourData => {
        renderCountry(neighbourData[0], 'neighbour');
      });
    })
    .catch(err => {
      console.error(`${err} 📌`);
      renderError(`Something went wrong. 📌 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
// getCountryDataAndNeighbour('romania');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json${AUTH}`)
    .then(response => {
      if (response.status === 403)
        throw new Error(
          `Please wait another second before refreshing. ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.country}`
      );
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(err);
      console.log(
        `Please wait another second before refreshing. ${err.message}`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

// Event loop in practice IMP
// (microtasks queue)
// ==> result: test, test end, resolved promise 1, resolved promise 2, 0 sec timer
// ==> 0 seconds in the timer are not guaranteed (because of microtasks queue)

/*
console.log('Test'); // 1
setTimeout(() => {
  console.log('0 sec timer'); // 4
}, 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3

// promise is solved immediately, but the callback is queued in the microtasks queue
Promise.resolve('Resolved promise 2').then(res => {
  for (i = 0; i < 1000000000; i++) {} // blocking the main thread

  console.log(res);
});

console.log('Test end'); // 2
*/

// Building a Promise IMP
// promise(executor function(resolve, reject)) == just a special kind of object
/*
rndNum = Math.random();

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening.');
  setTimeout(function () {
    if (rndNum >= 0.5) {
      // marks promise as fulfilled (or RESOLVED)
      // w/e value we pass into this, ==> result of the promise from the then()
      resolve(`You Win. (${rndNum})`);
    } else {
      // marks promise as rejected
      // error message caught by the catch() handler
      // reject(new Error object (string to pass to .catch()))
      reject(new Error(`You lost. (${rndNum})`));
    }
  }, 2000);
});

// calling .then() on a promise object

// IMP
// if successful => 'You Win.'
// if failed => 'You lost.'
lotteryPromise
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

// Most of the time we only consume promises (with .then)
// only build promises to wrap old callback based functions into promises (PROMISIFYING) IMP

// function that returns a promise (like .fetch())
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // we only want to make our code wait, no need for resolved values
  });
};

wait(1)
  .then(() => {
    console.log('Waited for 1 sec.');
    return wait(2);
  })
  .then(() => {
    console.log('Waited for 2 sec');
    return wait(3);
  })
  .then(() => {
    console.log('Waited for 3 sec');
    return wait(4);
  })
  .then(() => {
    console.log('Waited for 4 sec');
  });

// static method on Promise constructor
// resolves immediately
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Error!')).catch(x => console.error(x));
*/

// Promisifying the Geolocation API IMP
// Async

/*
// promisifying a callback based API to a promise based API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // same thing:
    // resolve is the callback fn which gets called with the position
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

// modifying old challenge code to work without passing in lat, lng, only the geoloc API
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json${AUTH}`);
    })
    .then(response => {
      if (response.status === 403)
        throw new Error(
          `Please wait another second before refreshing. ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(err);
      console.log(
        `Please wait another second before refreshing. ${err.message}`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/*

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // we only want to make our code wait, no need for resolved values
  });
};

let currentImage;

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);

      // resolve to mark as successful
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found.'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  // empty then parameter because wait doesn't have any resolved value
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));
  */

// Async/Await (consuming promises)
// add 'async' before 'function' ==> asynchronous (keeps running in the background while perf code inside of it, returns a promise automatically IMP)
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    // doesn't need manual error handling (because of promisifying)
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json${AUTH}`
    );
    // need to throw errors manually because this only gets rejected if user doesn't have internet
    // if 403/404, promise does not reject
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Country data
    // await stops exec at this point of the func until the promise is fulfilled (doesn't block the exec of the whole code, because function is async IMP)
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    console.log(res);

    // SAME AS: (but async/await is cleaner)
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res);)

    const data = await res.json();
    // console.log(data[0]);
    renderCountry(data[0]);

    // fullfilled value of the promise IMP
    return `You are in ${dataGeo.city}. ${dataGeo.country}`;
  } catch (err) {
    console.err(err);
    renderError(`💥 ${err.message}`);

    // reject promise returned from async function
    throw err;
  }
};
*/
// console.log('1. Getting Location');
// const city = whereAmI(); // executes last because async
// console.log(city); // (doesn't work) returns a promise (async always returns a promise)

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.err(`2: ${err.message}`))
//   .finally(() => {
//     console.log('3. Finished getting location.'); // put in finally() to keep 1,2,3 order
//   }); // (works) returns the string (because 'city' from .then() is the returned value of the promise)

// Using try/catch for error handling with async/await IMP

// IIFE (immediately invoked function expression)

/*
   const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    // SAME AS: (but async/await is cleaner)
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res);)
*/

/*
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.err(err);
  }
  console.log('3. Finished getting location.');
})();
*/

// Running promises in parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // this works, but it runs in sequence (slower)
    // parallel would save loading time IMP
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // parallel:
    // returns a new promise that runs all promises at the same time
    // if one promise rejects ==> all reject (promise.all short circuits) IMP
    const data = await Promise.all(
      `https://restcountries.com/v3.1/name/${c1}`,
      `https://restcountries.com/v3.1/name/${c2}`,
      `https://restcountries.com/v3.1/name/${c3}`
    );

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'romania', 'canada');
