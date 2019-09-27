import React from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { v4 } from 'uuid';
import populateDiagram from '../diagram-control';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [
        {
          name: 'Arri M8 A',
          id: v4(),
          selected: false,
          imgPath: './../assets/Arri M8.png',
          x: 0,
          y: 0
        },
        {
          name: 'Arri M8 B',
          id: v4(),
          selected: true,
          imgPath: './../assets/Arri M8.png',
          x: 50,
          y: 50
        }
      ]
    };
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

//  this is the old code with Konva sourced externally
// trying to just do it all in React now

//  handleSelectedChange = newSelection => {
//     let tempState = Object.assign({}, this.state);
//     // deselect all objects
//     tempState.objects.forEach(object => {
//       if (object.id === newSelection.id) {
//         object.selected = true;
//       } else {
//         object.selected = false;
//       }
//     });
//     this.setState({ objects: tempState.objects });
//     console.log(this.state);
//     this.forceUpdate();
//   };

//   componentDidMount = () => {
//     populateDiagram(this.state.objects, this.handleSelectedChange);
//   };

//   render() {
//     return <div id="stage" />;
//   }
// }
