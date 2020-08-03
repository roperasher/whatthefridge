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
import { Carousel, Figure } from 'react-bootstrap'

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

class InfoCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect = (selectedIndex, e) => {
        this.setState(prevState => ({
            index: (prevState.index+1)%3
        }))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        const { handleSelect } = this
        const { index } = this.state.index
        const data = this.props.data
        return(
            <Carousel className="infoCarousel" activeIndex={index} onSelect={handleSelect} autoplay="false" >
                <Carousel.Item >
                    <h2>{`${data.title}`}</h2>
                    <Figure>
                        <img className="d-block w-100" id={`recipe ${data.id}`} src={`${data.image}`} alt={`${data.title}`}></img>
                        <p>{ReactHtmlParser(data.summary)}</p>
                    </Figure>
                    <Carousel.Caption>
                        <h4>Slide for more information</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <NutritionCard className="d-block w-100" id={`${data.id}`} />
                    <Carousel.Caption>
                        <h3>Nutrition facts for {`${data.title}`}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <IngredientCard className="d-block w-100" id={`${data.id}`} />
                </Carousel.Item>
            </Carousel>
        )
    }
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