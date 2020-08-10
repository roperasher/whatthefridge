import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Button, Card, Collapse } from "react-bootstrap";
import "../stylesheets/Home.css";

const Home = () => {
  const [Learn, setLearn] = useState(false);
  const jokeURL = "https://api.spoonacular.com/food/jokes/random";
  const triviaURL = "https://api.spoonacular.com/food/trivia/random";

  return (
    <div className="my-5">
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <Jumbotron className="border border-secondary jumbo">
            <h1 className="mb-3">Welcome to What the Fridge!!</h1>
            <p className="text-left">
              Have you ever opened your fridge in a hungry fervor and had no
              idea what to do with the strange bits and bobs in the back corner
              of your fridge? Well you are in luck my friend, What the Fridge
              aims to help you find the right recipes for the ingredients you
              have. This app will give nutritional info about each ingredient
              and recipe that you save.
            </p>
            <p>
              <Button
                variant="primary"
                onClick={() => setLearn(!Learn)}
                aria-controls="learn-more-text"
                aria-expanded="open"
              >
                Learn more
              </Button>
            </p>
            <Collapse in={Learn}>
              <div id="learn-more-text">
                To add an ingredient, type in the ingredient and click Add
                Ingredient. Your ingredient is now saved can be viewed from the
                My Fridge Tab. There you may view detail information about your
                saved ingredients After adding ingredients you can search for
                recipes based on your ingredients as well as save recipes to
                view later. Each recipe will display detail information such as
                instructions, nutritional macros, and cost.
              </div>
            </Collapse>
          </Jumbotron>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 offset-sm-2">
          <RandomCard url={jokeURL} joke={true} />
        </div>
        <div className="col-sm-3 offset-sm-2">
          <RandomCard url={triviaURL} joke={false} />
        </div>
      </div>
    </div>
  );
};

const RandomCard = ({ url, joke }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [text, setText] = useState("");
  let getURL = url + "?apiKey=" + API_KEY;
  let type = joke ? "Joke" : "Trivia";

  useEffect(() => {
    getRandom("mounting");
  }, []);

  const getRandom = () => {
    // Commented out to avoid excess API calls
    fetch(getURL)
      .then((resp) => resp.json())
      .then((data) => {
        setText(data.text);
    });
  };

  return (
    <>
      <Card>
        <Card.Header className="cardTitle">Random Food {type}</Card.Header>
        <Card.Body>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" onClick={() => getRandom("newcall")}>
            New {type}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default withRouter(Home);
