import {
  INITIATE_CREATE_DASHBOARD,
  SUCCESS_DASHBOARD_DETAIL,
  FAIL_CREATE_DASHBOARD,
  INITIATE_DASHBOARD_DETAIL,
  SUCCESS_CREATE_DASHBOARD,
  FAIL_DASHBOARD_DETAIL,
  INITIATE_DASHBOARD_USER,
  SUCCESS_DASHBOARD_USER,
  FAIL_DASHBOARD_USER,
  RESET_DASHBOARD_DETAIL,
} from "./type";
import axios from "axios";
import { setAlert } from "./alert";

//@loadAllWidgets
export const resetDashboard = () => async (dispatch) => {
  dispatch({
    type: RESET_DASHBOARD_DETAIL,
  });
};

//@loadAllWidgets
export const getDashboardByUser = (userId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: INITIATE_DASHBOARD_USER,
      });
      const { data } = await axios.get("/api/dashboard/" + userId);
      dispatch({
        type: SUCCESS_DASHBOARD_USER,
        payload: data,
      });
      resolve(data);
    } catch (error) {
      dispatch({
        type: FAIL_DASHBOARD_USER,
      });
    }
  });
};

//@loadAllWidgets
export const GetDashboardById = (id) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: INITIATE_DASHBOARD_DETAIL,
      });
      const { data } = await axios.get("/api/dashboard/view/" + id);
      dispatch({
        type: SUCCESS_DASHBOARD_DETAIL,
        payload: data,
      });
      resolve(data);
    } catch (error) {
      dispatch({
        type: FAIL_DASHBOARD_DETAIL,
      });
    }
  });
};

export const createDashboard = (params, userId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify(params);
    try {
      const res = await axios.post("/api/dashboard/create", body, config);

      dispatch({
        type: SUCCESS_CREATE_DASHBOARD,
        payload: res.data,
      });
      dispatch(getDashboardByUser(userId));
      dispatch(setAlert("Welcome to new dashboard!", "success"));
      resolve(res);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
      }
      dispatch({
        type: FAIL_CREATE_DASHBOARD,
      });
      resolve(null);
    }
  });
};

export const UpdateDashboard = (params, userId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify(params);
    try {
      const res = await axios.put("/api/dashboard/edit/" + params["_id"], body, config);

      dispatch({
        type: SUCCESS_CREATE_DASHBOARD,
        payload: res.data,
      });
      dispatch(getDashboardByUser(userId));
      dispatch(GetDashboardById(res.data["_id"]));
      dispatch(setAlert("Saved!", "success"));
      resolve(res);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
      }
      dispatch({
        type: FAIL_CREATE_DASHBOARD,
      });
      resolve(null);
    }
  });
};

export const FavouriteDashboard = (dashboard, uid) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({});
    try {
      const res = await axios.put("/api/dashboard/favourite/" + dashboard, body, config);

      console.log(`resresres`);
      console.log(res);
      dispatch({
        type: SUCCESS_CREATE_DASHBOARD,
        payload: res.data,
      });
      // dispatch(getDashboardByUser(uid));
      dispatch(GetDashboardById(res.data["_id"]));

      resolve(1);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((er) => dispatch(setAlert(er.msg, "error")));
      }
      dispatch({
        type: FAIL_CREATE_DASHBOARD,
      });
      resolve(null);
    }
  });
};
