import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import App from './App.js'
import Card from './Card.js'
import '../stylesheets/IngredientInfo.css'

const IngredientViz = ({ data }) => {
    <div className="ingredient-widget">
        {ReactHtmlParser(data)}
    </div>
}

const IngredientsNeeded = () => {

}

const ProductInfo = () => {

}

const IngredientInfo = (id) =>  
    Card(
        [IngredientViz, IngredientsNeeded, ProductInfo],
        id
    )
export default IngredientInfo