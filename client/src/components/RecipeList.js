import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DataComponent from './DataComponent.js'
import App from './App.js'
import Recipe from './Recipe.js'
import '../stylesheets/RecipeList.css'

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

const RecipeList = ({ data }) => (
    <div className="recipe-list">
        {data.map(({title, id}, i) =>
            <div className="recipe" key={i} onClick={() => getRecipeInfo(id)}>{title} recipeId={id}</div>
        )}
    </div>
)

const getRecipeInfo = id => {
    let REQ_TYPE = id + "/information"
    const requestString = "https://api.spoonacular.com/recipes/" + REQ_TYPE + API_KEY 
    const RecipeWindow = 
        DataComponent(
            Recipe,
            requestString,
            true
        )
    render (
        <>
            <App />
            <RecipeWindow />
        </>,
        document.getElementById('root')
    )
}

export default RecipeList
    