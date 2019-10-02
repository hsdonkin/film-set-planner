import React from "react";
import { connect } from "react-redux";
import { resetStageXYPosition } from "./../actions";

const Toolbar = props => {
  const { resetStageXYPosition } = props;
  return (
    <div className="toolbar">
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
  { resetStageXYPosition }
)(Toolbar);
