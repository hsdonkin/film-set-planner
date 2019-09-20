import React from 'react';
import ReactKonva from 'react-konva';
import Arri_M8 from './../assets/Arri M8.png';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // need conditional logic in case browser doesn't support canvas
    // this can be a conditional that tests for the .getContext('2D') method
    // if (canvas.getContext)
    let image = new Image();
    image.src = Arri_M8;

    return (
      <ReactKonva.Stage height={300} width={300}>
        <ReactKonva.Layer>
          <ReactKonva.Image image={image} draggable={true} />
        </ReactKonva.Layer>
      </ReactKonva.Stage>
    );
  }
}

export default Diagram;
