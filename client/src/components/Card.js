import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import '../stylesheets/Card.css'
import DataComponent from './DataComponent'

const Card = (defaultComponents, recipeID) => 
    class Card extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                Components: defaultComponents,
                id: recipeID
            }
            this.addComponent.bind(this)
            this.removeComponent.bind(this)
            this.exitCard.bind(this)
        }

        componentDidMount() {

        }

        componentWillUpdate() {

        }

        addComponent(component) {

        }

        removeComponent(component) {

        }

        exitCard() {

        }

        render() {
            const { components, id } = this.state
            return (
                <div className="card-container">
                    {components.map((Component) => (
                        <Component onAdd={addComponent} onRemove={removeComponent} key={Component.id} /> 
                    ))}
                </div>
            )
        }
}

Card.PropTypes = {
    defaultComponents: PropTypes.array,
    recipeID: PropTypes.number
}

export default Card