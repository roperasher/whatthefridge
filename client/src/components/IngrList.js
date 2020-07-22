import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import Ingr from './Ingr.js'

const IngrList = ({ ingredients=[], onRemove=f=>f }) =>
    <div className="ingr-list">
        {(ingredients.length === 0) ? 
            <p>No ingredients in fridge</p> :
            ingredients.map(ingr =>
                <Ingr key={ingr.id}
                    {...ingr}
                    onRemove={() => onRemove(ingr.id)} />
            )
        }
    </div>

IngrList.propTypes = {
    ingredients: PropTypes.array,
    onRemove: PropTypes.func
}

export default IngrList