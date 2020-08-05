import React, { useState } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import url from "url";


function SearchIngr({ addIngr=f=>f }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const spoonURL = new URL(
    `https://api.spoonacular.com/food/ingredients/autocomplete?`
  );
  const numOfResults = 1;
  let newIngr = {
    name: "",
    image: "",
    loaded: false
  }

  let params = new URLSearchParams([
    ["apiKey", `${API_KEY}`],
    ["number", `${numOfResults}`],
    ["query", ""],
  ]);

  const handleChange = (e) => {
    const target = e.target;
    const val = target.value;
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
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Form inline>
      <FormControl
        name="searchtext"
        type="text"
        onChange={handleChange}
        placeholder="Search Ingredients "
        className="mr-sm-2"
      />
      <Button variant="outline-success" onClick={() => (newIngr.loaded) ? addIngr(newIngr) : ""}>Add Ingredient</Button>
    </Form>
  );
}

const handleChange = (e) => {};
export default SearchIngr;
