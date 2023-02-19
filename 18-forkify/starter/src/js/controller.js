import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView'; //默认导出，自由重命名
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);

// API 地址：https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('test');

if (module.hot) {
  module.hot.accept();
}

// 这个函数一方面向model索要数据，另一方面指导view渲染数据
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

// 查询某一recipe，然后渲染结果
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 获取搜索栏的query字符
    const query = searchView.getQuery();
    if (!query) return;
    // 加载query数据
    await model.loadSearchResults(query);
    // 渲染到页面上
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // 渲染分页按钮
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// 之后我们会用事件来调用它，现在先手动调用它。
// controlSearchResults();

// 实现分页按钮的功能
const controPagination = function (gotoPage) {
  // console.log(gotoPage);
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

// 食物份数更改，
const controlServings = function (newServings) {
  // 1.更新state中的数据
  model.updateServings(newServings);
  // 2.根据数据更新食谱视图
  // recipeView.render(model.state.recipe);
  // 2.现在我们只更新变化的部分，而非整个食谱视图
  recipeView.update(model.state.recipe);
};

// 直接调用这个函数，view那边已经在监听了，一旦发生变化，就会处理
const init = function () {
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandleUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controPagination);
};

init();
