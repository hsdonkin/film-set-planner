import { v4 } from "uuid";

const initialState = {
  diagrams: {}
};

const savedDiagramsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SAVE_NEW_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));
      newState.diagrams[v4()] = {
        name: action.name,
        description: action.description,
        objects: action.objects
      };
      return newState;
    case "DELETE_DIAGRAM":
      console.log("in SavedDIagramsReducer");
      newState = JSON.parse(JSON.stringify(state));
      console.log("newState in savedDiagramsReducer", newState);
      delete newState.diagrams[action.diagramID];
      return newState;
    default:
      return state;
  }
};

export default savedDiagramsReducer;
