import React, {useState} from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';

// redux
import {connect} from 'react-redux'
import {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation, removeObjectFromDiagram} from './../actions'

// all these requires have to be done here
// ha ha ha is this legal who knows
const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');
const RedWeapon = require('./../assets/Red Weapon.png');
const Joker800 = require('./../assets/Joker 800.png');
const ArriM8 = require('./../assets/Arri M8.png');



class ObjectImage extends React.Component {
  constructor(props){
    super(props)
    this.KonvaImageRef = React.createRef();
    this.trRef = React.createRef(); 
    this.state = {
     selected: this.props.selected
    }
  }
  componentDidMount = () => {
    

  }
  render () {

    // track key presses for transform
    const keys = {};
    window.onkeyup =  (e) => { keys[e.keyCode] = false; console.log(keys); this.forceUpdate(); }
    window.onkeydown = (e) => { keys[e.keyCode] = true; console.log(keys); this.forceUpdate(); }

    let rotationAngles;
   
    
  

    const {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation, removeObjectFromDiagram} = this.props
    let xPos = this.props.x
    let yPos = this.props.y
    let rotation = this.props.rotation
    // eval so that we can dynamically select images
    let loadedImage = new Image ();
    loadedImage.src = eval(this.props.imgName)
    
    if (this.state.selected === true){

      this.trRef.current.setNode(this.KonvaImageRef.current)
   
    }

    
  

    return (
  
        <React.Fragment>
  
          <KonvaImage ref={this.KonvaImageRef} x={xPos} y={yPos} rotation={rotation} shadowColor={"gray"} shadowOffset={{x:0,y:0}} shadowBlur={50} shadowOpacity={0.3} image={loadedImage} draggable={"true"} 
          onDragEnd={ 
            (event) => {
              // update the X Y position by sending an action to redux store
              const newXPos = event.currentTarget.attrs.x
              const newYPos = event.currentTarget.attrs.y
              console.log(event.currentTarget.attrs)
              const newRotation = event.currentTarget.attrs.rotation
              updateXYPosition(this.props.objectID, newXPos, newYPos);
              updateRotation(this.props.objectID, newRotation);
            }
          }
          onClick ={
            () => {
              console.log("clicked")
              deselectAllObjects();
              this.setState({selected:!this.state.selected})
              if(keys[16] === true){
                
                console.log(rotationAngles)
              }
            }
          }
          
          onContextMenu={
            () => {
              removeObjectFromDiagram(this.props.objectID);
              // prevent the context menu from opening
              window.oncontextmenu = (e) => {
                setTimeout(function(){
                  window.oncontextmenu = () => {
                    return true
                  }
                }, 100)
                return false
              }
            }
          }

          onTransformEnd = {
            (event) => {
              const stage = event.currentTarget.parent.parent.attrs
              console.log(stage)
              console.log(event.currentTarget)
              const newXPos = event.currentTarget.attrs.x
              const newYPos = event.currentTarget.attrs.y
              const newRotation = event.currentTarget.attrs.rotation
              if (event.currentTarget.attrs.x <= 0){
                newXPos = 0;
              }
              if (event.currentTarget.attrs.x <= 0){
                newYPos = 0;
              }
              updateXYPosition(this.props.objectID, newXPos, newYPos);
              updateRotation(this.props.objectID, newRotation);
            }
          }
          />
          <Transformer ref={this.trRef} rotationSnaps={[0,45,90,135,180,225,270, 315, 360]}  resizeEnabled={false} borderDash={[15,15]} padding={10}/> 
       
        </React.Fragment>
  
    );
  };
  }

const mapStateToProps = (state) => {
  return ({objects: state.diagram.objects })
}

export default connect(mapStateToProps, {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation, removeObjectFromDiagram})(ObjectImage);
