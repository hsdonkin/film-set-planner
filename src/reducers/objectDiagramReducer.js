import { v4 } from 'uuid';

const ArriAlexaMini = require('./../assets/Arri Alexa Mini.png');

const initialState = {
  objects: {
    [v4()]: {
      name: 'Arri M8',
      selected: false,
      imgPath: './../assets/Arri M8.png',
      imgName: 'ArriM8',
      x: 100,
      y: 100,
      rotation:0
    },
    [v4()]: {
      name: 'Arri M8',
      selected: true,
      imgPath: './../assets/Arri M8.png',
      imgName: 'ArriM8',
      x: 400,
      y: 400,
      rotation:0
    }
  }
};

const objectDiagramReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_DIAGRAM':
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      console.log('NewState:', newState);
      console.log('Old State:', state);
      newState.objects[v4()] = {
        name: action.object.name,
        imgPath: action.object.imgPath,
        imgName: action.object.imgName,
        selected: false,
        x: 0,
        y: 0
      };
      return newState;
    case 'REMOVE_FROM_DIAGRAM':
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      delete newState.objects[action.objectID];
      return newState;
    case 'TOGGLE_OBJECT_SELECTED':
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      // make the true / false value of selected the opposite of previous value
      newState.objects[action.objectID].selected = !newState.objects[
        action.objectID
      ].selected;
      return newState;
    case 'UPDATE_XY_POSITION':
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      newState.objects[action.objectID].x = action.x;
      newState.objects[action.objectID].y = action.y;
      return newState;

      case 'UPDATE_ROTATION':
        // using JSON parse here to avoid mutating state
        newState = JSON.parse(JSON.stringify(state)); 
        newState.objects[action.objectID].rotation = action.rotation;
        return newState
    default:
      return state;
  }
};

export default objectDiagramReducer;
