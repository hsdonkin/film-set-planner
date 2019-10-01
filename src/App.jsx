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

const App = props => {
  return (
    <div className="page-wrap">
      <Sidebar />
      <Diagram />
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
