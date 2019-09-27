import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';

// all these requires have to be done here
// ha ha ha is this legal who knows
const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');
const RedWeapon = require('./../assets/Red Weapon.png');
const Joker800 = require('./../assets/Joker 800.png');
const ArriM8 = require('./../assets/Arri M8.png');

const ObjectImage = props => {
  // eval so that we can dynamically select images
  const [image] = useImage(eval(props.imgName));
  return <Image image={image} />;
};

export default ObjectImage;
