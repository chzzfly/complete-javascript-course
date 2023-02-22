import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView'; //默认导出，自由重命名
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from '../config';

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

    // 高亮标记目前页面显示的recipe
    resultsView.update(model.getSearchResultsPage());
    // 更新bookmarks view，在这之前，bookmarks view已经加载了
    // debugger;
    bookmarksView.update(model.state.bookmarks);
    // 1.获取recipe数据
    await model.loadRecipe(id);

    // 2. render the recipe detail
    recipeView.render(model.state.recipe);
    // recipeView.renderMessage();
  } catch (error) {
    console.error(error);
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
    console.error(error);
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

//
const controlAddBookmark = function () {
  // 收藏或取消收藏
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);
  // 更新页面的收藏图标
  recipeView.update(model.state.recipe);

  // 渲染收藏内容
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // 显示spinner转圈圈，显示正在上传数据
    addRecipeView.renderSpinner();
    // console.log(newRecipe);
    // console.log(Object.entries(newRecipe));
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);
    // 渲染用户上传的食谱
    recipeView.render(model.state.recipe);
    // 弹出成功上传的提示框
    addRecipeView.renderMessage();
    // 渲染bookmarks view
    bookmarksView.render(model.state.bookmarks);
    // 更改网址栏的地址
    window.history.pushState(null, '', `${model.state.recipe.id}`);
    // 2.5秒后关闭modal窗口
    setTimeout(() => {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    // console.log(err);
    // console.error('☹', err);
    addRecipeView.renderError(err.message);
  }
};

// 直接调用这个函数，view那边已经在监听了，一旦发生变化，就会处理
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandleUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
