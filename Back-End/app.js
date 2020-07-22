var express = require("express");
var bodyParser = require("body-parser");
const app = express();
var path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const unirest = require('unirest');

const PORT = 5000;
const server = app.listen(PORT, console.log("Server running on port " + PORT));

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
const INGREDIENT_LIST = ['bananas', 'apples', 'cheese', 'crackers'];


let REQ_TYPE = "findByIngredients";
let requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
const ingredientsString = "&number=5&ranking=1&ingredients=" + INGREDIENT_LIST.map(ingredient =>
   ingredient + '%2C'
);

requestString = requestString + ingredientsString;
unirest.get(requestString)
.end(function (result) {
   if (result.status === 200){
	   let REQ_TYPE = result.body[0].id + "/information";
	   let requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
		unirest.get(requestString + "&includeNutrition=true")
		.end(function (result) {
			console.log(result.body);
		});
   };
});
