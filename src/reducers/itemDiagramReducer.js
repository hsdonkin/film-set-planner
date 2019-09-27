const initialState = {};

const itemDiagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_DIAGRAM':
      return state;
    case 'REMOVE_FROM_DIAGRAM':
      return state;
    case 'TOGGLE_ITEM_SELECTED':
      return state;
    case 'UPDATE_XY_POSITION':
      return state;
    default:
      return state;
  }
};

export default itemDiagramReducer;
