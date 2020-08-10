import React from 'react'

// Higher order component used as a wrapper for any component that needs to fetch data from
// the server. Optional args can be used to pass additional callback and data
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

        // async fetch performed on mount
        componentDidMount() {
            this.setState({ loading: true })
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
            // Data checks for all of of the cases for otherData used within this app
            const data = otherData ? 
                            ((otherData.length !== 0) ? 
                                ((otherData.hasOwnProperty("missedIngredients")) ?
                                    Object.assign(this.state.data, otherData) :
                                [this.state.data, [otherData]]) :
                            [this.state.data, []]) :
                         this.state.data
            return (
                <div className="data-component">
                    { 
                     (this.state.loaded) ? // Only render once async work is done
                        ((this.state.callback) ?
                            <SomeComponent data={data} callback={this.state.callback} /> :
                            <SomeComponent data={data} />) :
                        "" 
                    }
                </div>
            )
        }
    }

export default DataComponent