import React from 'react'
import { render } from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import '../../stylesheets/Recipe.css'
import App from '../App.js'
import NutritionCard from '../NutritionInfo.js'
import IngredientCard from '../Ingredients/IngredientInfo.js'
import { Carousel, Figure, Card, Button, Row, ListGroup } from 'react-bootstrap'

class InfoCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            carouselOpen: true
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.onExit = this.onExit.bind(this)
    }

    handleSelect = (selectedIndex, e) => {
        this.setState(prevState => ({
            index: (prevState.index+1)%3
        }))
    }

    onExit = (e) => {
        this.setState(prevState => ({
            carouselOpen: false
        }))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.carouselOpen !== nextState.carouselOpen
    }

    render() {
        const { handleSelect, onExit } = this
        const { index, carouselOpen } = this.state
        const data = this.props
        console.log(carouselOpen)
        return(
            carouselOpen &&
            <>
                <Carousel id="infoCarousel" activeIndex={index} onSelect={handleSelect} interval={500000}>
                    <Button
                        type="button"
                        className="close" 
                        aria-label="Close" 
                        onClick={onExit}>
                        Back to Recipes
                    </Button>
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

const RecipeStub = ({ data }) => (
    <>
        <ListGroup>
            <ListGroup.Item>{data.readyInMinutes} minutes</ListGroup.Item>
            <ListGroup.Item>Health Score: {data.healthScore}</ListGroup.Item>
            <ListGroup.Item>Cost per serving: {data.pricePerServing}</ListGroup.Item>
        </ListGroup>
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
    RecipeStub
}