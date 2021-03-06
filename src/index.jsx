/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/

// react dependencies
import React from "react";
import ReactDOM from "react-dom";
// hot reload for development
import { AppContainer } from "react-hot-loader";

// react redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logger from "redux-logger";
import persistDataLocally from "./middleware";
import thunk from "redux-thunk";
import { ActionCreators } from "redux-undo";

let retrievedState;
try {
  retrievedState = localStorage.getItem("reduxStore");
  if (retrievedState === null) {
    retrievedState = {};
  }
  retrievedState = JSON.parse(retrievedState);
} catch (err) {
  retrievedState = {};
}

const store = createStore(
  rootReducer,
  retrievedState,
  applyMiddleware(logger, thunk)
);

// write data to localStorage whenever store is changed
store.subscribe(() => {
  localStorage["reduxStore"] = JSON.stringify(store.getState());
});

// redux undo
window.addEventListener("keypress", event => {
  if (event.key === "z" && event.ctrlKey === true) {
    store.dispatch(ActionCreators.undo());
  }
});

import App from "./App";

import "./style.scss";

const root = document.getElementById("root");

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    render(App);
  });
}
