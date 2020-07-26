import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import '../stylesheets/NutritionInfo.css'

const NutritionInfo = ({data}) => (
    console.log(data),
    <div className="nutrition-widget">
        {ReactHtmlParser(data)}
    </div>
)

export default NutritionInfo