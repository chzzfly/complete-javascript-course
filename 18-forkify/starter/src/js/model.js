import { API_URL, RES_PER_PAGE } from '../config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// 这个函数更新state.recipe的值，不返回任何东西。
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // 这里可以直接使用解构，但太长了，可读性不好，所以直接重新赋值
    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
    if (state.bookmarks.some(bookmark => bookmark.id === recipe.id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (error) {
    // console.error(`${error}💥`);
    throw error;
  }
};

// 实现搜索功能
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
    state.search.page = 1;
  } catch (error) {
    console.error(`${error}💥`);
    throw error;
  }
};

// loadSearchResults('pizza');

// 获取一个页面的数据，返回数据的一部分即一页;page是第几页的意思
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// 更新数据：改变每种成分的数量
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // 新的份量 = 原份量 * 新数量/旧数量, such as 2*(8/4)
    // 上面老师的解法并不直观，可以直接计算出每一份食物需要的多少份的配料，然后再乘以新的食物数量。
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

// 制作书签
export const addBookmark = function (recipe) {
  // 添加这个食谱
  state.bookmarks.push(recipe);

  // 将当前食谱做一个标记bookmared true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

//
export const deleteBookmark = function (id) {
  // 删除这个ID的recipe食谱
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // 将当前食谱做一个标记bookmared false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
