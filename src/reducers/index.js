// redux/reducers/index.js
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import alert from "./alert";
import auth from "./auth";
import widget from "./widget";
import dashboard from "./dashboard";
import user from "./user";

const rootReducer = combineReducers({
  alert,
  user,
  auth,
  form: formReducer,
  widget,
  dashboard,
});

export default rootReducer;
