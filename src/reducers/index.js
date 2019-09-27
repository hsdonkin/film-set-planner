import { combineReducers } from 'redux';

// current proj reducers
import objectDiagramReducer from './objectDiagramReducer';
import objectListReducer from './objectListReducer';

const rootReducer = combineReducers({
  diagram: objectDiagramReducer,
  objects: objectListReducer
});

export default rootReducer;
