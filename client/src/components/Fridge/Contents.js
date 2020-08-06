import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import IngrList from "../Ingredients/IngrList";

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