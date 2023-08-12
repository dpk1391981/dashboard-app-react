import {
  INITITATE_USER_LIST,
  SUCCESS_USER_LIST,
  FAIL_USER_LIST,
  INITITATE_USER_PROFILE_UPDATE,
  SUCCESS_USER_PROFILE_UPDATE,
  FAIL_USER_PROFILE_UPDATE,
} from "./type";
import { setAlert } from "./alert";
import axios from "axios";
import { loadedUser } from "./auth";

//All user list
export const AllUserList = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: INITITATE_USER_LIST,
      });

      const { data } = await axios.get(process.env.REACT_APP_API_URL + "/api/users");

      if (data) {
        dispatch({
          type: SUCCESS_USER_LIST,
          payload: data,
        });
        resolve(data);
      }
    } catch (err) {
      dispatch({
        type: FAIL_USER_LIST,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      reject(null);
    }
  });
};

export const UpdateUserProfile = (params) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify(params);
    try {
      dispatch({
        type: INITITATE_USER_PROFILE_UPDATE,
      });
      const res = await axios.put(process.env.REACT_APP_API_URL + "/api/users/profile/update", body, config);
      dispatch({
        type: SUCCESS_USER_PROFILE_UPDATE,
        payload: res.data,
      });
      dispatch(loadedUser(false));
      dispatch(setAlert("Profile updated!", "success"));
      resolve(res);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
      }
      dispatch({
        type: FAIL_USER_PROFILE_UPDATE,
      });
      resolve(null);
    }
  });
};
