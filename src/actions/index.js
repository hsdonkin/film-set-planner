export const addItemToDiagram = item => {
  return {
    type: 'ADD_TO_DIAGRAM',
    item: item
  };
};

export const removeItemFromDiagram = item => {
  return {
    type: 'REMOVE_FROM_DIAGRAM',
    item: item
  };
};

export const toggleItemSelected = item => {
  return {
    type: 'TOGGLE_ITEM_SELECTED',
    item: item
  };
};

export const updateXYPosition = item => {
  return {
    type: 'UPDATE_XY_POSITION',
    item: item
  };
};
