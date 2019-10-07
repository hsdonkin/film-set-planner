import React from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";

// actions
import { loadDiagram, deleteDiagram } from "./../actions";

const SavedDiagramsList = props => {
  const { diagrams } = props;
  const { loadDiagram, deleteDiagram } = props;
  const diagramIDs = Object.keys(diagrams);
  let savedDiagramList = [];
  diagramIDs.forEach(ID => {
    savedDiagramList.push(
      <React.Fragment key={v4()}>
      <h4 key={v4()}>{diagrams[ID].name}</h4>
      <p>{Object.keys(diagrams[ID]).length} Objects</p>
      <button className="load"
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
        className="delete"
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
  if (savedDiagramList.length === 0){
    savedDiagramList = (
      <h4>Click "Save" to save a diagram!</h4>
    )
  }
  return <div className="saved-diagrams">
  <React.Fragment>
  <h3>Diagrams:</h3>
  <hr/>
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
