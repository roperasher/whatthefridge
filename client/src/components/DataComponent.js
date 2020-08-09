import React from 'react'

const DataComponent = (SomeComponent, url, isJson, recipeID, callback, otherData) =>
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
                    data: (otherData) ? Object.assign(otherData, data) : data,
                    loaded: true,
                    loading: false,
                    visible: true,
                    id: recipeID,
                    callback
                }))
        }

        render() {
            //if(this.state.loaded) console.log(this.state.data)
            return (
                <div className="data-component">
                    {(this.state.loaded) ?
                        ((this.state.callback) ?
                            <SomeComponent data={this.state.data} callback={this.state.callback} /> :
                            <SomeComponent { ...this.state } otherData={this.state.otherData} />) :
                        "" 
                    }
                </div>
            )
        }
    }

export default DataComponent