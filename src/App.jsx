import React from "react";

// redux
import { connect } from "react-redux";
import {
  addObjectToDiagram,
  removeObjectFromDiagram,
  toggleObjectSelected
} from "./actions";

// components
import Diagram from "./components/Diagram";
import Sidebar from "./components/Sidebar";
// toolbar is really just a header
import Toolbar from "./components/Toolbar";
// toolbox
import Toolbox from "./components/Toolbox";
// saved diagrams
import SavedDiagramsList from "./components/SavedDiagramsList";

const App = props => {
  return (
    <div className="page-wrap">
      <div className="header"></div>
      <Toolbar />
      <Sidebar />
      <div className="diagram-toolbox-wrapper">
        <Diagram />
        <Toolbox />
      </div>
      <SavedDiagramsList />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    diagram: state.diagram,
    objects: state.objects
  };
};

export default connect(
  mapStateToProps,
  { addObjectToDiagram, removeObjectFromDiagram, toggleObjectSelected }
)(App);
