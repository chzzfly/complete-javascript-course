import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

// API 地址：https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('test');

// 一方面向后端索要数据，另一方面在前端渲染数据
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 1.获取recipe数据
    await model.loadRecipe(id);

    // 2. render the recipe detail
    recipeView.render(model.state.recipe);
    // recipeView.renderMessage();
  } catch (error) {
    // console.error(error);
    recipeView.renderError();
  }
};

// 直接调用这个函数，于是view那边就在监听，一旦发生变化，这边就处理
const init = function () {
  recipeView.addHandleRender(controlRecipes);
};

init();
