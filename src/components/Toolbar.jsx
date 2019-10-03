import React from "react";
import { connect } from "react-redux";
import {
  resetStageXYPosition,
  toggleGrid,
  startDownload,
  finishDownload,
  saveNewDiagram
} from "./../actions";

const FileSaver = require("file-saver");

const Toolbar = props => {
  const {
    resetStageXYPosition,
    toggleGrid,
    startDownload,
    finishDownload,
    saveNewDiagram
  } = props;
  let x;
  return (
    <div className="toolbar">
      <button
        onClick={() => {
          startDownload();
          const canvases = document.getElementsByTagName("canvas");
          const ctx = canvases[0].getContext("2d");
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvases[0].width, canvases[0].height);
          ctx.drawImage(canvases[1], 0, 0);
          ctx.drawImage(canvases[2], 0, 0);
          ctx.drawImage(canvases[3], 0, 0);
          const dataUri = canvases[0].toDataURL("image/jpg");

          FileSaver.saveAs(dataUri, "diagram.jpg");
          // let link = document.createElement("a");
          // link.download = "diagram.png";
          // link.href = dataUri;
          // link.click();
          finishDownload();
        }}
      >
        Download
      </button>
      <button
        onClick={() => {
          saveNewDiagram(props.diagram.objects);
        }}
      >
        Save
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

const mapStateToProps = state => {
  return {
    diagram: state.diagram
  };
};

export default connect(
  mapStateToProps,
  {
    resetStageXYPosition,
    toggleGrid,
    startDownload,
    finishDownload,
    saveNewDiagram
  }
)(Toolbar);
