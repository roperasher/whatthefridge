import React from 'react'
import { render } from 'react-dom'
import { v4 } from 'uuid'
import '../stylesheets/App.css'
import SearchBar from './SearchBar'
import RecipeList from './RecipeList'
import IngrList from './IngrList'
import DataComponent from './DataComponent'

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

  recipeSearch(...ingrs) {
    const requestString = "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" + ingrs.map(ingr => ingr.name).join('%2C') + "&number=5&ranking=1" 
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