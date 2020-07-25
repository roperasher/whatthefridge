import React from 'react'
import PropTypes from 'prop-types'
import '../IngrList.css'
import Ingr from './Ingr.js'
import RecipeList from './RecipeList.js'

const IngrList = ({ ingredients=[], onRemove=f=>f }) =>
    <div className="ingr-list">
        {(ingredients.length === 0) ? 
            <p>No ingredients in fridge</p> :
            ingredients.map(ingr =>
                <Ingr key={ingr.id}
                    {...ingr}
                    onRemove={() => onRemove(ingr.id)} />
            )
            <button onClick={ingredients => recipeSearch(ingredients)}>Search Recipes</button>
        }
    </div>

IngrList.propTypes = {
    ingredients: PropTypes.array,
    onRemove: PropTypes.func
}

const recipeSearch = data => {
    let REQ_TYPE = "findByIngredients"
    return (
        <RecipeList params={data} req={REQ_TYPE} /> 
    )

}

export default IngrList