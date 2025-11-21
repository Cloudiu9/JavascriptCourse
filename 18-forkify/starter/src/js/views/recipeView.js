import View from './View.js';

// import icons from '../img/icons.svg' // parcel 1
// going up 2 folders
import icons from 'url:../../img/icons.svg'; // parcel 2

// library for fractional numbers
import Fraction from 'fraction.js';

class RecipeView extends View {
  // changing from # (truly private, native JS way) to _ (only protected, parce/babel can't transpile #)
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // is the publisher, receives the subscriber (controlRecipes)
  addHandlerRender(handler) {
    // array for events to listen to
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // event delegation (closest is useful for this)
      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // doesn't exist when the page starts, it's loaded in later ==> we need to add handler to parent (event delegation IMP)
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    const btnBookmark = document.querySelector('.btn--bookmark');

    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <i class="fas fa-clock recipe__info-icon"></i>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
              <i class="fas fa-user recipe__info-icon"></i>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
              <i class="fas fa-minus"></i>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
              <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
              <i class="fas fa-user"></i>
          </div>
          <button class="btn--round btn--bookmark ${
            this._data.bookmarked ? `bookmark-fill` : ''
          }">
              <i class="fas fa-bookmark"></i>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(this._generateMarkupIngredient)
            .join('')}          
          </div>          
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <i class="fas fa-arrow-right search__icon"></i>
          </a>
        </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="recipe__ingredient">
              <i class="fas fa-check recipe__icon"></i>
              <div class="recipe__quantity">${
                ing.quantity
                  ? new Fraction(ing.quantity).simplify(0.01).toFraction(true)
                  : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
  }
}

export default new RecipeView();
