import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../../stylesheets/Nutrition.css";

// Unused file

// Future goal to use this component to agregate ingredients to provide more graphical information about all fridge contents
// Currently used as test bed for various components

const Nutrition = () => {
  const mockData = {
    calories: "400",
    protein: "20.9g",
    fat: "10g",
    carbs: "6.0g",
  };
  return (
    <div className="mt-d d-flex justify-content-center">
      <h3>Nutrition component placeholder</h3>
      <FlipCard />
      <div>
        <Stats data={mockData}/>
      </div>
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

  render() {
    return (
      <div>
        <div
          ref="Card"
          className="frontCard"
          onClick={this.handleClick.bind(this)}
        >
          <div ref="frontCard" className="active">
            Front Card
          </div>
          <div ref="backCard" className="back deactive">
            Back Card
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({data}) => {
  let {protein, fat, carbs} = data; 
  console.log(data);
  let title = `Total Calories ${data.calories}`;
  let proteinF = parseFloat(protein.substring(0, protein.length));
  let fatF = parseFloat(fat.substring(0, fat.length));
  let carbsF = parseFloat(carbs.substring(0, carbs.length));
  console.log(protein, fat, carbs);
  console.log(typeof protein);
  const state = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        label: "Macros",
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 159, 64, 0.8)", "rgba(199, 199, 199, 0.8)"],
        hoverBackgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)", "rgba(199, 199, 199, 1)"],
        data: [proteinF, fatF, carbsF],
      },
    ],
  };

  return (
    <>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            text: `${title}`,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </>
  );
};
export default Nutrition;
export { Stats };
