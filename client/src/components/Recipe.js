import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import '../stylesheets/Recipe.css'

const Recipe = ({data}) => (
    <div className="recipe">
        <h2>{data.title}</h2>
        <figure>
            <img id={`recipe ${data.id}`} src={`${data.image}`} alt={`${data.title}`}></img>
        </figure>
        <p>{ReactHtmlParser(data.summary)}</p>
    </div>
)

export default Recipe