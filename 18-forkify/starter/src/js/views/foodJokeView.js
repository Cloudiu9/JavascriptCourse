import icons from 'url:../../img/icons.svg'; // parcel 2

import View from './View.js';
import { AJAX } from '../helpers.js';

class FoodJokeView extends View {
  _parentElement = document.querySelector('.nav__btn--joke');

  addHandlerShowJoke(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // doesn't exist when the page starts, it's loaded in later ==> we need to add handler to parent (event delegation IMP)
      const btn = e.target.closest('.nav__btn--joke');

      if (!btn) return;

      const joke = AJAX('https://api.spoonacular.com/food/jokes/random');

      console.log(joke);
      handler();
    });
  }

  _generateMarkup() {
    return `
                <svg class="nav__icon">
                  <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
                <span>Food Joke</span>
        `;
  }
}

export default new FoodJokeView(); // exporting instance: only 1
