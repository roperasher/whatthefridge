const Spoonacular = require('../api-manager.js');
const unirest = require('unirest');
const express = require("express");
const SpoonacularEndpoints = require('../api-manager.js');
const { response } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//returns object with the name, img (jpg), and ID of product
function requestProductData(request, response) {
  //console.log("request: ", request.query.query); //uncomment to check query parameters
  let data = {};
  let product = request.query.query;
  let queryParameters = {query: product};
  Spoonacular.searchGroceryProducts(queryParameters)
    .then((result) => {
      //console.log(result);  //uncomment to see JSON returned from endpoint
      let product = result.products[0].title;
      let productImageURL = result.products[0].image;
      let productID = result.products[0].id;
      data.product = product;
      data.imageURL = productImageURL;
      data.id = productID;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of requestProductData...\n" +
        "API call to searchGroceryProducts failed!\n" + 
        "You tried to request data for: " + product + " which DNE\n");
      console.log("Error message: " + error);
    })
}

//returns object with the name and ingredient list of a product
function requestProductIngredients(request, response) {
  //console.log("request: ", request.query.id); //uncomment to check query parameters
  let data = {};
  let product = request.query.query;
  let queryParameters = {query: product};
  Spoonacular.searchGroceryProducts(queryParameters)
    .then((result) => {
      //console.log(result);  //uncomment to see JSON returned from endpoint
      let product = result.products[0].title;
      let productImageURL = result.products[0].image;
      let productID = result.products[0].id;
      data.product = product;
      data.imageURL = productImageURL;
      data.id = productID;
      Spoonacular.getProductInformation(productID)
        .then((result) => {
          //console.log(result); //uncomment to see JSON returned from endpoint
          let ingredients = result.ingredients;
          data.ingredients = ingredients;
          response.send(data);
        })
        .catch((error) => {
          console.log("In catch block of requestProductIngredients...\n" +
            "API call to getProductInformation failed!\n" + 
            "You tried to request data for: " + productID + " which DNE\n");
          console.log("Error message: " + error);
        })
    })
    .catch((error) => {
      console.log("In catch block of requestProductIngredients...\n" +
        "API call to searchGroceryProducts failed!\n" + 
        "You tried to request data for: " + product + " which DNE\n");
      console.log("Error message: " + error);
    })
}

function parseFridgeIngredients(request, response) {
  //console.log("request: ", request.query.query); //uncomment to check query parameters
  let data = {};
  let ingredients = request.query.ingredients;
  let queryParameters = {ingredientList: ingredients};
  Spoonacular.searchGroceryProducts(queryParameters)
    .then((result) => {
      //console.log(result);  //uncomment to see JSON returned from endpoint
      let product = result.products[0].title;
      let productImageURL = result.products[0].image;
      let productID = result.products[0].id;
      data.product = product;
      data.imageURL = productImageURL;
      data.id = productID;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of requestProductData...\n" +
        "API call to searchGroceryProducts failed!\n" + 
        "You tried to request data for: " + product + " which DNE\n");
      console.log("Error message: " + error);
    })
}

function getIngredientCost(request, response) {
  //console.log("request: ", request.query.query); //uncomment to check query parameters
  let data = {}
  let id = request.query.id
  let amount = request.query.amount
  let unit = request.query.unit
  let queryParameters = {id: id, amount: amount, unit: unit};
  Spoonacular.searchIngredientByID(queryParameters)
    .then((result) => {
      //console.log(result);  //uncomment to see JSON returned from endpoint
      let name = result.name;
      let price = "$" + (result.estimatedCost.value / 100).toFixed(2) ;
      data.name = name;
      data.price = price;
      response.send(data);
    })
    .catch((error) => {
      console.log("In catch block of getIngredientCost...\n" +
        "API call to getIngredientCost failed!\n" + 
        "You tried to request data for: " + id + " which DNE\n");
      console.log("Error message: " + error);
    })
}

module.exports = {
  requestProductData, 
  requestProductIngredients,
  parseFridgeIngredients,
  getIngredientCost
}