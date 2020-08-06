import React, { useState, useRef } from 'react'
import { render } from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import { v4 } from 'uuid'
import '../../stylesheets/Recipe.css'
import App from '../App.js'
import NutritionCard from '../NutritionInfo.js'
import IngredientCard from '../Ingredients/IngredientInfo.js'
import Header from '../Header.js'
import { Carousel, Figure, Card, Button, ButtonGroup, Row, ListGroup, Overlay } from 'react-bootstrap'

class InfoCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            carouselOpen: true
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.onExit = this.onExit.bind(this)
        this.onRecipeAdd = this.onRecipeAdd.bind(this)
    }

    componentWillUnmount() {
        console.log("InfoCarousel unmounted")
    }

    handleSelect = (selectedIndex, e) => {
        this.setState(prevState => ({
            index: (prevState.index+1)%3
        }))
    }

    onRecipeAdd = (e) => {
        this.props.callback(this.props.data.title, this.props.data.id)
    }

    onExit = (e) => {
        this.setState(prevState => ({
            carouselOpen: false
        }))
    }

    render() {
        const { handleSelect, onExit, onRecipeAdd } = this
        const { index, carouselOpen } = this.state
        const data = this.props.data
        return(
            carouselOpen &&
            <>
                <Row className="justify-content-md-center"> 
                    <ButtonGroup>
                        <Button
                            type="button"
                            variant="primary"
                            aria-label={`Add ${data.title} to recipes`}
                            onClick={onRecipeAdd}>
                                Add Recipe to List
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            aria-label="Back to recipes"
                            onClick={onExit}>
                                Back to Recipes
                        </Button>
                    </ButtonGroup>
                </Row>
                <Carousel id="infoCarousel" activeIndex={index} onSelect={handleSelect} interval={500000}>
                    <Carousel.Item className="justify-content-md-center">
                        <Row className="justify-content-md-center">
                            <h3>{data.title}</h3>
                        </Row> 
                        <Row className="justify-content-md-center">
                            <Figure className="d-block w-75">
                                <Figure.Image 
                                    className="d-block w-100"
                                    id={"recipe" + data.id} 
                                    src={data.image} 
                                    alt={data.title} 
                                    fluid={true} ></Figure.Image>
                                <Figure.Caption>{ReactHtmlParser(data.summary)}</Figure.Caption>
                            </Figure>
                        </Row>
                        <Carousel.Caption>
                            <h3>Slide for more information</h3>
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
                        <Carousel.Caption>
                            <h3>Ingredients for {data.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </>
        )
    }
}

const RecipeStub = ({ data, callback=f=>f }) => {
    const [show, setShow] = useState(false)
    const target = useRef(null)
    return(
        <>
            <ListGroup>
                <ListGroup.Item>{data.readyInMinutes} minutes</ListGroup.Item>
                <ListGroup.Item>Health Score: {data.healthScore}</ListGroup.Item>
                <ListGroup.Item>Cost per serving: {data.pricePerServing}</ListGroup.Item>
            </ListGroup>
            <Card.Footer>
                <Button variant="primary" ref={target} onClick={() => setShow(true)}>See Recipe Details</Button>
                <Overlay target={target.current} show={show} placement="top">
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        top: '40%',
                        ...props.style,
                        }}
                    >
                        <InfoCarousel data={data} callback={callback} />
                    </div>
                    )}
                </Overlay>
            </Card.Footer>
        </>
    )
}

const getRecipeWindow = (data, callback) => {
    render (
        <>
            
            <InfoCarousel data={data} callback={callback} />
        </>,
        document.getElementById('root')
    )
}

export {
    InfoCarousel,
    RecipeStub
}