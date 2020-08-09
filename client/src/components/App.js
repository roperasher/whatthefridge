import React from "react";
import { render } from "react-dom";
import { v4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/App.css";
import SearchBar from "./SearchBar";
import Fridge from "./Fridge/Fridge"
import RecipeList from "./Recipes/RecipeList";
import IngrList from "./Ingredients/IngrList";
import DataComponent from "./DataComponent";
import { Card, Accordion, Button } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Notifications, {notify} from 'react-notify-toast'

import Header from "./Header";
import Home from "./Home";
import Recipes from "./Recipes/Recipes";
import { About } from "./About";
import { InfoCarousel } from "./Recipes/Recipe"


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      savedRecipes: [],
      recipes: []
    }
    this.addIngr = this.addIngr.bind(this)
    this.removeIngr = this.removeIngr.bind(this)
    // this.recipeSearch = this.recipeSearch.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
    this.show = notify.createShowQueue()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevState)
  }

  addIngr({ name, image }) {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        {
          id: v4(),
          name,
          image
        }
      ],
    }))
    this.show(`${name} added to fridge`, "success", 1500)
  }

  removeIngr(name, id) {
    this.setState((prevState) => ({
      ingredients: prevState.ingredients.filter((ingr) => ingr.id !== id),
    }));
    this.show(`Removed ${name} from fridge`, "warning", 1500)
  }

  // recipeSearch(...ingrs) {
  //   const requestString = "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" + ingrs.map(ingr => ingr.name.replace(' ', '%2C')).join(',') + "&number=5&ranking=1" 
  //   console.log(requestString)
  //   const RecipeDash = 
  //       DataComponent(
  //           RecipeList,
  //           requestString,
  //           true,
  //           null
  //       )
  //   render (
  //       <>
  //           <App />
  //           <RecipeDash />
  //       </>,
  //       document.getElementById('root')
  //   )
  // }
  recipeExists = (id) => {
    return this.state.recipes.some(recipe => recipe.id === id)
  }

  addRecipe = (title, id, missedIngredients) => {
    console.log(`Adding ${title}`)
    if(this.recipeExists(id)) this.removeRecipe(title, id, missedIngredients)
    else {
      this.setState(prevState => ({
          recipes: [
            ...prevState.recipes,
            {
              title,
              id,
              missedIngredients
            }
          ],
      }))
      this.show(`${title} added to your recipes`, "success", 1500)
    }
    console.log(this.state.recipes)
  }

  removeRecipe(title, id, missedIngredients) {
    console.log(`Removing ${title}`)
    this.setState((prevState) => ({
      savedRecipes: prevState.recipes.filter((recipe) => recipe.id !== id),
    }))
    this.show(`${title} removed from saved recipes`, "danger", 1500)
    console.log(this.state.recipes)
  }

  render() {
    const { addIngr, removeIngr, recipeSearch, addRecipe, removeRecipe } = this;
    const { ingredients, savedRecipes, recipes } = this.state;
    return (
    <Router>
      <div className="app">
        <Header onNewIngr={addIngr} />
        {/* <SearchBar onNewIngr={addIngr} onSearch={() => recipeSearch(...ingredients)} /> */}
        <Notifications options={{zIndex: 500, top: 50}} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/recipes" render={(props) => <Recipes {...props} recipes={recipes} onRemoveRecipe={removeRecipe} />} />
          <Route path="/recipeSearch" render={(props) => <Recipes {...props} ingredients={ingredients} recipes={savedRecipes} onAddRecipe={addRecipe} />} />
          <Route path="/fridge" render={(props) => <Fridge {...props} ingredients={ingredients} removeIngr={removeIngr} />} />
        </Switch>
      </div>
    </Router>
    );
  }
}
