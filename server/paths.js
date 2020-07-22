//idea for alternative to API manager class.
//instead we can just have a "globals" page with the API key(s) and endpoint URLs/paths that
//our endpoints can reference.

//API key(s)
//const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69"; //Alex's API key
const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

//URLs and paths
const BASE = "https://api.spoonacular.com/";
const ENDPOINT_SEARCH_GROCERY_PRODUCTS = BASE + "food/products/search";
const ENDPOINT_GET_PRODUCT_INFORMATION = BASE + "food/products/";
const ENDPOINT_VISUALIZE_PRODUCT_NUTRITION_DATA_BY_ID = BASE + "food/products/";
const ENDPOINT_SEARCH_RECIPES_BY_INGREDIENTS = BASE + "recipes/findByIngredients";
const ENDPOINT_GET_RECIPE_NUTRITION_WIDGET_BY_ID = BASE + "recipes/";
