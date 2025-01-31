import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found';
  _success = '哇，你很棒哦！';

  _generateMarkup() {
    // console.log(this._data);
    const results = this._data
      .map(result => previewView.render(result, false))
      .join('');
    // console.log(results);
    return results;
  }
}

export default new ResultsView();
