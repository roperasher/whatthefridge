import React, { useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import DataComponent from './DataComponent.js'
import { Card, Nav } from 'react-bootstrap'
import '../stylesheets/NutritionInfo.css'

const NutritionInfo = ({ data }) => {
    //data = data.replace(/onmouseover/g, "onMouseOver").replace(/onmouseout/g, "onMouseOut")
     //       .replace(/onclick/g, "onClick").replace(/onchange/g, "onChange")
    const [key, setKey] = useState('overview')
    
    return(
        <>
            <Card className="nutrition-card">
                <Tabs
                    id="nutrition-tabs" defaultActiveKey="overview" onSelect={(key) => setKey(key)}
                >
                    <Tab eventKey="overview" title="Stats">Stats</Tab>
                    <Tab eventKey="The Good">The Good</Tab>
                    <Tab eventKey="The Bad">The Bad</Tab>
                </Tabs>
            </Card>
        </>
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