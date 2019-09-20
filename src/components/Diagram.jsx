import React from 'react';
import ReactKonva from 'react-konva';
import { v4 } from 'uuid';
import Arri_M8 from './../assets/Arri M8.png';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [
        { name: 'Arri M8', id: v4(), imgPath: Arri_M8, x: 0, y: 0 },
        { name: 'Arri M8', id: v4(), imgPath: Arri_M8, x: 50, y: 50 }
      ]
    };
  }

  componentDidMount() {}

  render() {
    const konvaLayers = this.state.objects.map(object => {
      let img = new Image();
      img.src = object.imgPath;
      return (
        <ReactKonva.Layer>
          <ReactKonva.Image
            image={img}
            draggable={true}
            x={object.x}
            y={object.y}
            key={object.id}
          />
        </ReactKonva.Layer>
      );
    });
    console.log(konvaLayers);

    return (
      <ReactKonva.Stage height={600} width={800}>
        {konvaLayers}
      </ReactKonva.Stage>
    );
  }
}

export default Diagram;
