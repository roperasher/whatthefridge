import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import '../stylesheets/IngrList.css'
import App from './App.js'
import Ingr from './Ingr.js'
import RecipeList from './RecipeList.js'
import DataComponent from './DataComponent.js'

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

const IngrList = ({ ingredients=[], onRemove=f=>f }) => (
    <div className="ingr-list">
        {(ingredients.length === 0) ? 
            <p>No ingredients in fridge</p> :
            ingredients.map(ingr =>
                    <Ingr key={ingr.id}
                        {...ingr}
                        onRemove={() => onRemove(ingr.id)} />
            )
        }
        <button onClick={() => recipeSearch(...ingredients)}>Search Recipes</button> 
    </div>
)

IngrList.propTypes = {
    ingredients: PropTypes.array,
    onRemove: PropTypes.func
}

const recipeSearch = (...ingrs) => {
    let REQ_TYPE = "findByIngredients"
    const requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY + "&number=5&ranking=1&ingredients=" + ingrs.map(ingr => ingr.name).join('%2C')
    const RecipeDash = 
        DataComponent(
            RecipeList,
            requestString
        )
    render (
        <>
            <App />
            <RecipeDash />
        </>,
        document.getElementById('root')
    )
}

export default IngrList