import React from 'react';
import diagramControl from './../diagram-control';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // logic for canvas control has to fire after the canvas enters the DOM
    diagramControl();
  }

  render() {
    // need conditional logic in case browser doesn't support canvas
    // this can be a conditional that tests for the .getContext('2D') method
    // if (canvas.getContext)

    return <canvas id="diagram"></canvas>;
  }
}

export default Diagram;
