import React from "react";
import { connect } from "react-redux";
import { resetStageXYPosition, toggleGrid } from "./../actions";

const Toolbar = props => {
  const { resetStageXYPosition, toggleGrid } = props;
  return (
    <div className="toolbar">
      <button
        onClick={() => {
          toggleGrid();
        }}
      >
        Toggle Grid
      </button>
      <button
        onClick={() => {
          resetStageXYPosition();
        }}
      >
        Reset View
      </button>
    </div>
  );
};

export default connect(
  null,
  { resetStageXYPosition, toggleGrid }
)(Toolbar);
