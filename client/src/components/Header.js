import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl, Form, Button} from "react-bootstrap";

import SearchIngr from "./Fridge/SearchIngr";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        What The Fridge
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ml-5">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/recipes">
            Recipes 
          </Nav.Link>
          <NavDropdown title="My Fridge" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              Add Ingredients
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.1">Contents</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">Nutrition</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <SearchIngr />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
