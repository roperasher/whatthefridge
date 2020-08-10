
const Spoonacular = require('../api-manager.js');
const unirest = require('unirest');
const express = require("express");
const SpoonacularEndpoints = require('../api-manager.js');
const { response } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//returns JSON of recipe data
// example JSON that's returned
/* 
  {
    recipe: titleOfRecipe,
    imageURL: imageURLOfRecipe,
    id: recipeID#,
    calories: numberOfCalories,
    carbs: numberOfCarbs,
    fat: fatData,
    protein: proteinData
  }
*/
function getRecipeData(request, response) {
  let data = {};
  let recipe = request.query.query;
  let addRecipeInformation = request.query.addRecipeInformation;
  let addRecipeNutrition = request.query.addRecipeNutrition;
  let queryParameters = {query: recipe, addRecipeInformation: addRecipeInformation, addRecipeNutrition: addRecipeNutrition};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      data.recipe = result.results[0].title;
      data.imageURL = result.results[0].image;
      data.id = result.results[0].id;
      data.calories = result.results[0].calories;
      data.carbs = result.results[0].carbs;
      data.fat = result.results[0].fat;
      data.protein = result.results[0].protein;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of getRecipeData...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })
}

//returns JSON of recipe data with further details 
// example JSON that's returned
/* 
  {
    title: titleOfRecipe,
    summary: descriptionOfRecipie
    image: imageURLOfRecipe,
    id: recipeID#,
    calories: numberOfCalories,
    carbs: numberOfCarbs,
    fat: fatData,
    protein: proteinData
    readyInMinutes: numberOfMinutesToMakeRecipe,
    healthScore: healthScoreOfRecipe (Spoonacular standards),
    pricePerServince: priceOfRecipe
  }
*/
function getRecipeDataID(request, response) {
  let data = {};
  let id = request.query.id
  let queryParameters = {id: id};
  SpoonacularEndpoints.searchRecipeByID(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      data.title = result.title;
      data.summary = result.summary;
      data.image = result.image;
      data.id = result.id;
      data.calories = result.calories;
      data.carbs = result.carbs;
      data.fat = result.fat;
      data.protein = result.protein;
      data.readyInMinutes = result.readyInMinutes;
      data.healthScore = result.healthScore;
      data.pricePerServing = result.pricePerServing;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of getRecipeDataID...\n" +
        "API call to searchRecipeID failed!\n" + 
        "You tried to request data for: " + request.query.id + " which DNE\n");
      console.log("Error message: " + error);
    })
}

// recommends a recipe from a list of ingredients. Also returns recipe data
// example JSON that's returned
/* 
  {
    JSON of recipes recommended by ingredient list
  }
*/
function getRecipeDataByIngredients(request, response) {
  let data = {};
  let ingredients = request.query.ingredients;
  let number = request.query.number;
  let limitLicense = request.query.limitLicense;
  let ranking = request.query.ranking;
  let ignorePantry = request.query.ignorePantry;
  let queryParameters = {ingredients: ingredients, number: number, limitLicense: limitLicense, ranking: ranking, ignorePantry: ignorePantry};
  SpoonacularEndpoints.getRecipesByIngredients(queryParameters)
    .then((result) => {
      response.contentType("application/json");
      response.send(result);
    })
    .catch((error) => {
      console.log("In catch block of getRecipeDataByIngredients...\n" +
        "API call to getRecipesByIngredients failed!\n" + 
        "You tried to request data for: " + ingredients + " which DNE\n");
      console.log("Error message: " + error);
    })
}

// recommends a recipe from a list of ingredients. Also returns recipe data
// example JSON that's returned
/* 
  {
    JSON of recipes recommended by ingredient list
  }
*/
function getRecipeIngredientCSS(request, response) {
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  console.log('params: '+ queryParameters)
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let defaultCss = true; //CSS endpoints always hard coded to true
      let queryParameters = {id: id, defaultCss: defaultCss};
      SpoonacularEndpoints.visualizeRecipeIngredientsByID(queryParameters)
        .then((result) => {
          response.contentType("text/html");
          response.send(result);
        })
        .catch((error) => {
          console.log("In catch block of getRecipeIngredientCSS...\n" +
            "API call to visualizeRecipeIngredientsByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of getRecipeIngredientCSS...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    }) 
}


// returns series of recipe ingredient images 
// example of what's returned
/* 
  {
    images and quantity of all ingredients for some recipe
  }
*/
function getRecipeIngredientCssID(request, response) {
  let id = request.query.id;
  let defaultCss = true; //CSS endpoints always hard coded to true
  let queryParameters = {id: id, defaultCss: defaultCss};
  SpoonacularEndpoints.visualizeRecipeIngredientsByID(queryParameters)
    .then((result) => {
      response.contentType("text/html");
      response.send(result);
    })
    .catch((error) => {
      console.log("In catch block of getRecipeIngredientCSS...\n" +
        "API call to visualizeRecipeIngredientsByID failed!\n" + 
        "You tried to request data for: " + id + " which DNE\n");
      console.log("Error message: " + error);
    })
}

// returns JSON containing list of ingredients for some recipe
// example JSON that's returned
/* 
  {
    ingredients: listOfIngredientsForSomeRecipe
  }
*/
function requestRecipeIngredients(request, response) {
  let id = request.query.id;
  let queryParameters = {id: id};
  SpoonacularEndpoints.getRecipeIngredientsByID(queryParameters)
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log("In catch block of requestRecipeIngredients...\n" +
        "API call to getRecipeIngredientsByID failed!\n" + 
        "You tried to request data for: " + id + " which DNE\n");
      console.log("Error message: " + error);
    })
}

// returns a graph visualizing the price of a recipe by each ingredient
// example of what's returned
/* 
  {
    graph breaking down recipe ingredients
    A list of ingredient prices with a total
  }
*/
function getRecipePrice(request, response) {
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let defaultCss = true; //CSS endpoints always hard coded to true
      let queryParameters = {id: id, defaultCss: defaultCss};
      SpoonacularEndpoints.visualizeRecipePriceBreakdownByID(queryParameters)
        .then((result) => {
          response.contentType("text/html");
          response.send(result);
        })
        .catch((error) => {
          console.log("In catch block of getRecipePrice...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of getRecipePrice...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })  
}

//returns object with the name and ingredient list of a product
// example JSON that's returned
/* 
  {
    id: recipeID#
    title: recipeTitleUsedForAutocompletion
    imageType: imageTypeOfRecipe
  }
*/
function autocompleteRecipe(request, response) {
  let data = {};
  let recipe = request.query.query;
  let number = request.query.number;
  let queryParameters = {query: recipe, number: number};
  SpoonacularEndpoints.autocompleteRecipeSearch(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      data.id = result[0].id;
      data.title = result[0].title;
      data.imageType = result[0].imageType;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of autocompleteRecipe...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })   
}

// returns JSON containing similar recipes from some other recipe ID#
// example JSON that's returned
/* 
  {
    id: recipeID#
    title: recipeTitleUsedForAutocompletion
    imageType: imageTypeOfRecipe
    readyInMinutes: numberOfMinuteToPrepareRecipe
    sourceURL: urlForRecipeImage
  }
*/
function similarRecipes(request, response) {
  let data = {};
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let queryParameters = {id: id};
      SpoonacularEndpoints.getSimilarRecipes(queryParameters)
        .then((result) => {
          data.id = result[0].id;
          data.title = result[0].title;
          data.imageType = result[0].imageType;
          data.readyInMinutes = result[0].readyInMinutes;
          data.sourceURL = result[0].sourceURL;
          response.send(data);
        })
        .catch((error) => {
          console.log("In catch block of getSimilarRecipes...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of searchRecipe...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })  
}

// returns JSON containing recipe name, and instructions 
// example JSON that's returned
/* 
  {
    name: nameOfRecipe,
    steps: preparationInstructions
  }
*/
function recipeInstructions(request, response) {
  let data = {};
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let stepBreakdown = false; //hardcoded to false for now
      let queryParameters = {id: id, stepBreakdown: stepBreakdown};
      SpoonacularEndpoints.getAnalyzedRecipeInstructions(queryParameters)
        .then((result) => {
          data.name= result[0].name;
          data.steps= result[0].steps;
          response.send(data);
        })
        .catch((error) => {
          console.log("In catch block of getAnalyzedRecipeInstructions...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of searchRecipe...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })  
}

// returns JSON containing recipe name, and instructions in further detail
// example JSON that's returned
/* 
  {
    name: nameOfRecipe,
    steps: preparationInstructionsInFurtherDetail
  }
*/
function getSummarizedRecipeInstructions(request, response) {
  let data = {};
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let queryParameters = {id: id};
      SpoonacularEndpoints.summarizeRecipe(queryParameters)
        .then((result) => {
          data.id = result[0].id;
          data.summary = result[0].summary;
          data.title = result[0].title;
          response.send(data);
        })
        .catch((error) => {
          console.log("In catch block of summarizeRecipe...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of searchRecipe...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })  
}

// returns JSON of recipe nutrition analytics. Also contains list of good and bad nutrition
// example JSON that's returned
/* 
  {
    calories: numberOfCalories,
    carbs: numberOfCarbs,
    fat: fatData,
    protein: proteinData,
    bad: listOfBadNutritionalData,
    good; listOfGoodNutritionalData
  }
*/
function getRecipeNutritionWidget(request, response) {
  let data = {};
  let recipe = request.query.query;
  let queryParameters = {query: recipe};
  SpoonacularEndpoints.searchRecipe(queryParameters)
    .then((result) => {
      //console.log(result); //uncomment to see JSON returned from endpoint
      let id = result.results[0].id;
      let queryParameters = {id: id};
      SpoonacularEndpoints.getRecipeNutritionWidgetByID(queryParameters)
        .then((result) => {
          data.calories= result[0].calories;
          data.carbs= result[0].carbs;
          data.fat= result[0].fat;
          data.protein = result[0].protein;
          data.bad = result[0].bad;
          data.good= result[0].good;
          response.send(data);
        })
        .catch((error) => {
          console.log("In catch block of summarizeRecipe...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
            "You tried to request data for: " + id + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of searchRecipe...\n" +
        "API call to searchRecipe failed!\n" + 
        "You tried to request data for: " + recipe + " which DNE\n");
      console.log("Error message: " + error);
    })  
}


module.exports = {
  getRecipeData, 
  getRecipeDataID, 
  getRecipeDataByIngredients, 
  getRecipeIngredientCSS, 
  getRecipeIngredientCssID, 
  requestRecipeIngredients, 
  getRecipePrice,
  autocompleteRecipe,
  similarRecipes,
  recipeInstructions,
  getSummarizedRecipeInstructions,
  getRecipeNutritionWidget
}