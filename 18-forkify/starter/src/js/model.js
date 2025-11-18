import { async } from 'regenerator-runtime';

import { API_URL, KEY, RES_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';
import { SPOONACULAR_KEY } from './config2.js';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data; // destructuring since data.data.recipe exists
  // remaking the recipe object to change formatting
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // only adds the key attribute if there is a key
  };
};

// Changes state object (not a pure function)
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    // some - returns true/false
    // if there is a bookmark with the id that we just received
    // ==> bookmark current recipe
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // only adds the key attribute if there is a key
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const getSearchReultsPage = function (page = state.search.page) {
  state.search.page = page;

  // * 10 because we want 10 results per page
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9, because slice doesn't take the last value

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookMark = function (id) {
  // Remove bookmark
  const index = state.bookmarks.findIndex(el => el.id === id); // one condition where this is true ==> return it's index
  state.bookmarks.splice(index, 1); // delete index

  // Mark current recipe NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // parse => convert string back to object
  if (storage) state.bookmarks = JSON.parse(storage); // loads bookmarks from localstorage
};

init();

// for debugging
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// makes a request to the api ==> async
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format. Please use the specified format.'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const loadJoke = async function () {
  const req = await AJAX(
    `https://v2.jokeapi.dev/joke/Any?nsfw=false&racist=false&religious=false&sexist=false&explicit=false&safe-mode`
  );

  const data = req.setup
    ? `${req.setup + '...<br>...' + req.delivery}`
    : `${req.joke}`;

  console.log(req);
  return data;
};
