const unirest = require('unirest');
const queryString = require('query-string')
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const API_KEY = "8966c29058mshee75833095db4cep1052bcjsn43d9790a58a9" // Alex rapidapi key
//URLs, paths, and query parameters
const BASE = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/" //"https://api.spoonacular.com/";
const RECIPES_URL = BASE  + "recipes/";
const PRODUCTS_URL = BASE + "food/products/";
const INGR_URL = BASE + "food/ingredients/";


//makes API call to the url
function makeRequest(url) {
  console.log(url)
  return new Promise((resolve, reject) => {
    unirest.get(url)
          .header("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")  
          .header("x-rapidapi-key", API_KEY)
          .end((result) => {
      if (result.status === 200) {
        console.log(result.headers); //uncomment to see the output JSON in the console
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
    let endpointURL = RECIPES_URL + "complexSearch/?" + query;
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
    let endpointURL = RECIPES_URL + params.id + '/information'
    return makeRequest(endpointURL);
  }

      /**
   * Required:
   *  @param {number} id The ingredient id
   * Optional:
   *  @param {amount} number The unit amount for ingredient
   *  @param {unit} number Unit type for ingredient amount
   *  go to: https://spoonacular.com/food-api/docs#Get-Ingredient-Information
   *  for list of optional parameters
   */
  //example request to endpoint: https://api.spoonacular.com/food/ingredients/{id}/information/?amount={amount}
  searchIngredientByID(params) {
    let endpointURL = INGR_URL + params.id + '/information/?amount=' + params.amount + '&unit=' + params.unit
    return makeRequest(endpointURL)
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
    let endpointURL = RECIPES_URL + "findByIngredients/?" + query;
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
    let endpointURL = RECIPES_URL + id + "/ingredientWidget/?" + defaultCss; 
    return makeRequest(endpointURL);
  }

    /**
   * Required:
   *  @param {number} id The recipe id.
   */
  //example request to endpoint: https://api.spoonacular.com/data/recipe/ingredientWidget.json?id={id}
  getRecipeIngredientsByID(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + id + "/ingredientWidget.json"
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/{id}/nutritionWidget.json?id={id}
  getRecipeNutritionWidgetByID(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + id + "/nutritionWidget.json"
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
    let endpointURL = RECIPES_URL + id + "/priceBreakdownWidget/?" + defaultCss; 
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
    let endpointURL = PRODUCTS_URL + "search/?" + query;
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The id of the packaged food. 
   */
  //example request to endpoint: https://api.spoonacular.com/food/products/22347
  getProductInformation(parameters) {
    let id = parameters;
    let endpointURL = PRODUCTS_URL + id
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
    let endpointURL = RECIPES_URL + id + "/nutritionWidget.json"
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The product id.
   * Optional:
   *  @param {boolean} defaultCSS shows product nutrition graph. Hard coded to true in our case
   */
  //example request to endpoint: https://api.spoonacular.com/food/products/{id}/nutritionWidget
  visualizeProductNutritionByID(parameters) {
    let id = parameters.id;
    let defaultCss = parameters.defaultCss; //hard coded to true
    let endpointURL = PRODUCTS_URL + id + "/nutritionWidget" + "?defaultCss=" + defaultCss; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   * Optional:
   *  @param {number} number The number of similar recipes to request
  */
  //example request to endpoint: https://api.spoonacular.com/recipes/autocomplete?number=10&query=chicken
  autocompleteRecipeSearch(parameters) {
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = RECIPES_URL + "/autocomplete?" + query; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The product id.
   * Optional:
   *  @param {number} number The number of results to return (between 1 and 25). 
  */
  //example request to endpoint: https://api.spoonacular.com/food/products/suggest?query=chicke&number=2 
  autocompleteProductSearch(parameters) {
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = PRODUCTS_URL + "/suggest?" + query; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   * Optional:
   *  @param {number} number The number of similar recipes to request
   *  @param {boolean} limitLicense 	Whether the recipes should have an open license that allows display with proper attribution.
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/{id}/similar
  getSimilarRecipes(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + id + "/similar"; 
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   * Optional:
   *  @param {boolean} stepBreakdown 	Whether to break down the recipe steps even more. 
   *    
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/324694/analyzedInstructions
  getAnalyzedRecipeInstructions(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + id + "/analyzedInstructions";
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {number} id The recipe id.
   *    
   */
  //example request to endpoint: https://api.spoonacular.com/recipes/4632/summary
  summarizeRecipe(parameters) {
    let id = parameters.id;
    let endpointURL = RECIPES_URL + id + "/analyzedInstructions";
    return makeRequest(endpointURL);
  }

  /**
   * Required:
   *  @param {ingredientName} String Name of the ingredient.
   *    
   */
  //example request to endpoint: https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=butter 
  getIngredientSubstitutes(parameters) { 
    let query = queryString.stringify(parameters);
    //console.log("query: ", query); //uncomment to see query parameters as a string
    let endpointURL = INGR_URL + "/substitutes?" + query; 
    return makeRequest(endpointURL);
  }

}

const Spoonacular = new SpoonacularEndpoints();
module.exports = Spoonacular; 