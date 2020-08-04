import React, { useState } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import url from "url";
// const url = require("url");


function SearchIngr(props) {
  // const [searchText, setText] = useState('');
  const API_KEY = process.env.REACT_APP_API_KEY;
  const spoonURL = new URL(
    `https://api.spoonacular.com/food/ingredients/autocomplete?`
  );
  const numOfResults = 5;

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
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Form inline>
      <FormControl
        name="searchtext"
        onChange={handleChange}
        type="text"
        placeholder="Search Ingredients "
        className="mr-sm-2"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}

const handleChange = (e) => {};
export default SearchIngr;
