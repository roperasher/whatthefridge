const unirest = require('unirest');
const queryString = require('query-string')
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69"; //Alex's API key
const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

//URLs, paths, and query parameters
const BASE = "https://api.spoonacular.com/";
const PRODUCTS_URL = BASE + "food/products";

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    unirest.get(url).end((result) => {
      if (result.status === 200) {
        //console.log(result.body); //uncomment to see the output JSON in the console
        resolve(result.body);
      }
    });
  })
}

class SpoonacularEndpoints {
  constructor() {
    this.apiKey = API_KEY;
  }

  searchGroceryProducts(parameters) {
    let query = queryString.stringify(parameters);
    console.log("query: ", query);
    let endpointURL = PRODUCTS_URL + "/search?" + this.apiKey + "&" + query;
    let endpointJSON = makeRequest(endpointURL);
    //Promise.resolve(endpointJSON);
    //console.log(endpointJSON);
    //return endpointJSON;

    /*
    This is where my problem is. If you comment out lines 36, 37, and 38 and comment out line 46,
    you'll see that there's a promise pending. My promise is never getting resolved and the
    .then block at line 15 in ingredientTest.js is never executing. My code hangs here forever
    and never errors.
    */
    return Promise.resolve(endpointJSON);
  }
}

const Spoonacular = new SpoonacularEndpoints();
module.exports = Spoonacular; 