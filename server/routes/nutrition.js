const Spoonacular = require('../api-manager.js');
const unirest = require('unirest');
const express = require("express");
const SpoonacularEndpoints = require('../api-manager.js');
const { response } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function getRecipeNutrition(request, response) {
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
          console.log("In catch block of getRecipeNutrition...\n" +
            "API call to visualizeRecipePriceBreakdownByID failed!\n" + 
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

module.exports = {getRecipeNutrition};