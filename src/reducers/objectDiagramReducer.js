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
  switch (action.type) {
    case 'ADD_TO_DIAGRAM':
      let newState = Object.assign({}, state);
      newState.objects[v4()] = {
        name: action.object.name,
        imgPath: action.object.imgPath,
        selected: false,
        x: 0,
        y: 0
      };
      return newState;
    case 'REMOVE_FROM_DIAGRAM':
      return state;
    case 'TOGGLE_OBJECT_SELECTED':
      return state;
    case 'UPDATE_XY_POSITION':
      return state;
    default:
      return state;
  }
};

export default objectDiagramReducer;
