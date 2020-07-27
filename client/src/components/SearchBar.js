import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/SearchBar.css'

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
            <button>Add Ingredient</button>
            <button onClick={onSearch}>Search Recipes</button> 
        </form>
    )
}

SearchBar.propTypes = {
    onNewIngr: PropTypes.func,
    onSearch: PropTypes.func
}

export default SearchBar