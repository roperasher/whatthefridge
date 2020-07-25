const unirest = require('unirest');
//const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const ingredient = require('./routes/ingredient.js');
const recipe = require('./routes/recipe.js');
const nutrition = require('./routes/nutrition.js');
const ingredientTest = require('./routes/ingredientTest.js');

const PORT = 5000;

//app.use(cors());

//root endpoint of WhatTheFridge server
//access with the URL: http://localhost:5000/
app.get('/', (request, response) => response.send("In root of WhatTheFridge server!"));

//endpoints for ingredient, recipe, and nutrition data
app.get("/data/ingredient", ingredient.searchGroceryProducts);
app.get("/data/ingredient/details", ingredient.getProductInformation);
app.get("/data/ingredient/nutrition/visualization", ingredient.visualizeProductNutritionDataByID);
//app.get("/data/recipe", recipe.searchRecipeByIngredient);
app.get("/data/nutrition", nutrition.getRecipeNutritionWidgetByID);

//this is the only endpoint using the api-manager class at the moment
app.get("/data/ingredientTest/image", ingredientTest.requestProductImageURL);

//starts up server and keeps it running
app.listen(PORT, () => console.log(`WhatTheFridge server listening at http://localhost:${PORT}`));