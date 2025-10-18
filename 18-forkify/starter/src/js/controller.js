// importing named exports from the model
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

// array for events to listen to
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// hashchange in the URL (recipe ID)
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
