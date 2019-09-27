import React from 'react';
// redux
import { connect } from 'react-redux';
// v4
import { v4 } from 'uuid';
// konva
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');

const ArriAlexaMiniImage = () => {
  const [image] = useImage(ArriAlexaMini);
  return <Image image={image} />;
};

class Diagram extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // extract objects from the redux store diagram
    const { objects } = this.props.diagram;
    let keys = Object.keys(objects);
    let layers = [];
    keys.forEach(key => {
      layers.push(
        <Layer key={v4()}>
          <ArriAlexaMiniImage />
        </Layer>
      );
    });

    console.log(layers);

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
        {layers}
      </Stage>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram
  };
};

export default connect(mapStateToProps)(Diagram);
