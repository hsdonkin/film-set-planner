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
useStrictMode(true);

// graph pattern
const graphPattern = require("./../assets/four-graph-pattern.png");

// dynamic image layer
import ObjectImage from "./ObjectImage";

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.refs = [];
    this.stageRef = React.createRef();
    this.scaleTimer;
    this.state = {
      objects: this.props.objects,
      scale: this.props.diagram.stage.scale,
      offsetX: -2800,
      offsetY: -1600,
      loaded: false,
      showGrid: true
    };
  }

  componentDidMount = () => {
    let gridImage = new Image();
    gridImage.onload = () => {
      this.setState({
        ...this.state,
        loaded: true,
        gridImage: gridImage
      });
    };

    gridImage.src = graphPattern;
  };

  handleScaleChange = () => {};

  handleResizeChange = () => {};

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.diagram.stage.showGrid === true &&
      this.state.showGrid != true
    ) {
      this.setState({ ...this.state, showGrid: true });
    } else if (
      nextProps.diagram.stage.showGrid === false &&
      this.state.showGrid != false
    ) {
      this.setState({ ...this.state, showGrid: false });
    }
    return true;
  };

  componentWillUnmount = () => {
    // clearInterval(this.scaleTimer);
  };

  render() {
    const {
      deselectAllObjects,
      updateStageXYPosition,
      updateStageScale
    } = this.props;
    const refs = [];
    // extract objects from the redux store diagram
    // get stage for X Y positions
    const { objects, stage } = this.props.diagram;

    // unlocked objects
    let keys = Object.keys(objects);
    let objectImagesList = [];
    let lockedObjectImagesList = [];
    keys.forEach(key => {
      if (objects[key].locked === false) {
        refs.push(React.createRef(key));
        objectImagesList.push(
          <ObjectImage
            draggable={true}
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
      } else {
        lockedObjectImagesList.push(
          <ObjectImage
            draggable={false}
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
      }
    });

    // change the texture when scale hits a certain window
    let gridScale = 4;
    if (this.state.scale <= 0.1 && this.state.scale >= 0.06) {
      gridScale = 6.66666;
    } else if (this.state.scale <= 0.07 && this.state.scale >= 0.02) {
      gridScale = 20;
    } else if (this.state.scale <= 0.02) {
      gridScale = 40;
    }
    // graph paper conditional
    let gridRectangle;
    if (this.state.showGrid === true) {
      gridRectangle = (
        <Rect
          x={0}
          y={0}
          scaleX={gridScale}
          scaleY={gridScale}
          offsetX={4000}
          offsetY={4000}
          height={8000}
          width={8000}
          fillPatternImage={this.state.gridImage}
          fillPatternRepeat={"repeat"}
          fillPatternOffsetX={250}
          fillPatternOffsetY={100}
          opacity={0.3}
          onMouseDown={e => {
            deselectAllObjects();
          }}
        />
      );
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
            updateStageScale(stage.scale);
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
            // setTimeout to increase performance, just update the redux store with a new scale after a second
            // more performant than every time a wheel event takes place
            clearInterval(this.scaleTimer);
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

            this.scaleTimer = setTimeout(() => {
              updateStageScale(this.state.scale);
              updateStageScale(this.state.scale);
            }, 1000);
          }}
        >
          <Layer id={"baseLayer"} />
          <Layer>{gridRectangle}</Layer>
          <Layer key={v4()}>{lockedObjectImagesList}</Layer>
          <Layer key={v4()} draggable>
            <Group>{objectImagesList}</Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram,
    showGrid: state.diagram.stage.showGrid
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
