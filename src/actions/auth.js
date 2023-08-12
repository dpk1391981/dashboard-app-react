import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_PROFILE,
  PROFILE_CLEAR,
} from "./type";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken.js";
import { getDashboardByUser } from "./dashboard";

export const loadedUser =
  (dashboardLoad = true) =>
  async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + "/api/auth");
      if (dashboardLoad) dispatch(getDashboardByUser(data["_id"]));
      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
export const register =
  ({ fullName, email, password, mobileNumber, agree }) =>
  async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const body = JSON.stringify({ fullName, email, password, mobileNumber, agree });
      try {
        const res = await axios.post(process.env.REACT_APP_API_URL + "/api/users", body, config);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Welcome onboard", "success"));
        dispatch(loadedUser());
        resolve(res);
      } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
        }
        dispatch({
          type: REGISTER_FAIL,
        });
        resolve(null);
      }
    });
  };

export const login = (email, password) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadedUser());
      resolve(res);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        console.log(`er.msger.msg`);
        console.log(errors);
        errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      resolve(null);
    }
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: PROFILE_CLEAR,
  });
};
