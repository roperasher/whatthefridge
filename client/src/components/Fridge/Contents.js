import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import IngrList from "../Ingredients/IngrList";

// Uses boostrap according and cards to render each ingredient
// Requires: ingredient array and removeIngr from App.js
// Provides: Collapseable display of ingredients 
const Contents = ({ ingredients=[],  removeIngr=f=>f }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            All Ingredients
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <IngrList ingredients={ingredients} onRemove={removeIngr} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Contents;