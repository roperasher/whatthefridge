import React from 'react'
import { render } from 'react-dom'

const DataComponent = (SomeComponent, url, isJson, recipeID) =>
    class DataComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: false,
                loaded: false,
                visible: false,
                id: null,
            }
        }

        componentDidMount() {
            this.setState({ loading: true })
            //console.log(url) //uncomment to see API endpoint called to fetch data
            fetch(url)
                .then(res => (isJson) ? res.json() : res.text())
                .then(data => this.setState({
                    data,
                    loaded: true,
                    loading: false,
                    visible: true,
                    id: recipeID,
                }))
        }

        render() {
            return (
                <div className="data-component">
                    {(this.state.loaded) ?
                        <SomeComponent { ...this.state } /> : 
                        "" 
                        }
                </div>
            )
        }
    }

export default DataComponent