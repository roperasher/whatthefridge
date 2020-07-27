import React from 'react'
import { render } from 'react-dom'

const DataComponent = (SomeComponent, url, isJson) =>
    class DataComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: false,
                loaded: false,
                visible: false
            }
        }

        componentDidMount() {
            console.log(url)
            this.setState({ loading: true })
            fetch(url)
                .then(res => (isJson) ? res.json() : res.text())
                .then(data => this.setState({
                    data,
                    loaded: true,
                    loading: false,
                    visible: true
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