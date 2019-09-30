const persistDataLocally = store => next => action => {
    localStorage['reduxStore'] = JSON.stringify(store.getState());
    console.log(localStorage)
    return next(action);
  }
  
  export default persistDataLocally;