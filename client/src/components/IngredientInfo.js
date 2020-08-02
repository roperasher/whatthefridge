import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import App from './App.js'

const IngredientInfo = ({ data }) => (
    data = data.replace(/onmouseover/g, "onMouseOver").replace(/onmouseout/g, "onMouseOut")
            .replace(/onclick/g, "onClick").replace(/onchange/g, "onChange"),
    <div className="ingredient-widget">
        {ReactHtmlParser(data)}
    </div>
)

const IngredientCard = ({ id }) => {
    var requestString = "http://localhost:5000/data/recipe/visualizeRecipeByIngredientsID/?id=" + id + "&defaultCss=" + true
    const IngredientDash = 
        DataComponent(
            IngredientInfo,
            requestString,
            false,
            id
        )
    return <IngredientDash />
}

export default IngredientCard