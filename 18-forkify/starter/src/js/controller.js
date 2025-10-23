// importing named exports from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // skipping the # from the hash
    console.log(id);

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
