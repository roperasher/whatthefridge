import React from 'react'
import { v4 } from 'uuid'
import DataComponent from '../DataComponent.js'
import { RecipeStub } from './Recipe.js'
import { Card, CardColumns, ListGroup, Button } from 'react-bootstrap'
import '../../stylesheets/RecipeList.css'

const requestString = id => "http://localhost:5000/data/recipe/searchRecipeID/?id=" + id 

class RecipeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            visible: [],
            userRecipes: false,
        }
        this.removeRecipe = this.removeRecipe.bind(this)
        this.addRecipe = this.addRecipe.bind(this)
        this.recipeSaved = this.recipeSaved.bind(this)
    }

    componentDidMount() {
        var data = JSON.parse(JSON.stringify(this.props.data))
        var savedRecipes = (this.props.userRecipes) ? data : ((data[1]) ? data[1] : [])
        this.setState({
            recipes: savedRecipes,
            visible: (data.length === 1) ? data : data[0],
            userRecipes: (this.props.userRecipes) ? true : false
        })
    }

    recipeSaved = (id) => {
        return (this.state.recipes.length !== 0) ? 
                this.state.recipes.some(recipe => recipe.id === id) :
                false
    }

    removeRecipe = (name, id, missedIngredients) => {
        if(this.recipeSaved(id))
            this.setState(prevState => ({
                recipes: prevState.recipes.filter((recipe) => recipe.id !== id),
            }))
        this.props.callback[1](name, id, missedIngredients)
    }

    addRecipe = (title, id, missedIngredients) => {
        if(!this.recipeSaved(id))
            this.setState(prevState => ({ 
                recipes: [
                ...prevState.recipes,
                {
                    title,
                    id,
                    missedIngredients
                }
                ],
            }))
        this.props.callback[0](title, id, missedIngredients)
    }

    render() {
        const { removeRecipe, addRecipe, recipeSaved } = this
        const userRecipes = this.state.userRecipes
        const data = (userRecipes) ? this.state.recipes : this.state.visible
        return (
            <React.Fragment>
                {userRecipes && <h3>Your Recipes</h3>}
                <CardColumns id="recipe-list">
                    {data.map((recipe, i) => {
                        const missedIngredients = {
                            missedIngredients: recipe.missedIngredients
                        }
                        const recipeStubCallback = (
                            recipeSaved(recipe.id) ? removeRecipe : addRecipe
                        )
                        const RecipeInfo = 
                            DataComponent(
                                RecipeStub,
                                requestString(recipe.id),
                                true,
                                recipe.id,
                                recipeStubCallback,
                                missedIngredients
                            )
                        return (
                            <Card className="w-100 p-3 mb-5 text-*-justify text-nowrap" key={i} bg={(i%2===0) ? 'info' : 'light'} text="dark">
                                <Card.Header>{recipe.title}</Card.Header>
                                <Card.Body>
                                    {(userRecipes || recipeSaved(recipe.id)) ? 
                                        <Button variant="secondary" onClick={() => removeRecipe(recipe.title, recipe.id, recipe.missedIngredients)}>Remove from Recipes</Button> :
                                        <Button variant="secondary" onClick={() => addRecipe(recipe.title, recipe.id, recipe.missedIngredients)}>Add to Recipes</Button>
                                    }
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
            </React.Fragment>
        )
    }
}

export default RecipeList

    