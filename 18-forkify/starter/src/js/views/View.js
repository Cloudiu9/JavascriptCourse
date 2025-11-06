// this time, export the class itself (only use it as a parent class, don't need its instances)
import icons from 'url:../../img/icons.svg'; // parcel

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    // Generate new markup, compare to oldmarkup, only change text/attributes that have changed
    const newMarkup = this._generateMarkup();

    // converts 'string' HTML to an actual DOM node object
    // can use this DOM as if it were a real DOM on the page
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // converting from NodeList to a real array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      // double looping for both elements
      const curEl = curElements[i];

      // using 'isEqualNode' to compare elements from both DOMs
      // if dom elem is different, change current element's content to the new one
      // nodeValue only extracts the TEXT CONTENT of an element IMP

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // replace all attributes in the cur elem with the atr coming from the new element
      // Updates changed ATTRIBUTES (data_update_to = 5 ==> = 6)
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
