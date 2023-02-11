import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// API 地址：https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('test');

const renderSpinner = function (parentEL) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `;
  parentEL.innerHTML = '';
  parentEL.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    // 1.获取recipe数据
    renderSpinner(recipeContainer);
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37'
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // console.log(res);
    console.log(data);
    // 这里可以直接使用解构，但太长了，可读性不好，直接重新赋值
    let recipe = data.data.recipe;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2. render the search result
    const result = document.querySelector('.results');
    const html = `
<li class="preview">
  <a class="preview__link preview__link--active" href=#${recipe.id}>
    <figure class="preview__fig">
      <img src=${recipe.image} alt=${recipe.title} />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${recipe.title}</h4>
      <p class="preview__publisher">${recipe.publisher}</p>
      <div class="preview__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
    </div>
  </a>
</li>
`;
    result.insertAdjacentHTML('beforeend', html);

    // 3. render the recipe detail
    // 看一下这个数组每个元素返回一个HTML模板数组，然后再形成长字符串，的样子。
    // console.log(
    //   recipe.ingredients
    //     .map(ing => {
    //       return `
    //   <li class="recipe__ingredient">
    //       <svg class="recipe__icon">
    //         <use href="${icons}#icon-check"></use>
    //       </svg>
    //       <div class="recipe__quantity">${ing.quantity}</div>
    //       <div class="recipe__description">
    //         <span class="recipe__unit">${ing.unit}</span>
    //         ${ing.description}
    //       </div>
    // </li>
    //   `;
    //     })
    //     .join('')
    // );

    const markup = `
    <figure class="recipe__fig">
      <img src=${recipe.image} alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map(ing => {
          return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
      </li>
        `;
        })
        .join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href=${recipe.sourceUrl}
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
    // 直接删除这里的所有内部元素
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error(error);
  }
};

// showRecipe();

// 实现4个事件：用户搜索，用户点击分页，用户点击recipe，用户在地址栏输入recipe ID
// 分析：用户点击recipe，实际上是在网址中输入了hash ID，经过这个ID跳转到对应的recipe。

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
