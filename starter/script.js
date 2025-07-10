'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// 01. Geolocation API (popup that asks for location)
// (successCallback, errorCallback)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      /* {varName} ==> destructuring, takes posi.coords.varName auto */
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      // 02. Using the Leaflet Library to display the map
      // 'L' is an entry-point, kind of like a namespace (Intl for internationalization)

      const coords = [latitude, longitude];

      // 13 is zoom level
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position.');
    }
  );
}

// 02. Using the Leaflet Library to display the map
// This library is hosted on a CDN = Content Delivery Network
// We need to use 'defer' on the used js files in index.html so they load in the right order IMP
