import React from 'react'
import DataComponent from '../DataComponent.js'
import { RecipeStub } from './Recipe.js'
import { Card, CardDeck, ListGroup } from 'react-bootstrap'
import '../../stylesheets/RecipeList.css'

const requestString = id => "http://localhost:5000/data/recipe/searchRecipeID/?id=" + id 

const RecipeList = ({ data }) => {
    return (
        <CardDeck id="recipe-list">
            {data.map((recipe, i) => {
                const RecipeInfo = 
                    DataComponent(
                        RecipeStub,
                        requestString(recipe.id),
                        true,
                        recipe.id
                    )
                return (
                    <Card className="w-100 p-3 mb-5 text-*-center text-nowrap" key={i} bg={(i%2===0) ? 'info' : 'light'}
                        text={(i%2===0) ? 'white' : 'dark'}>
                        <Card.Header>{recipe.title}</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>Ingredients Used: {recipe.usedIngredientCount}</ListGroup.Item>
                                <ListGroup.Item>Ingredients Needed: {recipe.missedIngredientCount}</ListGroup.Item>
                            </ListGroup>
                            <RecipeInfo />
                        </Card.Body>
                    </Card>
                )
            })}
        </CardDeck>
    )
}

export default RecipeList

    