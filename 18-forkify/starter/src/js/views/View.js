import icons from 'url:../../img/icons.svg';

// 创建一个父类，把需要渲染的逻辑都写里面
export default class View {
  _data;

  // 对象在controller里调用了，传递的参数为state.recipe
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // 对比新的DOM和当前页面上的DOM，找出不同的部分进行替换
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // 将字符串转换成真正的DOM对象，但并不真正存在在页面上，virtual dom
    const newDom = document.createRange().createContextualFragment(newMarkup);

    // 将DOM元素打印在控制台
    const newElements = Array.from(newDom.querySelectorAll('*'));
    // console.log(newElements);

    // 当前页面上的DOM元素，将nodelist转为真正的数组
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements, newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🍕', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  #clear() {
    // 直接删除这里的所有内部元素
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
  `;
    this.#clear();
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
    </div>
  `;
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
