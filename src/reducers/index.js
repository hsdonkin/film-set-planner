import { combineReducers } from "redux";
import undoable from "redux-undo";

// current proj reducers
import objectDiagramReducer from "./objectDiagramReducer";
import objectListReducer from "./objectListReducer";
import savedDiagramsReducer from "./savedDiagramsReducer";

const rootReducer = combineReducers({
  diagram: undoable(objectDiagramReducer, { limit: 10 }),
  objects: objectListReducer,
  saved: savedDiagramsReducer
});

export default rootReducer;
