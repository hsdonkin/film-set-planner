import React from 'react';

// konva
import { Image } from 'react-konva';
import useImage from 'use-image';

const ArriAlexaMini = require('./../../assets/Arri Alexa Mini.png');
const RedWeapon = require('./../../assets/Red Weapon.png');
const ArriM8 = require('./../../assets/Arri M8.png');
const Joker800 = require('./../../assets/Joker 800.png');

export const ArriAlexaMiniImage = () => {
  const [image] = useImage(ArriAlexaMini);
  return <Image image={image} />;
};

export const RedWeaponImage = () => {
  const [image] = useImage(RedWeapon);
  return <Image image={image} />;
};
