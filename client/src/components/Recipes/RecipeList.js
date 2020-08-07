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
            userRecipes: false
        }
        this.removeRecipe = this.removeRecipe.bind(this)
    }

    componentDidMount() {
        this.setState({
            recipes: this.props.data,
            userRecipes: this.props.userRecipes
        })
    }

    componentWillUnmount() {
        console.log("RecipeList unmounted")
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.recipes.length !== nextProps.data.length
    }

    removeRecipe = (name, id) => {
        this.setState((prevState) => ({
            recipes: prevState.recipes.filter((recipe) => recipe.id !== id),
        }))
    }

    render() {
        const recipes = this.state.recipes
        const { removeRecipe } = this
        const { data, callback, userRecipes } = this.props
        return (
            <React.Fragment>
                {userRecipes && <h3>Your Recipes</h3>}
                <CardColumns id="recipe-list">
                    {data.map((recipe, i) => {
                        const RecipeInfo = 
                            DataComponent(
                                RecipeStub,
                                requestString(recipe.id),
                                true,
                                recipe.id,
                                callback
                            )
                        return (
                            <Card className="w-100 p-3 mb-5 text-*-justify text-nowrap" key={i} bg={(i%1===0) ? 'info' : 'light'} text="dark">
                                <Card.Header>{recipe.title}</Card.Header>
                                <Card.Body>
                                    {(userRecipes) ? <Button variant="secondary" onClick={() => removeRecipe(recipe.title, recipe.id)}>Remove from Recipes</Button> :
                                                <Button variant="secondary" onClick={() => callback(recipe.title, recipe.id)}>Add to Recipes</Button>}
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

    