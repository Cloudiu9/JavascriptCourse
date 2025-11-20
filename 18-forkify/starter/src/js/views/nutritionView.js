import View from './View.js';

class NutritionView extends View {
  _parentElement = document.querySelector('.nav__btn--nutrition');
  _container = document.querySelector('.nutrition-container'); // new container

  addHandlerShowNutrition(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // doesn't exist when the page starts, it's loaded in later ==> we need to add handler to parent (event delegation IMP)
      const btn = e.target.closest('.nav__btn--nutrition');

      if (!btn) return;

      handler();
    });
  }

  addHandlerClose() {
    this._container.addEventListener('click', e => {
      if (e.target.classList.contains('nutrition-close')) {
        this._container.classList.add('hidden');
        this._container.innerHTML = '';
      }
    });

    this._container.classList.remove('hidden');
  }

  // TODO does it work if only the div parent has z-index:3? yes
  _generateMarkup() {
    return `
      <div style="position: absolute; z-index: 3; width: 20rem" class="nutrition-box">
        <button style="cursor:pointer" class="nutrition-close">×</button>
        <h2>Nutrition</h2>
        <p>Total calories: ${this._data.totalCalories.toFixed(0)}</p>

        <ul>
          ${this._data.perIngredient
            .map(
              ing => `<li>${ing.original}: ${ing.calories.toFixed(0)} cal</li>`
            )
            .join('')}
        </ul>
      </div>
    `;
  }

  // TODO is this doing anything? : yes. if this is commented out, it renders the box above the button, not below it
  render(data) {
    this._data = data;
    this._container.innerHTML = this._generateMarkup(); // render in container
  }
}

export default new NutritionView();
