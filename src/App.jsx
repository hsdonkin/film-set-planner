import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import Diagram from './components/Diagram';
import { addObjectToDiagram } from './actions';

const App = props => {
  console.log(props);

  return (
    <div>
      <h1>App is working</h1>
      <button
        onClick={() => {
          props.addObjectToDiagram(props.objects['arri_alexa_mini']);
        }}
      >
        Add
      </button>
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
  { addObjectToDiagram }
)(App);
