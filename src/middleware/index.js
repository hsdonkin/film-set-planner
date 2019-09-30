const persistDataLocally = store => next => action => {
    localStorage['reduxStore'] = JSON.stringify(store.getState());
    return next(action);
  }
  
  export default persistDataLocally;