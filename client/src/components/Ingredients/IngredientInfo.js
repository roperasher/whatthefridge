import React from 'react'
import { v4 } from 'uuid'
import DataComponent from '../DataComponent.js'
import { Doughnut } from "react-chartjs-2"
import { Tab, Nav, Row, Col, ListGroup } from 'react-bootstrap'

// Displays recipe ingredient info as three tab panes with a nav bar on top
// Information includes pricing for missing ingredients and amount of all ingredients used
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
    var requestString = "https://whatthefridge-psu.herokuapp.com/data/recipe/getRecipeIngredientsByID/?id=" + id
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
    const requestString = "https://whatthefridge-psu.herokuapp.com/data/ingredient/getIngredientCost/?id=" + id + "&amount=" + amount + "&unit=" + unit
    console.log(requestString)
    const MissedIngrCost = 
        DataComponent(
            MissedIngr,
            requestString,
            true
        )
    return <MissedIngrCost key={v4()} />
}

const MissedIngr = ({ data }) => {
    console.log(data)
    return(
        <React.Fragment key={v4()}>
            <ListGroup.Item eventKey={v4()} variant="info">{data.name}</ListGroup.Item>
            <ListGroup.Item eventKey={v4()} variant="success">Cost: {data.price}</ListGroup.Item>
        </React.Fragment>
    )
}

// Not working
const PricingInfo = (ingredients) => {
    const requestString = (id, amount, unit) => 
            "https://whatthefridge-psu.herokuapp.com/data/ingredient/getIngredientCost/?id=" + id + "&amount=" + amount + "&unit=" + unit
    let dataset = []
    let labels = []
    let url
    ingredients.map(ingr => {
        url = requestString(ingr.id, ingr.amount, ingr.unit)
        console.log(url)
        fetch(url)
            .then(res => {
                res.json()
            })
            .then(data => {
            dataset.append(data.price)
            labels.append(data.name)})
        }) 
    return (labels.length === ingredients.length) ? <PriceGraph data={dataset} labels={labels} /> : ""
}

const PriceGraph = ({ data, labels }) => {
    console.log(data)
    console.log(labels)
    let totalCost = data.reduce(((a, b) => a + b), 0)
    let title = `Total Recipe Cost ${totalCost}`;
    const state = {
        labels,
        datasets: [
        {
            label: "Macros",
            backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 159, 64, 0.8)", "rgba(199, 199, 199, 0.8)"],
            hoverBackgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)", "rgba(199, 199, 199, 1)"],
            data
        },
        ],
    }
    return(
        <Doughnut
            data={state}
            options={{
                title: {
                display: true,
                text: `${title}`,
                fontSize: 20,
                },
                legend: {
                display: true,
                position: "bottom",
                },
            }}
            />
    )
}

export default IngredientCard