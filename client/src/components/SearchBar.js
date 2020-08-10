import React from 'react'
import PropTypes from 'prop-types'
import "../stylesheets/SearchBar.css"
import Button from 'react-bootstrap/Button'

// Original search bar not used in final product
const SearchBar = ({ onNewIngr=f=>f, onSearch=f=>f }) => {
    let ingr_name
    
    const submit = e => {
        e.preventDefault()
        onNewIngr(ingr_name.value)
        ingr_name.value = ''
        ingr_name.focus() 
    }

    return (
        <form className="new-ingr" onSubmit={submit}>
            <input ref={input => ingr_name = input}
            type="text"
            placeholder="Enter Ingredients" require />
            <Button>Add Ingredient</Button>
            <Button onClick={onSearch}>Search Recipes</Button>
        </form>
    )
}

SearchBar.propTypes = {
    onNewIngr: PropTypes.func,
    onSearch: PropTypes.func
}

export default SearchBar