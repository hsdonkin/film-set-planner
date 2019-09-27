import { combineReducers } from 'redux';

// current proj reducers
import itemDiagramReducer from './itemDiagramReducer';

const rootReducer = combineReducers({
  diagram: itemDiagramReducer
});

export default rootReducer;
