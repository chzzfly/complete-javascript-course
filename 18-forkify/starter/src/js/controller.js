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
  } catch (error) {
    console.error(error);
  }
};

// controlRecipes();

// 实现4个事件：用户搜索，用户点击分页，用户点击recipe，用户在地址栏输入recipe ID

// 分析：用户点击recipe，实际上是在网址中输入了hash ID，经过这个ID跳转到对应的recipe。
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
