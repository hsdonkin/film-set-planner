const ArriAlexaMini = require("./../assets/Arri Alexa Mini.png");

import { initialState } from "./../constants/objectsListInitialState";

// const initialState = {
//   arri_m8: {
//     name: 'Arri M8',
//     imgPath: './../assets/Arri M8.png',
//     imgName: 'ArriM8'
//   },
//   joker_800: {
//     name: 'Joker 800',
//     imgPath: './../assets/Joker 800.png',
//     imgName: 'Joker800'
//   },
//   arri_alexa_mini: {
//     name: 'Arri Alexa Mini',
//     imgPath: './../assets/Arri Alexa Mini.png',
//     imgName: 'ArriAlexaMini'
//   },
//   red_weapon: {
//     name: 'Red Weapon',
//     imgPath: './../assets/Red Weapon.png',
//     imgName: 'RedWeapon'
//   }
// };

const objectListReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default objectListReducer;
