import React from "react"
import { FormControl, Form, Button} from "react-bootstrap";



const SearchIngr = () => {
    return(
        <Form inline>
          <FormControl type="text" placeholder="Search Ingredient" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
    );
}

export default SearchIngr;