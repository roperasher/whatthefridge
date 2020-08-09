import React from 'react';
import RecipeList from "./RecipeList"
import DataComponent from "../DataComponent";
import { withRouter } from 'react-router-dom';

// ENTRY POINT FOR RECIPES 
const Recipes = ({ ingredients = [], recipes = [], onAddRecipe=f=>f, onRemoveRecipe=f=>f }) => {
  // TODO display message saying not ingredients
  let savedRecipes = JSON.parse(JSON.stringify(recipes))
  if(ingredients.length === 0)
    return <RecipeList data={savedRecipes} callback={[onAddRecipe, onRemoveRecipe]} userRecipes={true} />   

  const requestString = "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" + ingredients.map(ingr => ingr.name.replace(' ', '%2C')).join(',') + "&number=6&ranking=1"
  const RecipeDash = 
    DataComponent(
        RecipeList,
        requestString,
        true,
        null,
        [onAddRecipe, onRemoveRecipe],
        JSON.parse(JSON.stringify(savedRecipes))
    )
  return <RecipeDash />
}

export default withRouter(Recipes);
// class Recipes extends Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     // };
//   }

// //   recipeSearch(...ingrs) {
// //     const requestString =
// //       "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" +
// //       ingrs.map((ingr) => ingr.name).join("%2C") +
// //       "&number=5&ranking=1";
// //     const RecipeDash = DataComponent(RecipeList, requestString, true, null);
// //     render(
// //       <>
// //         <IngrList />
// //         <RecipeDash />
// //       </>,
// //       document.getElementById("root")
// //     );
// //   }

//     render(){
//         return(
//             <div className="mt-d d-flex justify-content-center">
//                 <SearchBar 
//                     onNewIngr = {this.props.onNewIngr}
//                     onSearch = {this.props.onSearch}
//                     />
//             </div>
//         )
//     }
// }
