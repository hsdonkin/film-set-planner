import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';

// redux
import {connect} from 'react-redux'
import {updateXYPosition} from './../actions'

// all these requires have to be done here
// ha ha ha is this legal who knows
const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');
const RedWeapon = require('./../assets/Red Weapon.png');
const Joker800 = require('./../assets/Joker 800.png');
const ArriM8 = require('./../assets/Arri M8.png');

const ObjectImage = props => {
  // eval so that we can dynamically select images
  const [image] = useImage(eval(props.imgName));
  const {updateXYPosition} = props
  let xPos = props.x
  let yPos = props.y
  
  return <Image x={xPos} y={yPos} image={image} draggable={"true"} 
  onDragEnd={ 
    (event) => {
      console.log(event.currentTarget)
      const newXPos = event.currentTarget.attrs.x
      const newYPos = event.currentTarget.attrs.y
      updateXYPosition(props.objectID, newXPos, newYPos)
    }
  }
 />;
};

const mapStateToProps = (state) => {
  return ({objects: state.diagram.objects })
}

export default connect(mapStateToProps, {updateXYPosition})(ObjectImage);
