const unirest = require('unirest');
const queryString = require('query-string')
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69"; //Alex's API key
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

//URLs, paths, and query parameters
const BASE = "https://api.spoonacular.com/";
const RECIPES_URL = BASE  + "recipes/";
const PRODUCTS_URL = BASE + "food/products";

//makes API call to the url
function makeRequest(url) {
  console.log(url)
  return new Promise((resolve, reject) => {
    unirest.get(url).end((result) => {
      if (result.status === 200) {
        //console.log("results.body", result.body); //uncomment to see the output JSON in the console
        resolve(result.body);
      } else {
        reject("ERROR! Call to endpoint failed!");
      }
    });
  })
}

class SpoonacularEndpoints {
  constructor() {
    this.apiKey = API_KEY;
  }

  /**
   * Required:
   *  @param {string} query The (natural language) recipe search query.
   * Optional:
   *  go to: https://spoonacular.com/food-api/docs#Search-Recipes-Complex 
   *  for list of optional parameters
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/complexSearch?query=pasta
  searchRecipe(parameters) {
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = RECIPES_URL + "/complexSearch" + this.apiKey + "&" + query;
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id
   * Optional:
   *  go to: https://spoonacular.com/food-api/docs#Search-Recipes-Complex 
   *  for list of optional parameters
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/complexSearch?query=pasta
  searchRecipeByID(params) {
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = RECIPES_URL + params.id + '/information' + this.apiKey
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {string} ingredients comma separated list of ingredients
   * Optional:
   *  @param {number} number The maximum number of recipes to return (between 1 and 100). Defaults to 10.
   *  @param {boolean} limitLicense Whether the recipes should have an open license that allows display with proper attribution.
   *  @param {number} ranking Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
   *  @param {boolean} ignorePantryWhether to ignore typical pantry items, such as water, salt, flour, etc.
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,flour,sugar
  getRecipesByIngredients(parameters) {
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = RECIPES_URL + "/findByIngredients" + this.apiKey + "&" + query;
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   * Optional:
   *  @param {boolean} defaultCSS shows recipe ingredient images. Hard coded to true in our case
   */
  //example request to endpoint: https://api.spoonacular.com/data/recipe/visualizeRecipeByIngredientsID?query=shakshuka
  visualizeRecipeIngredientsByID(parameters) {
    let id = parameters.id;
    let defaultCss = parameters.defaultCss; //hard coded to true
    let endpointURL = RECIPES_URL + "/" + id + "/ingredientWidget" + this.apiKey + "&" + defaultCss; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   * Optional:
   *  @param {boolean} defaultCSS shows recipe ingredient images. Hard coded to true in our case
   */
  //example request to endpoint: https://api.spoonacular.com/data/recipe/visualizeRecipePriceBreakdownByID?query=shakshuka
    visualizeRecipePriceBreakdownByID(parameters) {
    let id = parameters.id;
    let defaultCss = parameters.defaultCss; //hard coded to true
    let endpointURL = RECIPES_URL + "/" + id + "/priceBreakdownWidget" + this.apiKey + "&" + defaultCss; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {string} query name of grocery product 
   * Optional:
   *  go to: https://spoonacular.com/food-api/docs#Search-Grocery-Products
   *  for list of optional parameters
   */
  //example request to endpoint: https://api.spoonacular.com/food/products/search?query=tomato
  searchGroceryProducts(parameters) {
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = PRODUCTS_URL + "/search" + this.apiKey + "&" + query;
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The id of the packaged food. 
   */
  //example request to endpoint: https://api.spoonacular.com/food/products/22347
  getProductInformation(parameters) {
    let id = parameters;
    let endpointURL = PRODUCTS_URL + "/" + id + this.apiKey;
    console.log("endpointURL: ", endpointURL);
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   */
  //example request to endpoint: https://api.spoonacular.com/data/recipes/{id}/nutritionWidget.json
  getNutritionInfoID(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + "/" + id + "/nutritionWidget.json" + this.apiKey 
    return makeRequest(endpointURL);
  }
}

const Spoonacular = new SpoonacularEndpoints();
module.exports = Spoonacular; 