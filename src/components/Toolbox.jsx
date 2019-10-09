import React from "react";
import $ from "jquery";

// v4
import { v4 } from "uuid";

// redux
import { connect } from "react-redux";
import {
  resetStageXYPosition,
  toggleGrid,
  startDownload,
  finishDownload,
  saveNewDiagram
} from "./../actions";
import { ActionCreators } from "redux-undo";

// file download
const FileSaver = require("file-saver");

class Toolbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diagramName: this.props.diagram.name,
      diagramDesc: ""
    };
  }

  componentDidMount = () => {};

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      this.state.diagramName != nextState.diagramName ||
      this.state.diagramDesc != nextState.diagramDesc
    ) {
      return true;
    } else if (this.props.diagram.name != nextProps.diagram.name) {
      this.setState({
        ...this.state,
        diagramName: nextProps.diagram.name,
        diagramDesc: nextProps.diagram.description
      });
      return true;
    } else {
      return false;
    }
  };

  handleChange = event => {
    this.setState({ [event.target["name"]]: event.target.value });
  };

  handleFormSubmit = event => {
    this.props.saveNewDiagram(
      this.state.diagramName,
      this.state.diagramDesc,
      this.props.diagram.objects
    );
  };

  render() {
    const {
      resetStageXYPosition,
      toggleGrid,
      startDownload,
      finishDownload,
      saveNewDiagram,
      undo,
      redo
    } = this.props;

    return (
      <div className="toolbox">
        <div className="diagram-name-description">
          <form
            onSubmit={event => {
              event.preventDefault();
              this.handleFormSubmit(event);
            }}
            id={"diagram-name-form"}
          >
            <input
              id="save-input"
              name={"diagramName"}
              type="text"
              onChange={event => {
                this.handleChange(event);
              }}
              placeholder={"Diagram Name"}
              value={this.state.diagramName || ""}
              autoComplete="off"
              required
            />
            <textarea
              name="diagramDesc"
              onChange={event => {
                this.handleChange(event);
              }}
              placeholder="Write a description of this project here. This is a great place for notes for your key grip and gaffer, or notes for the production team."
              value={this.state.diagramDesc || ""}
              autoComplete="off"
            />
            <button id="save-button" type="submit">
              Save
            </button>
          </form>
        </div>
        <div className="diagram-button-wrapper">
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

          <button
            onClick={() => {
              redo();
            }}
          >
            Redo
          </button>
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
    undo: () => ActionCreators.undo(),
    redo: () => ActionCreators.redo()
  }
)(Toolbox);
