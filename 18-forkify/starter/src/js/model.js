import { API_URL } from '../config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

// 这个函数不返回值，它做的是更新state.recipe的值
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
    console.log(state.recipe);
  } catch (error) {
    // console.error(`${error}💥`);
    throw error;
  }
};
