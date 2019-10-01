import { v4 } from "uuid";

const initialState = {
  selection: true,
  stage: {
    x: 0,
    y: 0,
    scale: 0.2
  },
  objects: {
    [v4()]: {
      name: "Arri M8",
      selected: false,
      imgPath: "./../assets/Arri M8.png",
      imgName: "ArriM8",
      x: 2000,
      y: 2000,
      rotation: 0
    },
    [v4()]: {
      name: "Arri M8",
      selected: true,
      imgPath: "./../assets/Arri M8.png",
      imgName: "ArriM8",
      x: 3000,
      y: 3000,
      rotation: 50
    }
  }
};

let objectOffset = 0;
let offsetTimer;
const objectDiagramReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_TO_DIAGRAM":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      console.log("NewState:", newState);
      console.log("Old State:", state);
      newState.objects[v4()] = {
        name: action.object.name,
        imgPath: action.object.imgPath,
        imgName: action.object.imgName,
        selected: false,
        x: 100 + objectOffset,
        y: 100 + objectOffset,
        rotation: 0
      };
      clearInterval(offsetTimer);
      objectOffset += 50;
      offsetTimer = setTimeout(function() {
        objectOffset = 0;
      }, 2000);
      return newState;
    case "REMOVE_FROM_DIAGRAM":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      delete newState.objects[action.objectID];
      return newState;
    case "REMOVE_ALL_FROM_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));
      newState.objects = {};
      return newState;
    case "TOGGLE_OBJECT_SELECTED":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      // make the true / false value of selected the opposite of previous value
      newState.objects[action.objectID].selected = !newState.objects[
        action.objectID
      ].selected;
      if (newState.objects[action.objectID].selected === true) {
        newState.selection = true;
      } else {
        newState.selection = false;
      }
      return newState;
    case "DESELECT_ALL_OBJECTS":
      newState = JSON.parse(JSON.stringify(state));
      const keys = Object.keys(newState.objects);

      keys.forEach(key => {
        newState.objects[key].selected = false;
      });
      newState.selection = false;
      return newState;

    case "UPDATE_XY_POSITION":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      newState.objects[action.objectID].x = action.x;
      newState.objects[action.objectID].y = action.y;
      return newState;

    case "UPDATE_STAGE_XY_POSITION":
      newState = JSON.parse(JSON.stringify(state));
      newState.stage = {
        x: action.x,
        y: action.y
      };
      return newState;
    case "UPDATE_ROTATION":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      newState.objects[action.objectID].rotation = action.rotation;
      return newState;
    default:
      return state;
  }
};

export default objectDiagramReducer;
