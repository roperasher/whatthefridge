import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import '../stylesheets/NutritionInfo.css'

const NutritionInfo = ({ data }) => (
    data = data.replace(/onmouseover/g, "onMouseOver").replace(/onmouseout/g, "onMouseOut")
            .replace(/onclick/g, "onClick").replace(/onchange/g, "onChange"),
    <div className="nutrition-widget">
        {ReactHtmlParser(data)}
    </div>
)

const NutritionCard = ({ id }) => {
    var requestString = "http://localhost:5000/data/nutrition/visualizeRecipeNutritionByID/?id=" + id + "&defaultCss=" + true
    const NutritionDash = 
        DataComponent(
            NutritionInfo,
            requestString,
            false,
            id
        )
    return <NutritionDash />
}

export default NutritionCard