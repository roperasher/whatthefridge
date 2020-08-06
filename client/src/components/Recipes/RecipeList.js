import React from 'react'
import { v4 } from 'uuid'
import DataComponent from '../DataComponent.js'
import { RecipeStub } from './Recipe.js'
import { Card, CardColumns, ListGroup, Button } from 'react-bootstrap'
import '../../stylesheets/RecipeList.css'

const requestString = id => "http://localhost:5000/data/recipe/searchRecipeID/?id=" + id 

const RecipeList = ({ data, callback=f=>f }) => {

    return (
        <CardColumns id="recipe-list">
            {data.map((recipe, i) => {
                const addRecipe = (title, id) => {
                    callback(title, id)
                }
                const RecipeInfo = 
                    DataComponent(
                        RecipeStub,
                        requestString(recipe.id),
                        true,
                        recipe.id,
                        addRecipe
                    )
                return (
                    <Card className="w-100 p-3 mb-5 text-*-justify text-nowrap" key={i} bg={(i%1===0) ? 'info' : 'light'}
                        text={(i%2===0) ? 'dark' : 'white'}>
                        <Card.Header>{recipe.title}</Card.Header>
                        <Card.Body>
                            <Button variant="secondary" onClick={addRecipe}>Add to Recipes</Button>
                            <ListGroup>
                                <ListGroup.Item eventKey={v4()}>Ingredients Used: {recipe.usedIngredientCount}</ListGroup.Item>
                                <ListGroup.Item eventKey={v4()}>Ingredients Needed: {recipe.missedIngredientCount}</ListGroup.Item>
                            </ListGroup>
                            <RecipeInfo />
                        </Card.Body>
                    </Card>
                )
            })}
        </CardColumns>
    )
}

export default RecipeList

    