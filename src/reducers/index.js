import { combineReducers } from "redux";

// current proj reducers
import objectDiagramReducer from "./objectDiagramReducer";
import objectListReducer from "./objectListReducer";
import savedDiagramsReducer from "./savedDiagramsReducer";

const rootReducer = combineReducers({
  diagram: objectDiagramReducer,
  objects: objectListReducer,
  saved: savedDiagramsReducer
});

export default rootReducer;
