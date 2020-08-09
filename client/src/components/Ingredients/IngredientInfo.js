import React from 'react'
import { v4 } from 'uuid'
import DataComponent from '../DataComponent.js'
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap'

const IngredientInfo = ({ data }) => {    
    const ingredients = data[0].ingredients
    const missedIngr = data[1][0]
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
                            <Nav.Link eventKey="prices" title="Prices">Additional Ingredients Needed</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm={4}>  
                        <Nav.Item>
                            <Nav.Link eventKey="amounts" title="amounts">Ingredient Amounts</Nav.Link>
                        </Nav.Item>
                    </Col>  
                </Nav>
            </Row>
            <Row className="justify-content-md-center">
                <Tab.Content>
                    <Tab.Pane eventKey="list" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {ingredients.map((ingr, i) => 
                                <ListGroup.Item key={v4()} variant={(i%2===0) ? 'info' : 'light'}>{ingr.name}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="prices" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {missedIngr.map((ingr, i) => (
                                MissedIngredient(ingr.id, ingr.amount, ingr.unitLong)
                            ))}
                        </ListGroup>                   
                    </Tab.Pane>
                    <Tab.Pane eventKey="amounts" className="d-flex justify-content-center" unmountOnExit={true}>
                        <ListGroup as="span">
                            {ingredients.map((ingr, i) => (
                                <React.Fragment key={v4()}>
                                    <ListGroup.Item eventKey={v4()} variant="success">{`${ingr.amount.us.value} ${ingr.amount.us.unit} ${ingr.name}`}</ListGroup.Item>
                                </React.Fragment>
                            ))}
                        </ListGroup>                      
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>
    )
}

const IngredientCard = ({ id, missedIngredients }) => {
    var requestString = "http://localhost:5000/data/recipe/getRecipeIngredientsByID/?id=" + id
    const IngredientDash = 
        DataComponent(
            IngredientInfo,
            requestString,
            true,
            id,
            null,
            missedIngredients
        )
    return <IngredientDash />
}

const MissedIngredient = (id, amount, unit) => {
    const requestString = "http://localhost:5000/data/ingredient/getIngredientCost/?id=" + id + "&amount=" + amount + "&unit=" + unit
    const MissedIngrCost = 
        DataComponent(
            MissedIngr,
            requestString,
            true
        )
    return <MissedIngrCost key={v4()}/>
}

const MissedIngr = ({ data }) => {
    return(
        <React.Fragment key={v4()}>
            <ListGroup.Item eventKey={v4()} variant="info">{data.name}</ListGroup.Item>
            <ListGroup.Item eventKey={v4()} variant="success">Cost: {data.price}</ListGroup.Item>
        </React.Fragment>
    )
}

export default IngredientCard