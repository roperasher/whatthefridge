import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { v4 } from 'uuid'
import '../stylesheets/Recipe.css'
import App from './App.js'
import DataComponent from './DataComponent.js'
import NutritionInfo from './NutritionInfo.js'
import IngredientInfo from './IngredientInfo.js'

const Recipe = ({ data, onExit=f=>f, selected="" }) => (
    <div className="recipe">
        <button onClick={() => onExit(data.id)}>X</button>
        <div className="options">
            <select className="recipeOptions" value={selected} onChange={(e) => handleChange(e.target.value, data.id)}>
                <option key={v4()} value=""></option>
                <option key={v4()} value="Nutrition">Nutrition Stats</option>
                <option key={v4()} value="Instructions">Recipe Instructions</option>
                <option key={v4()} value="Ingredients">Ingredients</option>
            </select>
        </div>
        <h2>{data.title}</h2>
        <figure>
            <img id={`recipe ${data.id}`} src={`${data.image}`} alt={`${data.title}`}></img>
        </figure>
        <p>{ReactHtmlParser(data.summary)}</p>
    </div>
)

const RecipeStub = ({ data }) => (
    console.log(data),
    <div className="recipe-stub">
        <h4>{data.title}</h4>
        <p>{data.readyInMinutes} minutes</p><br></br>
        <p>Health Score: {data.healthScore}</p><br></br>
        <p>Cost per serving: {data.pricePerServing}</p><br></br>
    </div>
)

const handleChange = (selected, id) => {
    switch(selected) {

        case "Nutrition":
            const requestString = id => "http://localhost:5000/data/nutrition/visualizeRecipeNutritionByID/?id=" + id + "&defaultCss=" + true
            const NutritionDash = 
                DataComponent(
                    NutritionInfo,
                    requestString(id),
                    false,
                    id
                )
            render (
                <>
                    <App />
                    <NutritionDash />
                </>,
                document.getElementById('root')
            )
            return true
        case "Instructions":
            return true
        case "Ingredients":
            const requestString = id => "http://localhost:5000/data/recipe/visualizeRecipeByIngredientsID/?id=" + id + "&defaultCss=" + true
            const IngredientsDash = 
                DataComponent(
                    IngredientInfo,
                    requestString(id),
                    false,
                    id
                )
            render (
                <>
                    <App />
                    <IngredientsDash />
                </>,
                document.getElementById('root')
            )
            return true
        default:
            render (
                <App />,
                document.getElementById('root')
            )
            return true
    }
}

export {
    Recipe,
    RecipeStub
}