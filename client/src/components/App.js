import React from 'react'
import { render } from 'react-dom'
import { v4 } from 'uuid'
import '../stylesheets/App.css'
import SearchBar from './SearchBar'
import RecipeList from './RecipeList'
import IngrList from './IngrList'
import DataComponent from './DataComponent'


const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      ingredients: []
    }
    this.addIngr = this.addIngr.bind(this)
    this.removeIngr = this.removeIngr.bind(this)
    this.recipeSearch = this.recipeSearch.bind(this)
  }

  addIngr(name) {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        {
          id: v4(),
          name
        }
      ]
    }))
  }

  removeIngr(id) {
    this.setState(prevState => ({
      ingredients: prevState.ingredients.filter(ingr => ingr.id !== id)
    }))
  }

  recipeSearch(...ingredients) {
    let REQ_TYPE = "findByIngredients"
    const requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY + "&number=5&ranking=1&ingredients=" + ingredients.map(ingr => ingr.name).join('%2C')
    const RecipeDash = 
        DataComponent(
            RecipeList,
            requestString,
            true
        )
    render (
        <>
            <IngrList />
            <RecipeDash />
        </>,
        document.getElementById('root')
    )
}

  render() {
    const { addIngr, removeIngr, recipeSearch } = this
    const { ingredients } = this.state
    return (
      <div className="app">
        <SearchBar onNewIngr={addIngr} onSearch={() => recipeSearch(...ingredients)} />
        <IngrList ingredients={ingredients}
                  onRemove={removeIngr} />
      </div>
    )
  }

}