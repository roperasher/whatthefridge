import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/Ingr.css'

const Ingr = ({ name, onRemove=f=>f }) =>
    <section className="ingr">
        <h1>{name}</h1>
        <button onClick={onRemove}>X</button>
    </section>

Ingr.propTypes = {
    name: PropTypes.string.isRequired,
    onRemove: PropTypes.func
}

export default Ingr