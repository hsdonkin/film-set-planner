import React from "react";
// redux
import { connect } from "react-redux";
import { deselectAllObjects } from "./../actions";
// v4
import { v4 } from "uuid";
// konva
import { Stage, Layer, Group, Transformer } from "react-konva";
import { useStrictMode } from "react-konva";

useStrictMode(true);

// dynamic image layer
import ObjectImage from "./ObjectImage";

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.refs = [];
    this.stageRef = React.createRef();
    this.state = {
      objects: this.props.objects,
      scale: 0.2,
      offsetX: 0,
      offsetY: 0
    };
  }

  handleScaleChange = () => {};

  handleResizeChange = () => {};

  shouldComponentUpdate = (nextProps, nextState) => {
    // need to check how many properties diagram.objects has
    // this tells us if a new thing was added to the diagram, if not don't update it
    // disabling this creates performance issues where the diagram flickers

    // having issues where this conditional randomly stopped working ???

    // if (
    //   Object.keys(nextProps.diagram.objects).length ===
    //   Object.keys(this.props.diagram.objects).length
    // ) {
    //   return false;
    // } else {
    //   console.log("diagram is updating");
    //   return true;
    // }
    return true;
  };

  render() {
    console.log("stageref", this.stageRef);
    const { deselectAllObjects } = this.props;
    const refs = [];
    // extract objects from the redux store diagram
    const { objects } = this.props.diagram;
    let keys = Object.keys(objects);
    let objectImagesList = [];
    keys.forEach(key => {
      refs.push(React.createRef(key));
      objectImagesList.push(
        <ObjectImage
          ref={key}
          key={key}
          imgName={objects[key].imgName}
          objectID={key}
          x={objects[key].x}
          y={objects[key].y}
          rotation={objects[key].rotation}
          selected={objects[key.selected]}
          stageDimensions={{
            width: window.innerWidth,
            height: window.innerHeight
          }}
        />
      );
    });

    return (
      <Stage
        ref={this.stageRef}
        scaleX={this.state.scale}
        scaleY={this.state.scale}
        style={{
          border: "1px whitesmoke solid",
          display: "inline-block",
          height: "80vh",
          width: "75vw"
        }}
        width={1000}
        height={800}
        offsetX={0}
        offsetY={0}
        draggable
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            // selectShape(null);
            deselectAllObjects();
            this.forceUpdate();
          }
        }}
        onContextMenu={() => {
          window.oncontextmenu = e => {
            setTimeout(function() {
              window.oncontextmenu = () => {
                return true;
              };
            }, 100);
            return false;
          };
        }}
        onWheel={e => {
          let scaleChange = e.evt.deltaY;
          this.setState({
            scale: this.state.scale + scaleChange * 0.0001
          });
        }}
      >
        <Layer key={v4()} draggable>
          {objectImagesList}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram
  };
};

export default connect(
  mapStateToProps,
  { deselectAllObjects }
)(Diagram);
