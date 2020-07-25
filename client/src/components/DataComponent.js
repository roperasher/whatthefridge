import React from 'react'
import { render } from 'react-dom'

const DataComponent = (SomeComponent, url) =>
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

        componentWillMount() {
            this.setState({ loading: true })
            fetch(url + API_KEY)
                .then(res => res.json())
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
                    {(!this.state.loading) ?
                        "" :
                        <SomeComponent { ...this.state } />}
                </div>
            )
        }
    }

export default DataComponent