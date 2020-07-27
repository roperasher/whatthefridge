import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { v4 } from 'uuid'
import '../stylesheets/Recipe.css'
import App from './App.js'
import DataComponent from './DataComponent.js'
import NutritionInfo from './NutritionInfo.js'

const API_KEY = "?apiKey=79acef64ea6448bd9440a28073b99d69";
//const API_KEY = "?apiKey=dde837ff31b949bfbe0cff7f7dfca926"; //Asher's API key

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
            let REQ_TYPE = "/nutritionWidget"
            const requestString = "https://api.spoonacular.com/recipes/" + id + REQ_TYPE + API_KEY + "&defaultCss=true"
            const NutritionDash = 
                DataComponent(
                    NutritionInfo,
                    requestString,
                    false
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