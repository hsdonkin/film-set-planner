import React from "react";
import { v4 } from "uuid";
import { connect } from "react-redux";
import {
  addObjectToDiagram,
  removeAllFromDiagram,
  resetStageXYPosition
} from "./../actions";

const Sidebar = props => {
  const {
    addObjectToDiagram,
    removeAllFromDiagram,
    resetStageXYPosition
  } = props;
  let objectsList = [];
  let keys = Object.keys(props.objects);
  keys.forEach(key => {
    objectsList.push(props.objects[key]);
  });
  let buttonList = objectsList.map(object => {
    return (
      <button
        onClick={() => {
          addObjectToDiagram(object);
        }}
        key={v4()}
      >
        Add {object.name}
      </button>
    );
  });
  return (
    <div className="sidebar">
      <button
        onClick={() => {
          removeAllFromDiagram();
          resetStageXYPosition();
        }}
      >
        Delete All
      </button>
      {buttonList}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    objects: state.objects
  };
};

export default connect(
  mapStateToProps,
  { addObjectToDiagram, removeAllFromDiagram, resetStageXYPosition }
)(Sidebar);
