import React from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";

// actions
import { loadDiagram, deleteDiagram } from "./../actions";

const SavedDiagramsList = props => {
  const { diagrams } = props;
  const { loadDiagram, deleteDiagram } = props;
  const diagramIDs = Object.keys(diagrams);
  const savedDiagramList = [];
  diagramIDs.forEach(ID => {
    savedDiagramList.push(
      <React.Fragment key={v4()}>
      <h3 key={v4()}>{diagrams[ID].name}</h3>
      <button
        key={v4()}
        onClick={() => {
          console.log("clicked");
          console.log(diagrams[ID]);
          loadDiagram(ID, diagrams[ID]);
        }}
      >
        Load
      </button>
      <button
        key={v4()}
        onClick={ () => 
          {deleteDiagram(ID)}
        }
      >
        Delete
      </button>
        <hr/>
      </React.Fragment>
    );
  });
  return <div className="saved-diagrams">
  <React.Fragment>
  <h3>Diagrams:</h3>
  {savedDiagramList}
  </React.Fragment>
  </div>;
};

const mapStateToProps = state => {
  return {
    diagrams: state.saved.diagrams
  };
};

export default connect(
  mapStateToProps,
  { loadDiagram,deleteDiagram }
)(SavedDiagramsList);
