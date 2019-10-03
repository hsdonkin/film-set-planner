import React from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";

// actions
import { loadDiagram, deleteDiagram } from "./../actions";

const SavedDiagramsList = props => {
  const { diagrams } = props;
  const { loadDiagram } = props;
  const diagramIDs = Object.keys(diagrams);
  const savedDiagramList = [];
  diagramIDs.forEach(ID => {
    savedDiagramList.push(
      <button
        key={v4()}
        onClick={() => {
          console.log("clicked");
          console.log(diagrams[ID]);
          loadDiagram(ID, diagrams[ID]);
        }}
      >
        Load: {ID}
      </button>
    );
  });
  return <div className="saved-diagrams">{savedDiagramList}</div>;
};

const mapStateToProps = state => {
  return {
    diagrams: state.saved.diagrams
  };
};

export default connect(
  mapStateToProps,
  { loadDiagram }
)(SavedDiagramsList);
