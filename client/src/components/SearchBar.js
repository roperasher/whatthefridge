import React from 'react'
import PropTypes from 'prop-types'
import '../SearchBar.css'

const SearchBar = ({onNewIngr=f=>f}) => {

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
            <button>ADD INGREDIENT</button>
        </form>
    )
}

SearchBar.propTypes = {
    onNewIngr: PropTypes.func
}

export default SearchBar