import React, { Component } from "react";
import { Card } from "react-bootstrap";

export class About extends Component {
  render() {
    return (
      <div className="mt-d">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="aboutBox">
                <h3>About What the Fridge</h3>
                <p>
                    Insert Text here about:
                        - fullstack project
                        - why make this app
                        - API and technology used 
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
