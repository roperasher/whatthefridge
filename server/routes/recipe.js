const express = require("express");
const router = express.Router();

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
const INGREDIENT_LIST = ["bananas", "apples", "cheese", "crackers"];

const unirest = require("unirest");

let REQ_TYPE = "findByIngredients";
let requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
const ingredientsString =
  "&number=5&ranking=1&ingredients=" +
  INGREDIENT_LIST.map((ingredient) => ingredient + "%2C");
requestString = requestString + ingredientsString;

// GET test from spoontacular
router.get("/test", (req, res) => {
  unirest.get(requestString).end(function (result) {
    if (result.status === 200) {
      let REQ_TYPE = result.body[0].id + "/information";
      let requestString =
        "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY;
      unirest
        .get(requestString + "&includeNutrition=true")
        .end(function (result) {
          res.send(result.body);
          console.log(result.body);
        });
    }
  });
});

module.exports = router;
