import React from "react";
import Contents from "./Contents";
// import Nutrition from "./Nutrition";

// Entry point for fridge components
// Stretch goal: add nutrition for each ingredient tile
// Requires: ingredients array and remobeIngr function from app.js
// Provides: Root component for future Fridge components
const Fridge = ({ ingredients = [], removeIngr = (f) => f }) => {
  return (
    <div>
      <Contents ingredients={ingredients} removeIngr={removeIngr} />
    </div>
  );
};

export default Fridge;
