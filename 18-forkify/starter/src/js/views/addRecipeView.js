import icons from 'url:../../img/icons.svg'; // parcel 2

import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :D';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // using this because we don't need a controller to interfere with it
  constructor() {
    // to allow the use of 'this'
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // binding the 'this' keyword so it works correctly
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this)); // binding the 'this' keyword so it works correctly
    this._overlay.addEventListener('click', this.toggleWindow.bind(this)); // binding the 'this' keyword so it works correctly
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // passing in the form as 'this' (because we're inside of a handler function of _parentElement)
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); // converts an array of entries to an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
