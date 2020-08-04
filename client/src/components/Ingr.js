import React from 'react'
import PropTypes from 'prop-types'
import { Toast, Button, Card } from 'react-bootstrap'
import '../stylesheets/Ingr.css'

export default class Ingr extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageName: "",
            loading: false,
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        const imageURL = imageName => "https://spoonacular.com/cdn/ingredients_100x100/" + imageName
        const req = "https://api.spoonacular.com/food/ingredients/" + this.props.ID + "/information?apiKey=79acef64ea6448bd9440a28073b99d69"
        fetch(req)
            .then(res => res.json())
            .then(ingr => this.setState({
                imageName: imageURL(ingr.image),
                loading: false,
                loaded: true
            }))
    }

    render() {
        return( 
            (this.state.loaded) ?
                <Card className="justify-content-md-center">
                    <Card.Img variant="top" src={this.state.imageName} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                    </Card.Body>
                    <Button onClick={this.props.onRemove}>Remove Ingredient</Button>
                </Card> : ""
        )
    }
}   