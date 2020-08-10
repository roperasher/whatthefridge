import React, { useState, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import '../../stylesheets/Recipe.css'
import NutritionCard from '../NutritionInfo.js'
import IngredientCard from '../Ingredients/IngredientInfo.js'
import { Carousel, Figure, Card, Button, ButtonGroup, Row, ListGroup, Modal } from 'react-bootstrap'

// Carousel component that opens as a modal to display recipe details
// Three slides: Recipe summary and image, nutrition, and ingredient information
class InfoCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            carouselOpen: true
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.onRecipeAdd = this.onRecipeAdd.bind(this)
        this.onRecipeRemove = this.onRecipeRemove.bind(this)
    }

    handleSelect = (selectedIndex, e) => {
        this.setState(prevState => ({
            index: (prevState.index+1)%3
        }))
    }

    onRecipeAdd = () => {
        this.props.callback(this.props.data.title, this.props.data.id, this.props.data.missedIngredients)
    }

    onRecipeRemove = () => {
        this.props.callback(this.props.data.title, this.props.data.id, this.props.data.missedIngredients)
    }
    
    render() {
        const { handleSelect, onRecipeAdd, onRecipeRemove } = this
        const { index, carouselOpen } = this.state
        const data = this.props.data
        return(
            carouselOpen &&
            <>
                <Modal 
                    show={this.props.show} 
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    center
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {data.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel id="infoCarousel" activeIndex={index} onSelect={handleSelect} interval={500000}>
                            <Carousel.Item className="justify-content-md-center">
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
                                    <h3>Nutrition facts</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item className="justify-content-md-center">
                                <IngredientCard className="d-block w-75" id={data.id} missedIngredients={data.missedIngredients} />
                                <Carousel.Caption>
                                    <h3>Ingredients</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
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
                                aria-label={`Remove ${data.title} from recipes`}
                                onClick={onRecipeRemove}>
                                    Remove Recipe from List
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                aria-label="Back to recipes"
                                onClick={this.props.onHide}>
                                    Back to Recipes
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

// Small component used for recipe stubs within RecipeList component
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
                <InfoCarousel show={show} onHide={() => setShow(false)} data={data} callback={callback} />
            </Card.Footer>
        </>
    )
}

export {
    InfoCarousel,
    RecipeStub
}