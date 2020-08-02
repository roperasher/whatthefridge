import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { v4 } from 'uuid'
import '../stylesheets/Recipe.css'
import App from './App.js'
import DataComponent from './DataComponent.js'
import NutritionCard from './NutritionInfo.js'
import IngredientCard from './IngredientInfo.js'
import Carousel from 'react-bootstrap/Carousel'

const Recipe = ({ id, onExit=f=>f }) => {
    class Recipe extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: false,
                loaded: false
            }
        }

        render() {
            return(
                <div className="recipe">
                    <button onClick={() => onExit(id)}>X</button>
                </div>
            )
        }
    }
}

const InfoCarousel = ({ data }) => {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <h2>{data.title}</h2>
                <figure>
                    <img id={`recipe ${data.id}`} src={`${data.image}`} alt={`${data.title}`}></img>
                </figure>
                <p>{ReactHtmlParser(data.summary)}</p>
                <Carousel.Caption>
                    <h4>Slide for more information</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <NutritionCard id={`${data.id}`} />
            </Carousel.Item>
            <Carousel.Item>
                <IngredientCard id={`${data.id}`} />
            </Carousel.Item>
        </Carousel>
    )
}

const RecipeStub = ({ data }) => (
    <div className="recipe-stub">
        <h4>{data.title}</h4>
        <p>{data.readyInMinutes} minutes</p><br></br>
        <p>Health Score: {data.healthScore}</p><br></br>
        <p>Cost per serving: {data.pricePerServing}</p><br></br>
    </div>
)

export {
    InfoCarousel,
    Recipe,
    RecipeStub
}