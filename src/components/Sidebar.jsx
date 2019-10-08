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
      <div key={v4()}>
        <h4>{object.name}</h4>
        <button
          className="add-button"
          onClick={() => {
            addObjectToDiagram(object);
          }}
          key={v4()}
        >
          {"\u271B"} Add
        </button>
      </div>
    );
  });
  return (
    <div className="sidebar">
      <button
        className="delete-all"
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
