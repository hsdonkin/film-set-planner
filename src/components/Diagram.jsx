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
    this.scaleTimer;
    this.state = {
      objects: this.props.objects,
      scale: this.props.diagram.stage.scale,
      offsetX: -2800,
      offsetY: -1600,
      loaded: false
    };
    console.log("diagram props", this.props);
    if (this.props.diagram.stage.showGrid === true) {
      console.log("show grid");
    }
    let gridImage = new Image();
    gridImage.onload = () => {
      this.setState({
        ...this.state,
        loaded: true,
        gridImage: gridImage
      });
    };

    gridImage.src = graphPattern;
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

  componentWillUnmount = () => {
    // clearInterval(this.scaleTimer);
  };

  render() {
    console.log(this.state);
    console.log(this.props);

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

    // unlocked objects
    let keys = Object.keys(objects);
    let objectImagesList = [];
    let lockedObjectImagesList = [];
    keys.forEach(key => {
      console.log(objects[key].locked);
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

    // graph paper loading

    // change the texture when scale hits a certain window
    let gridScale = 4;
    if (this.state.scale <= 0.1 && this.state.scale >= 0.06) {
      console.log("updating grid scale");
      gridScale = 6.66666;
    } else if (this.state.scale <= 0.07 && this.state.scale >= 0.02) {
      gridScale = 20;
    } else if (this.state.scale <= 0.02) {
      gridScale = 40;
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
            console.log(
              "value of this.state.scale outside of setTImeout",
              this.state.scale
            );

            this.scaleTimer = setTimeout(() => {
              console.log(
                "value of this.state.scale in setTimeout",
                this.state.scale
              );
              // this needs to be here because localStorage is getting wrong value??
              // has to fire action twice
              updateStageScale(this.state.scale);
              updateStageScale(this.state.scale);
            }, 1000);
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
              fillPatternImage={this.state.gridImage}
              fillPatternRepeat={"repeat"}
              opacity={0.3}
              onMouseDown={e => {
                console.log("mouse down");
                deselectAllObjects();
              }}
            />
          </Layer>
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
