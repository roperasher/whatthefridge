import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import '../stylesheets/NutritionInfo.css'

const NutritionInfo = ({ data }) => {
    //data = data.replace(/onmouseover/g, "onMouseOver").replace(/onmouseout/g, "onMouseOut")
     //       .replace(/onclick/g, "onClick").replace(/onchange/g, "onChange")
    const [key, setKey] = useState('overview')
    
    return(
        <Tab.Container defaultActiveKey="overview">
            <Row>
                <Nav variant="tabs" className="flex-row">
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
            <Row>
                <Tab.Content>
                    <Tab.Pane eventKey="overview">
                        Overview
                    </Tab.Pane>
                    <Tab.Pane eventKey="good">
                        The Good
                    </Tab.Pane>
                    <Tab.Pane eventKey="bad">
                        The Bad
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