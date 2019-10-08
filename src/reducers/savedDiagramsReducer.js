import { v4 } from "uuid";

const initialState = {
  diagrams: {}
};

const savedDiagramsReducer = (state = initialState, action) => {
  let newState;
  let match;
  let matchID;
  switch (action.type) {
    case "SAVE_NEW_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));
      const objectIDs = Object.keys(newState.diagrams);

      if (objectIDs.length > 0) {
        objectIDs.forEach(id => {
          if (newState.diagrams[id].name === action.name) {
            match = true;
            matchID = id;
          } else {
            match = false;
          }
        });
      }

      if (match === false) {
        newState.diagrams[v4()] = {
          name: action.name,
          description: action.description,
          objects: action.objects
        };
      } else {
        newState.diagrams[matchID] = {
          name: action.name,
          description: action.description,
          objects: action.objects
        };
      }
      return newState;

    case "DELETE_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));

      delete newState.diagrams[action.diagramID];
      return newState;
    default:
      return state;
  }
};

export default savedDiagramsReducer;
