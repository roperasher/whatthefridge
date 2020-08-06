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


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipes: []
    }
    this.addIngr = this.addIngr.bind(this)
    this.removeIngr = this.removeIngr.bind(this)
    // this.recipeSearch = this.recipeSearch.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
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

  removeIngr(id) {
    this.setState((prevState) => ({
      ingredients: prevState.ingredients.filter((ingr) => ingr.id !== id),
    }));
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

  addRecipe = (name, recipeID) => {
    this.setState(prevState => ({
      recipes: [
        ...prevState.recipes,
        {
          id: v4(),
          name,
          recipeID
        }
      ],
    }))
    this.show(`${name} added to your recipes`, "success", 1500)
  };

  removeRecipe = () => {};

  render() {
    const { addIngr, removeIngr, recipeSearch, addRecipe, removeRecipe } = this;
    const { ingredients, recipes } = this.state;
    return (
    <Router>
      <div className="app">
        <Header onNewIngr={addIngr} />
        {/* <SearchBar onNewIngr={addIngr} onSearch={() => recipeSearch(...ingredients)} /> */}
        <Notifications options={{zIndex: 500, top: 50}} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/recipes" render={(props) => <Recipes {...props} ingredients={ingredients} onAddRecipe={addRecipe} />} />
          <Route path="/fridge" render={(props) => <Fridge {...props} ingredients={ingredients} removeIngr={removeIngr} />} />
        </Switch>
      </div>
    </Router>
    );
  }
}
