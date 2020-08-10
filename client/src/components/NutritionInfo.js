import React from "react";
import { v4 } from "uuid";
import DataComponent from "./DataComponent.js";
import { Stats } from "./Fridge/Nutrition.js";
import { Tab, Nav, Row, Col, ListGroup, Table } from "react-bootstrap";
import "../stylesheets/NutritionInfo.css";

// Displays recipe nutrition info as three tab panes with a nav bar on top
// Information includes doughnut graph of nutritional macros and good/bad nutrition components
const NutritionInfo = ({ data }) => {
  return (
    <Tab.Container defaultActiveKey="overview">
      <Row className="justify-content-md-center">
        <Nav variant="pills" className="flex-row">
          <Col sm={4}>
            <Nav.Item>
              <Nav.Link eventKey="overview" title="Stats">
                Stats
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col sm={4}>
            <Nav.Item>
              <Nav.Link eventKey="good" title="Good">
                The Good
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col sm={4}>
            <Nav.Item>
              <Nav.Link eventKey="bad" title="Bad">
                The Bad
              </Nav.Link>
            </Nav.Item>
          </Col>
        </Nav>
      </Row>
      <Row className="justify-content-md-center">
        <Tab.Content>
          <Tab.Pane
            eventKey="overview"
            className="d-flex justify-content-center"
            unmountOnExit={true}
          >
            <ListGroup as="span">
              <ListGroup.Item eventKey={v4()} variant="light">
                <Stats data={data} />
              </ListGroup.Item>
            </ListGroup>
          </Tab.Pane>
          <Tab.Pane
            eventKey="good"
            className="d-flex justify-content-center"
            unmountOnExit={true}
          >
            <ListGroup as="span">
              <ListGroup.Item eventKey={v4()} variant="info">
                <Table striped bordered hover size="sm">
                  <thead>
                    <th>Nutrient</th>
                    <th>Percent of Daily Needs</th>
                  </thead>
                  <tbody>
                    {data.good.map((item, i) => (
                      <React.Fragment key={v4()}>
                        <tr key={i}>
                          <td>{`${item.title}`}</td>
                          <td>{`${item.percentOfDailyNeeds}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Tab.Pane>
          <Tab.Pane
            eventKey="bad"
            className="d-flex justify-content-center"
            unmountOnExit={true}
          >
            <ListGroup as="span">
              <ListGroup.Item eventKey={v4()} variant="warning">
                <Table className='text-center' striped bordered hover size="sm">
                  <thead>
                    <th>Nutrient</th>
                    <th>Percent of Daily Needs</th>
                  </thead>
                  <tbody>
                    {data.bad.map((item, i) => (
                      <React.Fragment key={v4()}>
                        <tr key={i}>
                          <td>{`${item.title}`}</td>
                          <td>{`${item.percentOfDailyNeeds}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Tab.Pane>
        </Tab.Content>
      </Row>
    </Tab.Container>
  );
};

const NutritionCard = ({ id }) => {
  var requestString =
    "https://whatthefridge-psu.herokuapp.com/data/nutrition/getNutritionInformation/?id=" + id;
  const NutritionDash = DataComponent(NutritionInfo, requestString, true, id);
  return <NutritionDash />;
};

export default NutritionCard;
