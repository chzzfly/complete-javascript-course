import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _success = '哇，你很棒哦！';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    const results = this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    // console.log(results);
    return results;
  }
}

export default new BookmarksView();
