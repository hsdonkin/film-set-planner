import React from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stage
        style={{ border: '1px whitesmoke solid' }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      ></Stage>
    );
  }
}

export default Diagram;
