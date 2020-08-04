import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import '../stylesheets/IngrList.css'
import App from './App.js'
import Ingr from './Ingr.js'
import RecipeList from './RecipeList.js'
import DataComponent from './DataComponent.js'
import Toast from 'react-bootstrap/Toast'

const IngrList = ({ ingredients=[], onRemove=f=>f }) => (
    <div className="ingr-list">
        {(ingredients.length === 0) ? 
            <p>No ingredients in fridge</p> :
            ingredients.map(ingr =>
                <Ingr
                    key={ingr.id} 
                    name={ingr.name}
                    ID={ingr.ID} 
                    onRemove={() => onRemove(ingr.id)} 
                />
            )
        }
    </div>
)

IngrList.propTypes = {
    ingredients: PropTypes.array,
    onRemove: PropTypes.func
}

const recipeSearch = (...ingrs) => {
    const requestString = "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" + ingrs.map(ingr => ingr.name).join('%2C') + "&number=5&ranking=1" 
    const RecipeDash = 
        DataComponent(
            RecipeList,
            requestString,
            true,
            null
        )
    render (
        <>
            <App />
            <IngrList ingredients={ingrs} />
            <RecipeDash />
        </>,
        document.getElementById('root')
    )
}

// TODO: Get toasts to stack and close with button
const NewIngrNotification = ({ name }) => {
    let [show, setShow] = useState(true)
    return(
        <Toast onClose={() => setShow(false)} delay={3000} autohide={true} show={show}>
            <Toast.Header>
            <strong className="mr-auto">New Ingredient</strong>
            </Toast.Header>
            <Toast.Body>{`Added ${name} to fridge`}</Toast.Body>
        </Toast>
    )
}

export {
    IngrList,
    NewIngrNotification
}