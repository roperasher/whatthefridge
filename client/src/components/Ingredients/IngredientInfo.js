import React from 'react'
import { v4 } from 'uuid'
import DataComponent from '../DataComponent.js'
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap'

const IngredientInfo = ({ data }) => {    
    console.log(data)
    return(
        <Tab.Container defaultActiveKey="list">
            <Row className="justify-content-md-center">
                <Nav variant="pills" className="flex-row">
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="list" title="List">List</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="prices" title="Prices">Pricing</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="amounts" title="amounts">Amounts</Nav.Link>
                        </Nav.Item>
                    </Col>  
                </Nav>
            </Row>
            <Row className="justify-content-md-center">
                <Tab.Content>
                    <Tab.Pane eventKey="list" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => 
                                <ListGroup.Item key={v4()} variant={(i%2===0) ? 'info' : 'light'}>{ingr.name}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="prices" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => (
                                <React.Fragment key={v4()}>
                                    <ListGroup.Item eventKey={v4()} variant="info">{ingr.name}</ListGroup.Item>
                                    <ListGroup.Item eventKey={v4()} variant="success">Price {ingr.amount.metric.value}</ListGroup.Item>
                                </React.Fragment>
                            ))}
                        </ListGroup>                   
                    </Tab.Pane>
                    <Tab.Pane eventKey="amounts" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => (
                                <React.Fragment key={v4()}>
                                    <ListGroup.Item eventKey={v4()} variant="info">{ingr.name}</ListGroup.Item>
                                    <ListGroup.Item eventKey={v4()} variant="success">Amount: {ingr.amount.us.value}</ListGroup.Item>
                                </React.Fragment>
                            ))}
                        </ListGroup>                      
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>
    )
}
const IngredientCard = ({ id, needed }) => {
    console.log(needed)
    var requestString = "https://whatthefridge-psu.herokuapp.com/data/recipe/getRecipeIngredientsByID/?id=" + id
    const IngredientDash = 
        DataComponent(
            IngredientInfo,
            requestString,
            true,
            id,
            null,
            needed
        )
    return <IngredientDash />
}

export default IngredientCard