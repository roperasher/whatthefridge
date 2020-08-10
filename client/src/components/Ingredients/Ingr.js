import React from 'react'
import { Button, Card, Modal, Figure } from 'react-bootstrap'
import '../../stylesheets/Ingr.css'
import IngredientNutritionDetails from './IngredientDetails.js'

export default class Ingr extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageName: "",
            loading: false,
            loaded: false,
            show: false,
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true })
        const imageURL = imageName => "https://spoonacular.com/cdn/ingredients_100x100/" + imageName
        this.setState({
                imageName: imageURL(this.props.image),
                loading: false,
                loaded: true
        })
    }

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    showModal() {
        this.setState({ show: true })
    }

    hideModal() {
        this.setState({ show: false })
    }

    render() {
        return( 
            (this.state.loaded) ?
                <Card className="justify-content-md-center" onClick={() => this.handleModal()}>
                <Modal
                    show={this.state.show}
                    onHide={() => this.hideModal()}
                    aria-labelledby="contained-modal-title-vcenter"
                    center
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Figure className="ingredient-image">
                            <Figure.Image 
                                width={150}
                                height={150}
                                alt="150x150"
                                src={this.state.imageName} 
                                fluid={true}
                            ></Figure.Image>
                        </Figure>
                        <IngredientNutritionDetails className={"ingredient-nutrition-details"} name={this.props.name} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.hideModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                    <Card.Img variant="top" src={this.state.imageName} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                    </Card.Body>
                    <Button onClick={this.props.onRemove}>Remove Ingredient</Button>
                </Card> : ""
        )
    }
}   