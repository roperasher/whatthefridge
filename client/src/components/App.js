import React, { useState } from 'react'
import { render } from 'react-dom'
import { v4 } from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/App.css'
import SearchBar from './SearchBar'
import RecipeList from './RecipeList'
import { IngrList, NewIngrNotification } from './IngrList'
import DataComponent from './DataComponent'
import { Card, Accordion, Button } from 'react-bootstrap'

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      recipes: []
    }
    this.addIngr = this.addIngr.bind(this)
    this.removeIngr = this.removeIngr.bind(this)
    this.recipeSearch = this.recipeSearch.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
  }

  addIngr(ingr) {
    const [name, ID] = ingr.split(' ')
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        {
          id: v4(),
          name,
          ID
        }
      ],
      recipes: prevState.recipes
    }))
    render(
      <>
        <App />
        <div 
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'relative', minHeight: '200px',}}>
          <div style={{ position: 'absolute', top: 0, right: 0, }}>
            <NewIngrNotification name={name} />
          </div>
        </div>
      </>,
      document.getElementById('root')
    )
  }

  removeIngr(id) {
    this.setState(prevState => ({
      ingredients: prevState.ingredients.filter(ingr => ingr.id !== id),
      recipes: prevState.recipes
    }))
  }

  recipeSearch(...ingrs) {
    const requestString = "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" + ingrs.map(ingr => ingr.name.replace(' ', '%2C')).join(',') + "&number=5&ranking=1" 
    console.log(requestString)
    const RecipeDash = 
        DataComponent(
            RecipeList,
            requestString,
            true,
            null
        )
    render (
        <>
            <App />
            <RecipeDash />
        </>,
        document.getElementById('root')
    )
  }

  addRecipe = () => {}

  removeRecipe = () => {}

  render() {
    const { addIngr, removeIngr, recipeSearch, addRecipe, removeRecipe } = this
    const { ingredients, recipes } = this.state
    return (
      <div className="app">
        <SearchBar onNewIngr={addIngr} onSearch={() => recipeSearch(...ingredients)} />
        <Accordion defaultActiveKey="0">
          <Card>
              <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      All Ingredients
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                  <Card.Body><IngrList ingredients={ingredients} onRemove={removeIngr} /></Card.Body>
              </Accordion.Collapse>
          </Card>
        </Accordion> 
      </div>
    )
  }

}