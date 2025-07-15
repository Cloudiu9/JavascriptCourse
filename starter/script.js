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

// 05. Refactoring the code with classes
class App {
  #map;
  #mapEvent;
  constructor() {
    // immediately call this func
    this.#getPosition();
    form.addEventListener('submit', this.#newWorkout.bind(this)); // newWorkout is gonna pont to the HTML elem it was called on (so 'form', because it is an event handler func) ==> fix it with .bind(this == App object) IMP IMP

    // Switching between running/cycling
    inputType.addEventListener('change', this.#toggleElevationField);
  }

  #getPosition() {
    // 01. Geolocation API (popup that asks for location)
    // (successCallback, errorCallback)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          // using .bind() to set the 'this' keyword correctly
          alert('Could not get your position.');
        }
      );
    }
  }

  #loadMap(position) {
    /* {varName} ==> destructuring, takes posi.coords.varName auto */
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // 02. Using the Leaflet Library to display the map
    // 'L' is an entry-point, kind of like a namespace (Intl for internationalization)

    const coords = [latitude, longitude];

    // 13 is zoom level
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // adding an 'event clicker' to add markers IMP
    // special methods from Leaflet
    this.#map.on('click', this.#showForm.bind(this));
  }

  #showForm(mapE) {
    // we copy this event to a global variable (because we don't need it in this scope)
    this.#mapEvent = mapE;

    // 04. Rendering the Workout Input Form
    form.classList.remove('hidden');

    // better user experience; makes it auto focus on this elem
    inputDistance.focus();
  }

  #toggleElevationField() {
    // closest == reverse querySelector (searches for parents, not children) ==> selects first(closest) parent with this class name
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  #newWorkout(e) {
    // event listener for form input (with 'enter')
    e.preventDefault(); // stops page from reloading on submit

    // Clear input fields
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    // Display marker
    // 03. Displaying a marker with Leaflet
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

// 02. Using the Leaflet Library to display the map
// This library is hosted on a CDN = Content Delivery Network
// We need to use 'defer' on the used js files in index.html so they load in the right order IMP

// 03. Displaying a marker with Leaflet

// 04. Rendering the Workout Input Form

const app = new App();
