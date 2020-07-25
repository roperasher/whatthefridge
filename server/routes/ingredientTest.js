const Spoonacular = require('../api-manager.js');
const unirest = require('unirest');
const express = require("express");
const SpoonacularEndpoints = require('../api-manager.js');
const { response } = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function requestProductImageURL(request, response) {
  //console.log("request: ", request.query.query);
  let data = {};
  let product = request.query.query;
  Spoonacular.searchGroceryProducts({query: product})
    .then((results) => {
      console.log("in .then block");
      let productImageURL = results.body.products[0].image;
      data.imageURL = productImageURL;
      response.send(data);
      //return Promise.resolve(results);
    })
}

module.exports = {requestProductImageURL};