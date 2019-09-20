import React from 'react';
import ReactKonva from 'react-konva';
import { v4 } from 'uuid';
import Arri_M8 from './../assets/Arri M8.png';
import populateDiagram from '../diagram-control';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [
        {
          name: 'Arri M8',
          id: v4(),
          selected: false,
          imgPath: Arri_M8,
          x: 0,
          y: 0
        },
        {
          name: 'Arri M8',
          id: v4(),
          selected: true,
          imgPath: Arri_M8,
          x: 50,
          y: 50
        }
      ]
    };
  }

  componentDidMount = () => {
    populateDiagram(this.state.objects);
  };

  render() {
    return <div id="stage" />;
  }
}

export default Diagram;
