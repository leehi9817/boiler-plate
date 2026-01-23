import { combineReducers } from "redux";

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  dummy: dummyReducer,
});

export default rootReducer;
