import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import Diagram from './components/Diagram';
import {
  addObjectToDiagram,
  removeObjectFromDiagram,
  toggleObjectSelected
} from './actions';

const App = props => {
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
      <button
        onClick={() => {
          let keys = Object.keys(props.diagram.objects);
          props.removeObjectFromDiagram(keys[0]);
        }}
      >
        Delete
      </button>

      <button
        onClick={() => {
          let keys = Object.keys(props.diagram.objects);
          props.toggleObjectSelected(keys[0]);
        }}
      >
        Toggle Selected
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
  { addObjectToDiagram, removeObjectFromDiagram, toggleObjectSelected }
)(App);
