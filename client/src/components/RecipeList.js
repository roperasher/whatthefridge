import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import DataComponent from './DataComponent.js'

const RecipeList = ({ data }) => (
    console.log(...data),
    <div className="recipe-list">
        {data.map(({title, id}, i) =>
            <div key={i} >{title} recipeId={id}</div>
        )}
    </div>
)

export default RecipeList
    