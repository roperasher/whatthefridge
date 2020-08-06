import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Button, Modal } from "react-bootstrap";

function Home() {
  return (
    <div className="my-5 d-flex justify-content-center">
    <div className="row">
      <div className="col-sm-2"></div> 
      <div className="col-sm-8">
      <Jumbotron className="border border-secondary">
        <h1 className="mb-3">Welcome to What the Fridge!!</h1>
          <p className="text-left">
            Have you ever opened your fridge in a hungry fervor and had no idea
            what to do with the strange bits and bobs in the back corner of your
            fridge? Well you are in luck my friend, What the Fridge aims to help
            you find the right recipes for the ingredients you have.
          </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>

      </div> 
      <div className="col-sm-2"></div> 
    </div>
    </div>
  );
}

export default withRouter(Home);
