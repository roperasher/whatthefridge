import React, { useState } from 'react'
import { Button, Card, Figure } from 'react-bootstrap'
import DataComponent from '../DataComponent.js'
import parse from 'react-html-parser'

/*
const IngredientDetails = (props, handleClose) => {
  return(
    <div>
      <h1>{props.name}</h1>
      <h1>{props.imageName}</h1>
      <Button onclick={handleClose}>close</Button>
    </div>
  )
}

export default IngredientDetails
class IngredientDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>helooooooowwwww</h1>
        <Card.Img src={this.props.data} />
      </div>
    )
  }
}
*/

const IngredientDetails = ({ data }) =>{ 
  return(
    <>
      <div>
        {parse(data)}
      </div>
    </>
  )
}


const IngredientNutritionDetails = ({ className, name }) => {
  var requestString = "http://localhost:5000/data/product/visualizeProductNutritionByID?query=" + name 
  const IngredientNutrition = 
      DataComponent(
          IngredientDetails,
          requestString,
          false,
          null, 
      )
  return <IngredientNutrition className={className}/>
}

export default IngredientNutritionDetails