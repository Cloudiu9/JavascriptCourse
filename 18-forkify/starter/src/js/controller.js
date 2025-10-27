// importing named exports from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.jonas.io

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // skipping the # from the hash

    if (!id) return;

    recipeView.renderSpinner();

    // is an async func inside of another async func ==> needs await
    // does not return anyhthing, doesn't need to be stored in a variable (instead makes recipe available)

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults); // subscriber
};
init();
