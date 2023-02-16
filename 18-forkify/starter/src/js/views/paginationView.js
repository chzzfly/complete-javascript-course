import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    //这个_data 是我们传入的参数
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(this._data.results.length, this._data.resultsPerPage, numPages);
    // 页面1，有其他页面
    if (curPage === 1 && numPages > 1) {
      // return 'page 1, others';
      return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span> 
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
    // 最后一个页面
    if (curPage === numPages && numPages > 1) {
      // return 'last page';
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
    }
    // 中间页面
    if (curPage < numPages) {
      // return 'other page';
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span> 
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
    // 页面1，无其他页面
    // return 'only 1 page';
    return '';
  }
}

export default new PaginationView();
