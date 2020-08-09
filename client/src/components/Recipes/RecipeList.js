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
            data: [],
            userRecipes: false,
            loading: false
        }
        this.removeRecipe = this.removeRecipe.bind(this)
        this.addRecipe = this.addRecipe.bind(this)
        this.recipeAdded = this.recipeAdded.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Props: ", prevProps)
        console.log("State: ", prevState)
    }

    componentDidMount() {
        var data = JSON.parse(JSON.stringify(this.props.data))
        var savedRecipes = (this.props.userRecipes) ? data : []
        this.setState({
            recipes: savedRecipes,
            data,
            userRecipes: this.props.userRecipes
        })
    }

    recipeAdded = (id) => {
        console.log(id)
        console.log(this.state.recipes.some(recipe => recipe.id === id))
        return this.state.recipes.some(recipe => recipe.id === id)
    }

    removeRecipe = (name, id) => {
        this.setState({ loading: true })
        this.setState(prevState => ({
            recipes: prevState.recipes.filter((recipe) => recipe.id !== id),
            loading: false
        }), () => (!this.state.loading) ? this.props.callback(name, id) : "")
    }

    addRecipe = (title, id, missedIngredients) => {
        this.setState({ loading: true })
        this.setState(prevState => ({ 
            recipes: [
            ...prevState.recipes,
            {
                title,
                id,
                missedIngredients
            }
            ],
            loading: false
        }), () => (!this.state.loading) ? this.props.callback(title, id, missedIngredients) : "")
    }

    render() {
        const { removeRecipe, addRecipe, recipeAdded } = this
        const { userRecipes } = this.state
        const data = (userRecipes) ? this.state.recipes : this.state.data
        return (
            <React.Fragment>
                {userRecipes && <h3>Your Recipes</h3>}
                <CardColumns id="recipe-list">
                    {data.map((recipe, i) => {
                        const missedIngredients = {
                            missedIngredients: recipe.missedIngredients
                        }
                        const RecipeInfo = 
                            DataComponent(
                                RecipeStub,
                                requestString(recipe.id),
                                true,
                                recipe.id,
                                this.props.callback,
                                missedIngredients
                            )
                        return (
                            <Card className="w-100 p-3 mb-5 text-*-justify text-nowrap" key={i} bg={(i%2===0) ? 'info' : 'light'} text="dark">
                                <Card.Header>{recipe.title}</Card.Header>
                                <Card.Body>
                                    {(userRecipes || recipeAdded(recipe.id)) ? 
                                        <Button variant="secondary" onClick={() => removeRecipe(recipe.title, recipe.id)}>Remove from Recipes</Button> :
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

    