import React from 'react';

// konva
import { Image } from 'react-konva';
import useImage from 'use-image';

const ArriAlexaMini = require('./../../assets/Arri Alexa Mini.png');

export const ArriAlexaMiniImage = () => {
  const [image] = useImage(ArriAlexaMini);
  return <Image image={image} />;
};
