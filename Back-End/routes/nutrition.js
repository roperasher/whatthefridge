const express = require("express");
const unirest = require("unirest");
//const router = express.Router();

//multiple API keys just incase we run out of daily calls. Switch when testing if you need.
const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

const INGREDIENT_LIST = ["bananas", "apples", "cheese", "crackers"];
let REQ_TYPE = "findByIngredients";
let requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
const ingredientsString =
  "&number=5&ranking=1&ingredients=" +
  INGREDIENT_LIST.map((ingredient) => ingredient + "%2C");
requestString = requestString + ingredientsString;

//API call to the endpoint searchRecipeByIngredient
function getRecipeNutritionWidgetByID(request, response) {
  unirest.get(requestString).end(function (result) {
    if (result.status === 200) {
      let REQ_TYPE = result.body[0].id + "/nutritionWidget.json";
      let requestString =
        "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
      unirest.get(requestString).end(function (result) {
          //console.log(result.body); //uncomment to see the API calls output JSON in the console
          response.send(result.body);
        });
    }
  });
}

module.exports = {getRecipeNutritionWidgetByID};
