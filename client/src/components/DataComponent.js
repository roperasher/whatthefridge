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
            const data = otherData ? 
                            ((otherData.length !== 0) ? 
                                ((otherData.hasOwnProperty("missedIngredients")) ?
                                    Object.assign(this.state.data, otherData) :
                                [this.state.data, [otherData]]) :
                            [this.state.data, []]) :
                         this.state.data
            return (
                <div className="data-component">
                    {(this.state.loaded) ?
                        ((this.state.callback) ?
                            <SomeComponent data={data} callback={this.state.callback} /> :
                            <SomeComponent data={data} otherData={this.state.otherData} />) :
                        "" 
                    }
                </div>
            )
        }
    }

export default DataComponent