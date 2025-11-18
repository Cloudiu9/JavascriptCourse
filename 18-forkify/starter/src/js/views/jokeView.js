import icons from 'url:../../img/icons.svg'; // parcel 2

import View from './View.js';

class JokeView extends View {
  _parentElement = document.querySelector('.joke-container');

  addHandlerShowJoke(handler) {
    document
      .querySelector('.nav__btn--joke')
      .addEventListener('click', function (e) {
        // doesn't exist when the page starts, it's loaded in later ==> we need to add handler to parent (event delegation IMP)
        const btn = e.target.closest('.nav__btn--joke');

        if (!btn) return;

        handler();
      });
  }

  addHandlerClose() {
    this._parentElement.addEventListener('click', e => {
      if (e.target.classList.contains('joke-close')) {
        this._parentElement.classList.add('hidden');
        this._parentElement.innerHTML = '';
      }
    });
  }

  _generateMarkup() {
    return `
      <div class="joke-box">
        <button class="joke-close">×</button>
        <p>${this._data}</p>
      </div>
        `;
  }
}

export default new JokeView(); // exporting instance: only 1
