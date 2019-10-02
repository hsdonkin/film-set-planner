export const addObjectToDiagram = object => {
  return {
    type: "ADD_TO_DIAGRAM",
    object: object
  };
};

export const removeObjectFromDiagram = objectID => {
  return {
    type: "REMOVE_FROM_DIAGRAM",
    objectID: objectID
  };
};

export const removeAllFromDiagram = () => {
  return {
    type: "REMOVE_ALL_FROM_DIAGRAM"
  };
};

export const toggleObjectSelected = objectID => {
  return {
    type: "TOGGLE_OBJECT_SELECTED",
    objectID: objectID
  };
};

export const updateXYPosition = (objectID, xValue, yValue) => {
  return {
    type: "UPDATE_XY_POSITION",
    objectID: objectID,
    x: xValue,
    y: yValue
  };
};

export const updateStageXYPosition = (xValue, yValue) => {
  return {
    type: "UPDATE_STAGE_XY_POSITION",
    x: xValue,
    y: yValue
  };
};

export const resetStageXYPosition = () => {
  return {
    type: "RESET_STAGE_XY_POSITION"
  };
};

export const updateStageScale = scale => {
  return {
    type: "UPDATE_STAGE_SCALE",
    scale: scale
  };
};

export const updateRotation = (objectID, rotation) => {
  return {
    type: "UPDATE_ROTATION",
    objectID,
    rotation
  };
};

export const deselectAllObjects = () => {
  return { type: "DESELECT_ALL_OBJECTS" };
};
