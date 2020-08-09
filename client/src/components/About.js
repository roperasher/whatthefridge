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
                    Welcome to WhatTheFridge! In this application, you can build your own virtual fridge and have
                    recipes recommended to you based on the ingredients in it. By going to "My Fridge" and searching
                    for ingredients in the top right corner of the application, you can add ingredients to your frige.
                    Once your virtual frige represents your real one, you can go to "Search Recipes" to view potential
                    recipes to make. From there, you can add the recipes which you would like to make by adding it to
                    your fridge. You can also click on ingredients and recipes to get nutrition analytics, cooking
                    instructions, and more.

                    Developers:
                    Alex Davidoff
                    Jordan Co
                    Asher Roper

                    Technologies Used:
                    Node.js
                    Express
                    React
                    React Chart 
                    React Notify
                    Spoonacular (API)
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
