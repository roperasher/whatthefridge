import React from "react"
import { withRouter } from "react-router-dom";
// import { Button} from "react-bootstrap";
import SearchIngr from "./SearchIngr";



const AddIngr = () => {
    return(
        <SearchIngr />
    );
}

export default withRouter(AddIngr);