import React from 'react'

const DataComponent = (SomeComponent, url, isJson, recipeID, callback) =>
    class DataComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: [],
                loading: false,
                loaded: false,
                visible: false,
                id: null,
                callback: null
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
                    callback
                }))
        }

        render() {
            return (
                <div className="data-component">
                    {(this.state.loaded) ?
                        ((this.state.callback) ?
                            <SomeComponent data={this.state.data} callback={this.state.callback} /> :
                            <SomeComponent { ...this.state }  />) :
                        "" 
                    }
                </div>
            )
        }
    }

export default DataComponent