import React, { useState } from "react";
import { FormControl, Form, Button } from "react-bootstrap";

// Add ingredient search bar rendered by Header.js. 
// Requires: addIngr function from App.js
// Provides: Search of ingredients to call addIngr function
function SearchIngr({ addIngr = (f) => f }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [text, setText] = useState("");
  const spoonURL = new URL(
    // Returns list of potential ingredients from natural language input
    `https://api.spoonacular.com/food/ingredients/autocomplete?` 
  );
  const numOfResults = 1;
  let newIngr = {
    name: "",
    image: "",
    loaded: false,
  };

  // Load queary parameters. Limit to first result
  let params = new URLSearchParams([
    ["apiKey", `${API_KEY}`],
    ["number", `${numOfResults}`],
    ["query", ""],
  ]);

  // On submit take the first autocomplete result as the ingredient to be added
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = text;
    setText('');
    params.set("query", val);
    spoonURL.search = params.toString();
    if (val.length >= 3) {
      fetch(spoonURL.href)
        .then((resp) => resp.json())
        .then((data) => {
          newIngr = {
            name: data[0].name,
            image: data[0].image,
            loaded: true
          }
          console.log(`adding Ingredient ${newIngr.name}`);
          addIngr(newIngr);
        })
        .catch((error) => console.log(error));
    }
  }
  // Updated state value from input value
  // Intial plan was to have an autocomplete combobox, set number param to 5
  // however that was much easier said that done
  const handleChange = (e) => {
    const target = e.target;
    const val = target.value;

    setText(val);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        name="searchtext"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Search Ingredients "
        className="mr-sm-2"
      />
      <Button variant="outline-success" type="submit">
        Add Ingredient
      </Button>
    </Form>
  );
}

const handleChange = (e) => {};
export default SearchIngr;
