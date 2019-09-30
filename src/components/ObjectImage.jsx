import React, {useState} from 'react';
import useImage from 'use-image';
import { Image, Transformer } from 'react-konva';

// redux
import {connect} from 'react-redux'
import {updateXYPosition, toggleObjectSelected} from './../actions'

// all these requires have to be done here
// ha ha ha is this legal who knows
const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');
const RedWeapon = require('./../assets/Red Weapon.png');
const Joker800 = require('./../assets/Joker 800.png');
const ArriM8 = require('./../assets/Arri M8.png');



const ObjectImage = props => {
  // eval so that we can dynamically select images
  const [image] = useImage(eval(props.imgName));
  let [rotation] = useState(props.rotation)
  const {updateXYPosition, toggleObjectSelected} = props
  let xPos = props.x
  let yPos = props.y
  return (

      <React.Fragment>

        <Image ref={props.ref} x={xPos} y={yPos} rotation={rotation} image={image} draggable={"true"} 
        onDragEnd={ 
          (event) => {
            // update the X Y position by sending an action to redux store
            const newXPos = event.currentTarget.attrs.x
            const newYPos = event.currentTarget.attrs.y
            updateXYPosition(props.objectID, newXPos, newYPos)
          }
        }
        onClick ={
          (event) => {
            toggleObjectSelected(props.objectID)
          }
        }
        />
     
      </React.Fragment>

  );
};

const mapStateToProps = (state) => {
  return ({objects: state.diagram.objects })
}

export default connect(mapStateToProps, {updateXYPosition, toggleObjectSelected})(ObjectImage);
