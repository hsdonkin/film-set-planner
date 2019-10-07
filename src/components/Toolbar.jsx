import React from "react";
import $ from "jquery";
import { connect } from "react-redux";
import {
  resetStageXYPosition,
  toggleGrid,
  startDownload,
  finishDownload,
  saveNewDiagram
} from "./../actions";
import { ActionCreators } from "redux-undo";

import { v4 } from "uuid";

const FileSaver = require("file-saver");

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diagramName: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target["name"]]: event.target.value });
  };

  handleFormSubmit = event => {
    this.props.saveNewDiagram(
      this.state.diagramName,
      this.props.diagram.objects
    );
    this.setState({ diagramName: "" });
  };

  render() {
    const {
      resetStageXYPosition,
      toggleGrid,
      startDownload,
      finishDownload,
      saveNewDiagram,
      undo
    } = this.props;
    let x;
    return (
      <div className="toolbar">
        <h1>Film Set Planner</h1>
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

            FileSaver.saveAs(dataUri, `${v4()}.jpg`);
            // let link = document.createElement("a");
            // link.download = "diagram.png";
            // link.href = dataUri;
            // link.click();
            finishDownload();
          }}
        >
          Download
        </button>

        <form
          onSubmit={event => {
            event.preventDefault();
            this.handleFormSubmit(event);
          }}
          id={"diagram-name-form"}
        >
          <button type="button" onClick={() => {}}>
            FakeSave
          </button>
          <button id="save-button" type="submit">
            Save
          </button>
          <input
            id="save-input"
            name={"diagramName"}
            onChange={event => {
              this.handleChange(event);
            }}
            placeholder={"Diagram Name"}
            value={this.state.diagramName}
            required
          />
        </form>
        <button
          onClick={() => {
            undo();
          }}
        >
          Undo
        </button>
        <button
          id="toggle-grid"
          onClick={() => {
            toggleGrid();
          }}
        >
          Toggle Grid
        </button>
        <button
          id="reset-view"
          onClick={() => {
            resetStageXYPosition();
          }}
        >
          Reset View
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram.present
  };
};

export default connect(
  mapStateToProps,
  {
    resetStageXYPosition,
    toggleGrid,
    startDownload,
    finishDownload,
    saveNewDiagram,
    undo: () => ActionCreators.undo()
  }
)(Toolbar);
