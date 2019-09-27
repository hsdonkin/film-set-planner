import { v4 } from 'uuid';

const initialState = {
  objects: {
    [v4()]: {
      name: 'Arri M8',
      selected: false,
      imgPath: './../assets/Arri M8.png',
      x: 0,
      y: 0
    },
    [v4()]: {
      name: 'Arri M8',
      selected: true,
      imgPath: './../assets/Arri M8.png',
      x: 50,
      y: 50
    }
  }
};

const objectDiagramReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_DIAGRAM':
      newState = Object.assign({}, state);
      newState.objects[v4()] = {
        name: action.object.name,
        imgPath: action.object.imgPath,
        selected: false,
        x: 0,
        y: 0
      };
      return newState;
    case 'REMOVE_FROM_DIAGRAM':
      newState = Object.assign({}, state);
      delete newState.objects[action.objectID];
      return newState;
    case 'TOGGLE_OBJECT_SELECTED':
      return state;
    case 'UPDATE_XY_POSITION':
      return state;
    default:
      return state;
  }
};

export default objectDiagramReducer;
