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
    return <canvas id="diagram"></canvas>;
  }
}

export default Diagram;
