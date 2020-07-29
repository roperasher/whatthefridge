const unirest = require('unirest');
//const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const ingredient = require('./routes/ingredient.js');
const recipe = require('./routes/recipe.js');

const PORT = 5000;

//app.use(cors());

//root endpoint of WhatTheFridge server
//access with the URL: http://localhost:5000/
app.get('/', (request, response) => response.send("In root of WhatTheFridge server!"));

//endpoints for ingredient, recipe, and nutrition data
app.get("/data/ingredient/searchGroceryProducts", ingredient.requestProductData);
app.get("/data/ingredient/getProductInformation", ingredient.requestProductIngredients);
app.get("/data/recipe/searchRecipe", recipe.getRecipeData);
app.get("/data/recipe/searchRecipesByIngredients", recipe.getRecipeDataByIngredients);

//starts up server and keeps it running
app.listen(PORT, () => console.log(`WhatTheFridge server listening at http://localhost:${PORT}`));