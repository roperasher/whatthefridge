import React from 'react';
import { v4 } from 'uuid'
import '../stylesheets/App.css';
import SearchBar from './SearchBar'
import IngrList from './IngrList'

const API_KEY = process.env.REACT_APP_API_KEY

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      ingredients: []
    }
    this.addIngr = this.addIngr.bind(this)
    this.removeIngr = this.removeIngr.bind(this)
  }

  addIngr(name) {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        {
          id: v4(),
          name
        }
      ]
    }))
  }

  removeIngr(id) {
    this.setState(prevState => ({
      ingredients: prevState.ingredients.filter(ingr => ingr.id !== id)
    }))
  }

  render() {
    const { addIngr, removeIngr } = this
    const { ingredients } = this.state
    return (
      <div className="app">
        <SearchBar onNewIngr={addIngr} />
        <IngrList ingredients={ingredients}
                  onRemove={removeIngr} />
      </div>
    )
  }

}