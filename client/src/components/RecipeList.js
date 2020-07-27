import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DataComponent from './DataComponent.js'
import App from './App.js'
import { Recipe, RecipeStub } from './Recipe.js'
import '../stylesheets/RecipeList.css'

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key
const requestString = id => "https://api.spoonacular.com/recipes/" + id + "/information" + API_KEY 

const RecipeList = ({ data }) => {
    //const [recipes, setRecipes] = useState([])
    console.log(data)
    return (
        <div className="recipe-list">
            {data.map((recipe, i) => {
                const RecipeInfo = 
                    DataComponent(
                        RecipeStub,
                        requestString(recipe.id),
                        true
                    )
                return (
                    <div className="recipe" key={i} onClick={() => getRecipeWindow(recipe.id)}>
                        <RecipeInfo />
                    </div>
                )
            })}
        </div>
    )
}

const getRecipeWindow = id => {
    const RecipeWindow = 
        DataComponent(
            Recipe,
            requestString(id),
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
    