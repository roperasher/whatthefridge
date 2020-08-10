import React from "react";
import { v4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/App.css";
import Fridge from "./Fridge/Fridge"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Notifications, {notify} from 'react-notify-toast'

import Header from "./Header";
import Home from "./Home";
import Recipes from "./Recipes/Recipes";
import { About } from "./About";


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
    this.addRecipe = this.addRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
    this.recipeSaved = this.recipeSaved.bind(this)
    this.show = notify.createShowQueue()
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

  recipeSaved = (id) => {
    return this.state.recipes.some(recipe => recipe.id === id)
  }

  addRecipe = (title, id, missedIngredients) => {
    console.log(`Adding ${title}`)
    if(this.recipeSaved(id)) this.show(`${title} already saved to recipes`, "danger", 1500)
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
  }

  removeRecipe(title, id, missedIngredients) {
    console.log(`Removing ${title}`)
    if(!this.recipeSaved(id)) this.show(`${title} not in saved recipes`, "danger", 1500)
    this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe.id !== id),
    }))
    this.show(`${title} removed from saved recipes`, "warning", 1500)
  }

  render() {
    const { addIngr, removeIngr, recipeSearch, addRecipe, removeRecipe } = this;
    const { ingredients, savedRecipes, recipes } = this.state;
    return (
    <Router>
      <div className="app">
        <Header onNewIngr={addIngr} />
        <Notifications options={{zIndex: 500, top: 50}} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/recipes" render={(props) => <Recipes {...props} recipes={recipes} onAddRecipe={addRecipe} onRemoveRecipe={removeRecipe} />} />
          <Route path="/recipeSearch" render={(props) => <Recipes {...props} ingredients={ingredients} recipes={recipes} onAddRecipe={addRecipe} onRemoveRecipe={removeRecipe} />} />
          <Route path="/fridge" render={(props) => <Fridge {...props} ingredients={ingredients} removeIngr={removeIngr} />} />
        </Switch>
      </div>
    </Router>
    );
  }
}
