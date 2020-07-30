import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import '../stylesheets/IngrList.css'
import App from './App.js'
import Ingr from './Ingr.js'
import RecipeList from './RecipeList.js'
import DataComponent from './DataComponent.js'

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
    </div>
)

IngrList.propTypes = {
    ingredients: PropTypes.array,
    onRemove: PropTypes.func
}

const recipeSearch = (...ingrs) => {
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

export default IngrList