import React from "react";
// redux
import { connect } from "react-redux";
import {
  deselectAllObjects,
  updateStageXYPosition,
  resetStageXYPosition,
  updateStageScale
} from "./../actions";
// v4
import { v4 } from "uuid";
// konva
import {
  Stage,
  Layer,
  Group,
  Transformer,
  Image as KonvaImage,
  Rect
} from "react-konva";
import { useStrictMode } from "react-konva";

// graph pattern
const graphPattern = require("./../assets/four-graph-pattern.png");

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
      offsetX: -2800,
      offsetY: -1600,
      loaded: false
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
    console.log("current offset", this.state.offsetX, this.state.offsetY);
    const {
      deselectAllObjects,
      updateStageXYPosition,
      updateStageScale
    } = this.props;
    const refs = [];
    // extract objects from the redux store diagram
    // get stage for X Y positions
    const { objects, stage } = this.props.diagram;

    let keys = Object.keys(objects);
    let objectImagesList = [];
    let lockedObjectImagesList = [];
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

    // graph paper loading
    let loadedImage = new Image();
    if (this.state.loaded === false) {
      loadedImage.onload = () => {
        this.setState({ ...this.state, loaded: true });
      };
    }
    loadedImage.src = graphPattern;
    // change the texture when scale hits a certain window
    let gridScale = 4;
    if (this.state.scale <= 0.1 && this.state.scale >= 0.05) {
      console.log("updating grid scale");
      gridScale = 10;
    } else if (this.state.scale <= 0.05) {
      gridScale = 30;
    }

    return (
      <div className="diagram">
        <Stage
          ref={this.stageRef}
          x={stage.x}
          y={stage.y}
          scaleX={this.state.scale}
          scaleY={this.state.scale}
          style={{
            border: "1px whitesmoke solid",
            display: "inline-block"
          }}
          width={1000}
          height={800}
          offsetX={this.state.offsetX}
          offsetY={this.state.offsetY}
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
          onDragEnd={() => {
            let newXPos = this.stageRef.current.attrs.x;
            let newYPos = this.stageRef.current.attrs.y;
            updateStageXYPosition(newXPos, newYPos);
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

            if (
              this.state.scale >= 0.01 &&
              this.state.scale + scaleChange * 0.0001 >= 0.01 &&
              this.state.scale <= 0.3 &&
              this.state.scale + scaleChange * 0.0001 <= 0.3
            ) {
              this.setState({
                ...this.state,
                scale: this.state.scale + scaleChange * 0.0001
              });
              // this.setState({
              //   scale: this.state.scale + scaleChange * 0.0001,
              //   offsetX:
              //     this.state.offsetX +
              //     scaleChange * 0.5 * Math.sign(scaleChange),
              //   offsetY:
              //     this.state.offsetY +
              //     scaleChange * 0.5 * Math.sign(scaleChange)
              // });
              // updateStageScale(this.state.scale + scaleChange * 0.0001);
            }
            console.log(this.state);
          }}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              scaleX={gridScale}
              scaleY={gridScale}
              offsetX={4000}
              offsetY={4000}
              height={8000}
              width={8000}
              fillPatternImage={loadedImage}
              fillPatternRepeat={"repeat"}
              opacity={0.3}
            />
          </Layer>
          <Layer key={v4()} draggable>
            <Group>{objectImagesList}</Group>
          </Layer>
          <Layer key={v4()}>{lockedObjectImagesList}</Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.diagram);
  return {
    diagram: state.diagram
  };
};

export default connect(
  mapStateToProps,
  {
    deselectAllObjects,
    updateStageXYPosition,
    resetStageXYPosition,
    updateStageScale
  }
)(Diagram);
