import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger"
import reducer from "../reducers/reducer";
import LoginReducer from "../reducers/LoginReducer";

export default createStore(combineReducers({
  reducer, LoginReducer 
}),
  {},
  applyMiddleware(logger)
);