import React from 'react'
import { Button, Card } from 'react-bootstrap'
import '../../stylesheets/Ingr.css'

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

    showModal() {
        this.setState({ show: true })
    }

    hideModal() {
        this.setState({ show: false })
    }

    render() {
        return( 
            (this.state.loaded) ?
                <Card className="justify-content-md-center" onclick={this.showModal}>
                <Modal
                    show={this.state.show}
                    onHide={this.hideModal}
                    size="small"
                    aria-labelledby="contained-modal-title-vcenter"
                    center
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card.Img src={this.state.imageName} />
                        <IngredientNutritionDetails name={this.props.name} />
                    </Modal.Body>
                    <Modal.Footer>
                        <IngredientNutritionDetails name={this.props.name} />
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