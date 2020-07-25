import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DataComponent from './DataComponent.js'

const RecipeList = ({ params, req }) => {
    const requestString = "https://api.spoonacular.com/recipes/" + req + "&number=5&ranking=1&ingredients=" + params.map(ingr => ingr + '%2C')
    const RecipeDash = 
        DataComponent(
            Recipes,
            requestString
        )
    render(
        <RecipeDash />,
        document.getElementById('root')
    )
}
    