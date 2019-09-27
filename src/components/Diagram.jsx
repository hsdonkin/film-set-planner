import React from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { v4 } from 'uuid';
import populateDiagram from '../diagram-control';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const layers = this.state.objects.map(object => {
    //   let image = new Image();
    //   image.src = './../assets/Arri M8.png';
    //   return <Layer>{/* <Image image={image} /> */}</Layer>;
    // });

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
      >
        {/* {layers} */}
      </Stage>
    );
  }
}

export default Diagram;
