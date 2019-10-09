import React from "react";
// redux
import { connect } from "react-redux";
import {
  deselectAllObjects,
  updateStageXYPosition,
  resetStageXYPosition,
  updateStageScale
} from "./../actions";
import { ActionCreators } from "redux-undo";
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
    this.stageRef = React.createRef();
    this.scaleTimer;
    this.state = {
      objects: this.props.objects,
      scale: this.props.diagram.stage.scale,
      offsetX: -2800,
      offsetY: -1600,
      loaded: false,
      showGrid: true,
      diagramHeight: window.innerHeight * 0.7,
      diagramWidth: window.innerWidth * 0.6
    };
  }

  componentDidMount = () => {
    console.log("component mounting");

    // new Image is async, so when it's loaded, change state to loaded:true
    let gridImage = new Image();
    gridImage.onload = () => {
      this.setState({
        ...this.state,
        loaded: true,
        gridImage: gridImage
      });
    };
    gridImage.src = graphPattern;

    // initial load canvas sizing
    // canvas can't be sized in CSS and has to be sized in javascript
    if (
      window.innerWidth < 1300 &&
      this.state.diagramWidth != window.innerWidth * 0.5
    ) {
      this.setState({
        ...this.state,
        diagramHeight: window.innerHeight * 0.6,
        diagramWidth: window.innerWidth * 0.5
      });
    } else if (
      window.innerWidth >= 1300 &&
      window.innerWidth < 1450 &&
      this.state.diagramWidth != window.innerWidth * 0.55
    ) {
      this.setState({
        ...this.state,
        diagramHeight: window.innerHeight * 0.6,
        diagramWidth: window.innerWidth * 0.55
      });
    } else if (
      window.innerWidth >= 1450 &&
      window.innerWidth < 1650 &&
      this.state.diagramWidth != window.innerWidth * 0.57
    ) {
      console.log("here");
      this.setState({
        ...this.state,
        diagramHeight: window.innerHeight * 0.6,
        diagramWidth: window.innerWidth * 0.57
      });
    } else {
      this.setState({
        ...this.state,
        diagramHeight: window.innerHeight * 0.6,
        diagramWidth: window.innerWidth * 0.65
      });
    }
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // grid toggle logic
    if (
      nextProps.diagram.stage.showGrid === true &&
      this.state.showGrid != true
    ) {
      this.setState({ ...this.state, showGrid: true });
      return true;
    } else if (
      nextProps.diagram.stage.showGrid === false &&
      this.state.showGrid != false
    ) {
      this.setState({ ...this.state, showGrid: false });
      return true;
    }

    return true;
  };

  componentWillUnmount = () => {
    // stop the resize timer from firing when component unmounts
    clearInterval(this.resizeTimer);
  };

  render() {
    // resizing canvas height and width has to be done with a state change
    // since the canvas h/w has to be declared in this document, it gets its hard pixel h/w value from the state
    // state change makes the component refresh
    window.onresize = e => {
      if (e.currentTarget.innerWidth < 1300) {
        this.setState({
          ...this.state,
          diagramHeight: e.currentTarget.innerHeight * 0.6,
          diagramWidth: e.currentTarget.innerWidth * 0.5
        });
      } else if (
        e.currentTarget.innerWidth >= 1300 &&
        e.currentTarget.innerWidth < 1450
      ) {
        this.setState({
          ...this.state,
          diagramHeight: e.currentTarget.innerHeight * 0.6,
          diagramWidth: e.currentTarget.innerWidth * 0.55
        });
      } else if (
        e.currentTarget.innerWidth >= 1450 &&
        e.currentTarget.innerWidth < 1650
      ) {
        this.setState({
          ...this.state,
          diagramHeight: e.currentTarget.innerHeight * 0.6,
          diagramWidth: e.currentTarget.innerWidth * 0.6
        });
      } else {
        this.setState({
          ...this.state,
          diagramHeight: e.currentTarget.innerHeight * 0.6,
          diagramWidth: e.currentTarget.innerWidth * 0.65
        });
      }
    };

    const {
      deselectAllObjects,
      updateStageXYPosition,
      updateStageScale,
      ActionCreators
    } = this.props;

    // extract objects from the redux store diagram
    // get stage for X Y positions
    const { objects, stage } = this.props.diagram;

    // unlocked objects layer
    let keys = Object.keys(objects);
    let objectImagesList = [];
    let lockedObjectImagesList = [];
    keys.forEach(key => {
      if (objects[key].locked === false) {
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
        // locked objects layer
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
    // graph paper is a rectangle with a repeating background image
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
      <React.Fragment>
        <Stage
          ref={this.stageRef}
          x={stage.x}
          y={stage.y}
          scaleX={this.state.scale}
          scaleY={this.state.scale}
          style={{
            border: "1px whitesmoke solid",
            display: "block",
            margin: "auto"
          }}
          width={this.state.diagramWidth}
          height={this.state.diagramHeight}
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
            // the stage is weird because it has a fixed size, but allows objects to be positioned outside of stage
            // clicking on stage appears to move the view, but it actually moves the entire stage under the view
            let newXPos = this.stageRef.current.attrs.x;
            let newYPos = this.stageRef.current.attrs.y;
            updateStageXYPosition(newXPos, newYPos);
          }}
          onContextMenu={() => {
            // this makes the context menu not appear when you right click to delete something
            // set to false, then 100ms after set it to true
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
            }

            this.scaleTimer = setTimeout(() => {
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram.present,
    showGrid: state.diagram.present.stage.showGrid
  };
};

export default connect(
  mapStateToProps,
  {
    deselectAllObjects,
    updateStageXYPosition,
    resetStageXYPosition,
    updateStageScale,
    ActionCreators
  }
)(Diagram);
