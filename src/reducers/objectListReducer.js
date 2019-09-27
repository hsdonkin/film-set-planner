const initialState = {
  arri_m8: {
    name: 'Arri M8',
    imgPath: './../assets/Arri M8.png'
  },
  joker_800: {
    name: 'Joker 800',
    imgPath: './../assets/Joker 800.png'
  },
  arri_alexa_mini: {
    name: 'Arri Alexa Mini',
    imgPath: './../assets/Arri Alexa Mini.png'
  },
  red_weapon: {
    name: 'Red Weapon',
    imgPath: './../assets/Red Weapon.png'
  }
};

const objectListReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default objectListReducer;
