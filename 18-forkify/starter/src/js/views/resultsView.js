import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found';
  _success = '哇，你很棒哦！';

  _generateMarkup() {
    // console.log(this._data);
    const results = this._data.map(this._generateMarkupPreview).join('');
    // console.log(results);
    return results;
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview"> 
      <a
        class="preview__link ${result.id === id ? `preview__link--active` : ''}"
        href="#${result.id}"
      >
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
