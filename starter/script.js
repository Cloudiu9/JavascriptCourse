'use strict';

// 07. Managing Workout data with Classes
class Workout {
  // very new/recent class fields in JS
  date = new Date();

  // any object should have some kind of unique identifier so we can later identify it with that ID IMP
  id = (Date.now() + '').slice(-10); // usually we have a library in charge of class id's, here we're just converting the date to a string and taking the last 10 numbers IMP

  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()] // returns 0-11
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling'; // field property available on all instances
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling' was done above ^^^^

    this.calcSpeed();
    this.setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// testing if classes work
// const run1 = new Running([39, -12], 5, 2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

//////////////////////////////////////////
// APPLICATION ARCHITECTURE
// 05. Refactoring the code with classes

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const innerFlexCon = document.querySelector('.inner-flex');
const btnDeleteAll = document.querySelector('.delete-all');
const btnSort = document.querySelector('.sort');

// if this exists: show sorting button
let data = JSON.parse(localStorage.getItem('workouts')); // ==> an array with the workout objects

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #markers = [];
  #mapZoomLevel = 13;

  constructor() {
    // immediately call this func on page load

    // Get user's position
    this.#getPosition();

    // Get data from local storage
    this.#getLocalStorage();

    // In case last inputted event was 'cycling', it used to incorrectly show 'Cadence' instead of 'Elevation gain'. Calling this func here fixes it.
    this.#toggleElevationField();

    // Attach event handlers
    form.addEventListener('submit', this.#newWorkout.bind(this)); // newWorkout is gonna point to the HTML elem it was called on (so 'form', because it is an event handler func) ==> fix it with .bind(this == App object) IMP IMP

    // Switching between running/cycling
    inputType.addEventListener('change', this.#toggleElevationField);

    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));

    btnDeleteAll.addEventListener('click', this.reset.bind(this));

    containerWorkouts.addEventListener(
      'click',
      this.#handleEditClick.bind(this)
    );

    containerWorkouts.addEventListener(
      'click',
      this.#handleDeleteButton.bind(this)
    );

    // Show sorting button
    if (data && data.length > 0) {
      // select parent
      // insert html into .inner-flex
      /*
              <button class="crud sort">
          <i class="fa fa-solid fa-sort"></i>
        </button>
      */

      this.#renderSortBtn();
    }

    innerFlexCon.addEventListener('click', this.#handleSortButton.bind(this));
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
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // 02. Using the Leaflet Library to display the map
    // 'L' is an entry-point, kind of like a namespace (Intl for internationalization)

    const coords = [latitude, longitude];

    // 13 is zoom level
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // adding an 'event clicker' to add markers IMP
    // special methods from Leaflet
    this.#map.on('click', this.#showForm.bind(this));

    // load workouts from local storage
    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
  }

  #showForm(mapE) {
    // we copy this event to a global variable (because we don't need it in this scope)
    this.#mapEvent = mapE;

    // 04. Rendering the Workout Input Form
    form.classList.remove('hidden');

    // better user experience; makes it auto focus on this elem
    inputDistance.focus();
  }

  #hideForm() {
    // Clear inputs
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    // hide animation first, before adding hidden class
    form.style.display = 'none';

    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000); // happens after 1 sec
  }
  #toggleElevationField() {
    const isRunning = inputType.value === 'running';

    inputCadence
      .closest('.form__row')
      .classList.toggle('form__row--hidden', !isRunning);
    inputElevation
      .closest('.form__row')
      .classList.toggle('form__row--hidden', isRunning);
  }

  // 08. Creating a new workout
  #newWorkout(e) {
    // helper functions IMP
    // loops through array, checks if each value is positive, 'every' returns true only if all were posIMP
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // event listener for form input (with 'enter')
    e.preventDefault(); // stops page from reloading on submit

    // Get data from the form
    const type = inputType.value; // running/cycling
    const distance = +inputDistance.value; // convert to num
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers.');
      // IMP guard clause

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers.');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map as marker
    this.#renderWorkoutMarker(workout); // only need to use .bind(this) in callback functions IMP

    // Render workout as list
    this.#renderWorkout(workout);

    // Hide form +  Clear input fields
    this.#hideForm();

    // 11. Set local storage to all workouts
    this.#setLocalStorage();

    // Display sorting button
    this.#renderSortBtn();
  }

  #renderWorkoutMarker(workout) {
    // Display marker
    // 03. Displaying a marker with Leaflet

    // Storing it in a variable to add to the markers array
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // template literal for the css class
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    // Store reference with id (for deletion)
    this.#markers.push({ id: workout.id, marker });
  }

  // 09. Rendering Workouts
  #renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}
            <div class="edit-flex">
             <button class="crud edit">
                <i class="fa fa-solid fa-pencil"></i>
             </button>
             <button class="crud delete">
                <i class="fa fa-solid fa-minus-square"></i>
             </button>
            </div>
          </h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⌚</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `;

    if (workout.type === 'running')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
          `;

    if (workout.type === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;

    form.insertAdjacentHTML('afterend', html); // added as sibling at the end of form
  }

  // 12. (SELF) Edit workout button
  // #editWorkout(workout) {}

  // 10. Move to marker on click
  #moveToPopup(e) {
    // event delegation (adding event handler to parent)
    // closest = opposite of querySelector (closest parent)
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    // IMP get workout data from the workouts array
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Leaflet method
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        // duration of animation
        duration: 1,
      },
    });

    // using the public interface
    // workout.click(); // doesn't work on objects loaded from storage
  }

  // Using local storage API
  // should only be used for small amounts of data (becase it's 'blocking') IMP

  #setLocalStorage() {
    // key ('workouts') - value store, both values need to be strings
    // using JSON.stringify() can transform any object into a string IMP

    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // adding the workouts array
  }

  // IMP
  // When we load back the objects, they lose their prototype chains (so they can't use methods from Running / Workout anymore. workout.click() no longer works)

  #getLocalStorage() {
    // We need to turn back the string into an object with JSON.parse (opposite of stringify) IMP

    const data = JSON.parse(localStorage.getItem('workouts')); // ==> an array with the workout objects

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
      // this.#renderWorkoutMarker(work); // doesn't work (it's called right at the beginning, before the map has even loaded)
    });
  }

  // clears local storage and refreshes the page
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  #renderSortBtn() {
    const sortBtn = `
        <button class="crud sort">
          <i class="fa fa-solid fa-sort"></i>
        </button>
      `;

    // form.insertAdjacentHTML('afterend', html); // added as sibling at the end of form
    innerFlexCon.insertAdjacentHTML('afterbegin', sortBtn);
  }

  // event delegation: add event handler to parent that already exists (instead of directly on the btn that is added later with insertAdjacentHTML)

  // TODO: fix cycling only having distance and duration on the workout list and general buggy feeling when switching between running/cycling on the edit,
  // FIXED: had to call toggleElevationField in the constructor again.
  // TODO add a cancel button for the editing (click on the map again or press esc)

  #handleEditClick(e) {
    const btn = e.target.closest('.edit');
    if (!btn) return;

    const workoutEl = btn.closest('.workout');
    const workoutId = workoutEl.dataset.id;

    // Find index of workout
    const index = this.#workouts.findIndex(w => w.id === workoutId);
    if (index === -1) return;

    const workout = this.#workouts[index];

    // Remove from workouts array
    this.#workouts.splice(index, 1);

    // Remove from DOM
    workoutEl.remove();

    // Re-set storage (update)
    this.#setLocalStorage();

    // Show form again
    form.classList.remove('hidden');
    inputDistance.focus();

    // Save location for later use
    this.#mapEvent = {
      latlng: {
        lat: workout.coords[0],
        lng: workout.coords[1],
      },
    };

    // Pre-fill form inputs
    inputType.value = workout.type;
    inputDistance.value = workout.distance;
    inputDuration.value = workout.duration;

    if (workout.type === 'running') {
      inputCadence.value = workout.cadence;
    } else if (workout.type === 'cycling') {
      inputElevation.value = workout.elevationGain;
    }

    this.#toggleElevationField(workout.type); // show/hide relevant fields
  }

  #handleDeleteButton(e) {
    const btn = e.target.closest('.delete');
    if (!btn) return;

    const workoutEl = btn.closest('.workout');
    const workoutId = workoutEl.dataset.id;

    const index = this.#workouts.findIndex(w => w.id === workoutId);
    if (index === -1) return;

    this.#workouts.splice(index, 1);
    workoutEl.remove();

    // Remove marker from map
    const markerObj = this.#markers.find(m => m.id === workoutId);
    if (markerObj) {
      this.#map.removeLayer(markerObj.marker);
      this.#markers = this.#markers.filter(m => m.id !== workoutId);
    }

    this.#setLocalStorage();
  }

  #handleSortButton(e) {
    const btn = e.target.closest('.sort');
    if (!btn) return;
  }
}

// 02. Using the Leaflet Library to display the map
// This library is hosted on a CDN = Content Delivery Network
// We need to use 'defer' on the used js files in index.html so they load in the right order IMP

// 03. Displaying a marker with Leaflet

// 04. Rendering the Workout Input Form

const app = new App();
