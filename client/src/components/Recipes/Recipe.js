import React from 'react'
import { render } from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import { v4 } from 'uuid'
import '../../stylesheets/Recipe.css'
import App from '../App.js'
import NutritionCard from '../NutritionInfo.js'
import IngredientCard from '../Ingredients/IngredientInfo.js'
import Header from '../Header.js'
import { Carousel, Figure, Card, Button, ButtonGroup, Row, ListGroup } from 'react-bootstrap'

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

const RecipeStub = ({ data, callback=f=>f }) => (
    <>
        <ListGroup>
            <ListGroup.Item>{data.readyInMinutes} minutes</ListGroup.Item>
            <ListGroup.Item>Health Score: {data.healthScore}</ListGroup.Item>
            <ListGroup.Item>Cost per serving: {data.pricePerServing}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
            <Button variant="primary" onClick={() => getRecipeWindow(data, callback)}>See Recipe Details</Button>
        </Card.Footer>
    </>
)

const getRecipeWindow = (data, callback) => {
    render (
        <>
            <App />
            <InfoCarousel data={data} callback={callback} />
        </>,
        document.getElementById('root')
    )
}

export {
    InfoCarousel,
    RecipeStub
}