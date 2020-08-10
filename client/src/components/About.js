import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../stylesheets/About.css";

export class About extends Component {
  render() {
    return (
      <div className="mt-5">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="aboutBox">
              <h2>About What the Fridge</h2>
              <Table striped>
                <tbody>
                  <tr>
                    <td colSpan="3">
                      <p>
                        Welcome to WhatTheFridge! In this application, you can
                        build your own virtual fridge and have recipes
                        recommended to you based on the ingredients in it. By
                        going to "My Fridge" and searching for ingredients in
                        the top right corner of the application, you can add
                        ingredients to your fridge. Once your virtual fridge
                        represents your real one, you can go to "Search Recipes"
                        to view potential recipes based on your ingredients.
                        From there, you can add the recipes which you would like
                        to make by adding it to your fridge. You can also click
                        on ingredients and recipes to get nutrition analytics,
                        cooking instructions, and more.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3 ">
                      <h4>Developers</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://github.com/adavidoff425">Alex Davidoff</a>
                    </td>
                    <td>
                      <a href="https://github.com/roperasher">Asher Roper</a>
                    </td>
                    <td>
                      <a href="https://github.com/Coleeco">Jordan Co</a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <h4>Technologies</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Node.js, Express, React, Chart.js, React Notify,
                      Spoonacular (API), Flaticons, and Heroku
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
