import React, {Component} from 'react'; //Import component from react for the class to extend from.
import SearchBar from "./SearchBar";
import DataComponent from "./DataComponent";
import { withRouter } from 'react-router-dom';

class Recipes extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

//   recipeSearch(...ingrs) {
//     const requestString =
//       "http://localhost:5000/data/recipe/searchRecipesByIngredients/?ingredients=" +
//       ingrs.map((ingr) => ingr.name).join("%2C") +
//       "&number=5&ranking=1";
//     const RecipeDash = DataComponent(RecipeList, requestString, true, null);
//     render(
//       <>
//         <IngrList />
//         <RecipeDash />
//       </>,
//       document.getElementById("root")
//     );
//   }

    render(){
        return(
            <div className="mt-d d-flex justify-content-center">
                <SearchBar 
                    onNewIngr = {this.props.onNewIngr}
                    onSearch = {this.props.onSearch}
                    />
            </div>
        )
    }
}

export default withRouter(Recipes);