import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import App from './App.js'
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap'

const IngredientInfo = ({ data }) => {
    const [key, setKey] = useState('list')
    
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
                    <Tab.Pane eventKey="list" className="d-flex justify-content-center" unmountOnExit="true">
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => 
                                <ListGroup.Item variant={(i%2===0) ? 'info' : 'light'}>{ingr.name}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="prices" className="d-flex justify-content-center" unmountOnExit="true">
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => (
                                <>
                                <ListGroup.Item key={i} variant="info">{ingr.name}</ListGroup.Item>
                                <ListGroup.Item key={i} variant="success">Price {ingr.amount.metric.value}</ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>                   
                    </Tab.Pane>
                    <Tab.Pane eventKey="amounts" className="d-flex justify-content-center" unmountOnExit="true">
                        <ListGroup as="span">
                            {data.ingredients.map((ingr, i) => (
                                <>
                                <ListGroup.Item key={i} variant="info">{ingr.name}</ListGroup.Item>
                                <ListGroup.Item key={i} variant="success">Amount: {ingr.amount.us.value}</ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>                      
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>
    )
}
const IngredientCard = ({ id }) => {
    var requestString = "http://localhost:5000/data/recipe/getRecipeIngredientsByID/?id=" + id
    const IngredientDash = 
        DataComponent(
            IngredientInfo,
            requestString,
            true,
            id
        )
    return <IngredientDash />
}

export default IngredientCard