import React from 'react'
import { v4 } from 'uuid'
import DataComponent from './DataComponent.js'
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap'
import '../stylesheets/NutritionInfo.css'

const NutritionInfo = ({ data }) => {    
    return(
        <Tab.Container defaultActiveKey="overview">
            <Row className="justify-content-md-center">
                <Nav variant="pills" className="flex-row">
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="overview" title="Stats">Stats</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="good" title="Good">The Good</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="bad" title="Bad">The Bad</Nav.Link>
                        </Nav.Item>
                    </Col>  
                </Nav>
            </Row>
            <Row className="justify-content-md-center">
                <Tab.Content>
                    <Tab.Pane eventKey="overview" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            <ListGroup.Item key={v4()} variant="info">{`Total Calories: ${data.calories}`}</ListGroup.Item>
                            <ListGroup.Item key={v4()} variant="info">{`Carbs: ${data.carbs}`}</ListGroup.Item>
                            <ListGroup.Item key={v4()} variant="info">{`Total Fat: ${data.fat}`}</ListGroup.Item>
                            <ListGroup.Item key={v4()} variant="info">{`Total Protein: ${data.protein}`}</ListGroup.Item>
                        </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="good" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {data.good.map((item, i) => (
                                <>
                                <ListGroup.Item key={i} variant="info">{`${item.title}`}</ListGroup.Item>
                                <ListGroup.Item key={i} variant="success">{`Percent of Daily Needs: ${item.percentOfDailyNeeds}`}</ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>                   
                    </Tab.Pane>
                    <Tab.Pane eventKey="bad" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {data.bad.map((item, i) => (
                                <>
                                <ListGroup.Item key={i} variant="info">{`${item.title}`}</ListGroup.Item>
                                <ListGroup.Item key={i} variant="warning">{`Percent of Daily Needs: ${item.percentOfDailyNeeds}`}</ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>                      
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>
    )
}

const NutritionCard = ({ id }) => {
    var requestString = "http://localhost:5000/data/nutrition/getNutritionInformation/?id=" + id 
    const NutritionDash = 
        DataComponent(
            NutritionInfo,
            requestString,
            true,
            id
        )
    return <NutritionDash />
}

export default NutritionCard