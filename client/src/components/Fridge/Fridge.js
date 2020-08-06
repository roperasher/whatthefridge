import React from "react";
import Contents from "./Contents";
import Nutrition from "./Nutrition";

// ENTRY POINT FOR FRIDGE
const Fridge = ({ ingredients = [], removeIngr = (f) => f }) => {
  return (
    <div>
      <Contents ingredients={ingredients} removeIngr={removeIngr} />
      <Nutrition />
    </div>
  );
};

export default Fridge;
