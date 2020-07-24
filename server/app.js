const unirest = require('unirest');
const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const ingredient = require('./routes/ingredient.js');
const recipe = require('./routes/recipe.js');
const nutrition = require('./routes/nutrition.js');

const PORT = 5000;

//multiple API keys just incase we run out of daily calls. Switch when testing if you need.
//const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69"; //Alex's API key
const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

//app.use(cors());

//root endpoint of WhatTheFridge server
//access with the URL: http://localhost:5000/
app.get('/', (request, response) => response.send("In root of WhatTheFridge server!"));

//endpoints for ingredient, recipe, and nutrition data
app.get("/data/ingredient", ingredient.searchGroceryProducts);
app.get("/data/ingredient/details", ingredient.getProductInformation);
app.get("/data/ingredient/nutrition/visualization", ingredient.visualizeProductNutritionDataByID);
app.get("/data/recipe", recipe.searchRecipeByIngredient);
app.get("/data/nutrition", nutrition.getRecipeNutritionWidgetByID);

//starts up server and keeps it running
app.listen(PORT, () => console.log(`WhatTheFridge server listening at http://localhost:${PORT}`));