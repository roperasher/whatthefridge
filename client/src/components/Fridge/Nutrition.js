import React from "react";
import "../../stylesheets/Nutrition.css";

const Nutrition = () => {
  return (
    <div className="mt-d d-flex justify-content-center">
      <h3>Nutrition component placeholder</h3>
      <FlipCard />
    </div>
  );
};

class FlipCard extends React.Component {

  handleClick() {
    this.refs.Card.classList.toggle("backCard");
    this.refs.Card.classList.toggle("frontCard");
    this.refs.frontCard.classList.toggle("deactive");
    this.refs.frontCard.classList.toggle("active");
    this.refs.backCard.classList.toggle("deactive");
    this.refs.backCard.classList.toggle("active");
  }

    render(){
    return (
      <div>
        <div 
          ref="Card" 
          className="frontCard"
          onClick={this.handleClick.bind(this)}>
          <div 
            ref="frontCard" 
            className="active">Front Card</div>
          <div 
            ref="backCard" 
            className="back deactive">Back Card</div>
        </div>
      </div>
    )
  }
}

export default Nutrition;
