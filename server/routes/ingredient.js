const unirest = require('unirest');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69"; //Alex's API key
const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

//URLs, paths, and query parameters
const BASE = "https://api.spoonacular.com/";
const ENDPOINT_SEARCH_GROCERY_PRODUCTS = "food/products/search";
const ENDPOINT_GET_PRODUCT_INFORMATION = "food/products/";
const ENDPOINT_VISUALIZE_PRODUCT_NUTRITION_DATA_BY_ID = "food/products/";
let ingredient = "tomato"; //this data will eventaully be brought in via a query parameter from a URL
const REQUIRED_PARAMETERS = "&query=" + ingredient; //temporary
const OPTIONAL_PARAMETERS = "&number=1"; //temporary
const URL_INGREDIENT = BASE + ENDPOINT_SEARCH_GROCERY_PRODUCTS + API_KEY + REQUIRED_PARAMETERS + OPTIONAL_PARAMETERS;

//gets basic ingredient data like id and an image (jpg)
function searchGroceryProducts(request, response) {
  unirest.get(URL_INGREDIENT).end((result) => {
    if (result.status === 200) {
      //console.log(result.body); //uncomment to see the API calls output JSON in the console
      response.send(result.body);
    }
  });
}

//gets detailed ingredient data
function getProductInformation(request, response) {
  unirest.get(URL_INGREDIENT).end((result) => {
    if (result.status === 200) {
      let ingredientID = result.body.products[0].id; //TODO change product[0] to something more practical
      const PARAMETERS = ingredientID;
      const URL_INGREDIENT_INFORMATION = BASE + ENDPOINT_GET_PRODUCT_INFORMATION + PARAMETERS + API_KEY;
      unirest.get(URL_INGREDIENT_INFORMATION).end((result) => {
        if (result.status === 200) {
          //console.log(result.body); //uncomment to see the API calls output JSON in the console
          response.send(result.body);
        }
      });
    }
  });
}

//displays graph(s) of ingredients nutritional data
function visualizeProductNutritionDataByID(request, response) {
  unirest.get(URL_INGREDIENT).end((result) => {
    if (result.status === 200) {
      let ingredientID = result.body.products[0].id; //TODO change product[0] to something more practical
      const PARAMETERS_AND_NUTRITION_WIDGET = ingredientID + "/nutritionWidget";
      const DEFAULTCSS = "&defaultCss=true"; //temporary
      const URL_INGREDIENT_NUTRITION_VISUALIZATION = BASE + ENDPOINT_VISUALIZE_PRODUCT_NUTRITION_DATA_BY_ID + PARAMETERS_AND_NUTRITION_WIDGET + API_KEY + DEFAULTCSS;
      unirest.get(URL_INGREDIENT_NUTRITION_VISUALIZATION).end((result) => {
        if (result.status === 200) {
          //console.log(result.body); //uncomment to see the API calls output JSON in the console
          response.send(result.body);
        }
      });
    }
  });
}

module.exports = {searchGroceryProducts, getProductInformation, visualizeProductNutritionDataByID};