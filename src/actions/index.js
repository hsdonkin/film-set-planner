export const addObjectToDiagram = object => {
  return {
    type: 'ADD_TO_DIAGRAM',
    object: object
  };
};

export const removeObjectFromDiagram = objectID => {
  return {
    type: 'REMOVE_FROM_DIAGRAM',
    objectID: objectID
  };
};

export const toggleObjectSelected = object => {
  return {
    type: 'TOGGLE_ITEM_SELECTED',
    object: object
  };
};

export const updateXYPosition = object => {
  return {
    type: 'UPDATE_XY_POSITION',
    object: object
  };
};
