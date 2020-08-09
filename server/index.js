const express = require("express");
const path = require("path");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors')
const ingredient = require('./routes/ingredient.js');
const recipe = require('./routes/recipe.js');
const nutrition = require('./routes/nutrition.js');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Init express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(cors());
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  // // Answer API requests.
  // app.use("/recipes", require("./routes/recipe"));

  //endpoints for ingredient, recipe, and nutrition data
  app.get("/data/ingredient/searchGroceryProducts", ingredient.requestProductData);
  app.get("/data/ingredient/getProductInformation", ingredient.requestProductIngredients);
  app.get("/data/recipe/searchRecipe", recipe.getRecipeData);
  app.get("/data/recipe/searchRecipeID", recipe.getRecipeDataID)
  app.get("/data/recipe/searchRecipesByIngredients", recipe.getRecipeDataByIngredients);
  app.get("/data/recipe/visualizeRecipeByIngredientsID", recipe.getRecipeIngredientCssID);
  app.get("/data/recipe/visualizeRecipeByIngredients", recipe.getRecipeIngredientCSS);
  app.get("/data/recipe/visualizeRecipePriceBreakdownByID", recipe.getRecipePrice);
  app.get("/data/recipe/getRecipeIngredientsByID", recipe.requestRecipeIngredients)
  app.get("/data/nutrition/visualizeRecipeNutrition", nutrition.getRecipeNutrition);
  app.get("/data/nutrition/getNutritionInformation", nutrition.getRecipeNutritionID);


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}