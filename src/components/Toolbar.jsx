import React from "react";
import { connect } from "react-redux";
import {
  resetStageXYPosition,
  toggleGrid,
  startDownload,
  finishDownload
} from "./../actions";

const Toolbar = props => {
  const {
    resetStageXYPosition,
    toggleGrid,
    startDownload,
    finishDownload
  } = props;
  let x;
  return (
    <div className="toolbar">
      <button
        onClick={() => {
          startDownload();
          const canvases = document.getElementsByTagName("canvas");
          const ctx = canvases[0].getContext("2d");
          ctx.drawImage(canvases[1], 0, 0);
          ctx.drawImage(canvases[2], 0, 0);
          const dataUri = canvases[0].toDataURL("image/png");

          let link = document.createElement("a");
          link.download = "diagram.png";
          link.href = dataUri;
          link.click();
          finishDownload();
        }}
      >
        Download
      </button>
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
  { resetStageXYPosition, toggleGrid, startDownload, finishDownload }
)(Toolbar);
