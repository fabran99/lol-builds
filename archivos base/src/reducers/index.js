import { combineReducers } from "redux";
import champsReducers from "./champsReducers";

export default combineReducers({
  champs: champsReducers
});
