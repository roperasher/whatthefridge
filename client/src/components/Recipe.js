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
import { Carousel, Figure, Image, Card, Button } from 'react-bootstrap'

const requestString = id => "http://localhost:5000/data/recipe/searchRecipeID/?id=" + id 

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
        const data = this.props
        return(
            <Carousel id="infoCarousel" activeIndex={index} onSelect={handleSelect} autoplay={false}>
                <Carousel.Item className="justify-content-md-center">
                    <h3>{data.title}</h3>
                    <Figure>
                        <Image id={"recipe" + data.id} src={data.image} alt={data.title} fluid={"true"} ></Image>
                        <Figure.Caption>{ReactHtmlParser(data.summary)}</Figure.Caption>
                    </Figure>
                    <Carousel.Caption>
                        <h4>Slide for more information</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="justify-content-md-center">
                    <NutritionCard className="d-block w-75" id={data.id} />
                    <Carousel.Caption>
                        <h3>Nutrition facts for {data.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="justify-content-md-center">
                    <IngredientCard className="d-block w-75" id={data.id} />
                </Carousel.Item>
            </Carousel>
        )
    }
}

const RecipeStub = ({ data }) => (
    <>
        <p>{data.readyInMinutes} minutes</p>
        <p>Health Score: {data.healthScore}</p>
        <p>Cost per serving: {data.pricePerServing}</p>
        <Card.Footer>
            <Button variant="primary" onClick={() => getRecipeWindow(data)}>See Recipe Details</Button>
        </Card.Footer>
    </>
)

const getRecipeWindow = (data) => {
    render (
        <>
            <App />
            <InfoCarousel {...data} />
        </>,
        document.getElementById('root')
    )
}

export {
    InfoCarousel,
    Recipe,
    RecipeStub
}