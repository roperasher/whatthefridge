import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DataComponent from './DataComponent.js'
import App from './App.js'
import { Recipe, RecipeStub } from './Recipe.js'
import '../stylesheets/RecipeList.css'

const requestString = id => "http://localhost:5000/data/recipe/searchRecipeID/?id=" + id

const RecipeList = ({ data }) => {
    //const [recipes, setRecipes] = useState([])
    return (
        <div className="recipe-list">
            {(data.results).map((recipe, i) => {
                const RecipeInfo = 
                    DataComponent(
                        RecipeStub,
                        requestString(recipe.id),
                        true,
                        recipe.id
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
            true,
            id
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
    