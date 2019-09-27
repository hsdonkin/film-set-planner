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

export const toggleObjectSelected = objectID => {
  return {
    type: 'TOGGLE_OBJECT_SELECTED',
    objectID: objectID
  };
};

export const updateXYPosition = (objectID, xValue, yValue) => {
  return {
    type: 'UPDATE_XY_POSITION',
    objectID: objectID,
    x: xValue,
    y: yValue
  };
};
