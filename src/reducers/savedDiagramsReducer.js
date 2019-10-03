import { v4 } from "uuid";

const initialState = {
  diagrams: {}
};

const savedDiagramsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "SAVE_NEW_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));
      newState.diagrams[v4()] = action.objects;
      return newState;
    default:
      return state;
  }
};

export default savedDiagramsReducer;
