import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk)),
);

export default store;
