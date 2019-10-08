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
      undo,
      redo
    } = this.props;
    let x;
    return (
      <div className="toolbar">
        <h1>Film Set Planner</h1>
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
)(Toolbar);
