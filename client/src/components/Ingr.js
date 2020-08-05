import React from 'react'
import { Button, Card } from 'react-bootstrap'
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
        this.setState({
                imageName: imageURL(this.props.image),
                loading: false,
                loaded: true
        })
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