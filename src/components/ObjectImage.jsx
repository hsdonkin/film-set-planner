import React, {useState} from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';

// redux
import {connect} from 'react-redux'
import {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation} from './../actions'

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
  

    const {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation} = this.props
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
  
          <KonvaImage ref={this.KonvaImageRef} x={xPos} y={yPos} rotation={rotation} image={loadedImage} draggable={"true"} 
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
              this.setState({selected:!this.state.selected})
              
            }
          }
          onTransformEnd = {
            (event) => {
              const newXPos = event.currentTarget.attrs.x
              const newYPos = event.currentTarget.attrs.y
              const newRotation = event.currentTarget.attrs.rotation
              updateXYPosition(this.props.objectID, newXPos, newYPos);
              updateRotation(this.props.objectID, newRotation);
            }
          }
          />
          <Transformer ref={this.trRef}/> 
       
        </React.Fragment>
  
    );
  };
  }

const mapStateToProps = (state) => {
  return ({objects: state.diagram.objects })
}

export default connect(mapStateToProps, {updateXYPosition, toggleObjectSelected, deselectAllObjects, updateRotation})(ObjectImage);
