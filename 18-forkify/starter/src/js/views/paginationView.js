import icons from 'url:../../img/icons.svg'; // parcel 2

import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // closest searches up in the tree, for parents (closest button => the one that was clicked)
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Build Prev button (visible or hidden)
    const prevBtn =
      curPage > 1
        ? `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `
        : `
      <button class="btn--inline pagination__btn--prev is-hidden"></button>
      `;

    // Build Next button (visible or hidden)
    const nextBtn =
      curPage < numPages
        ? `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `
        : `
      <button class="btn--inline pagination__btn--next is-hidden"></button>
      `;

    // Always render center button
    const centerBtn = `
    <button class="btn--inline pagination__btn--center">
      <span>Page ${curPage} / ${numPages}</span>
    </button>
  `;

    // Return all three every time
    return `
    ${prevBtn}
    ${centerBtn}
    ${nextBtn}
  `;
  }
}

export default new PaginationView();
