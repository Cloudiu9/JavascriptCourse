import icons from 'url:../../img/icons.svg'; // parcel 2

import View from './View';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerDeleteBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // doesn't exist when the page starts, it's loaded in later ==> we need to add handler to parent (event delegation IMP)
      const btn = e.target.closest('.preview__remove--bookmark');

      if (!btn) return;

      // BLOCK the anchor
      e.preventDefault(); // stop navigation
      e.stopPropagation(); // stop bubbling to the <a>

      const preview = btn.closest('.preview');
      if (!preview) return;

      const id = preview.dataset.id;

      handler(id);
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView(); // exporting instance: only 1
