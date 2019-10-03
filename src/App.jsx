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
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// toolbar
import Toolbar from "./components/Toolbar";
// saved diagrams
import SavedDiagramsList from "./components/SavedDiagramsList";

const App = props => {
  return (
    <div className="page-wrap">
      <Toolbar />
      <Sidebar />
      <Diagram />
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
