import {
  INITIATE_DASHBOARD_DETAIL,
  SUCCESS_DASHBOARD_DETAIL,
  FAIL_DASHBOARD_DETAIL,
  INITIATE_CREATE_DASHBOARD,
  SUCCESS_CREATE_DASHBOARD,
  FAIL_CREATE_DASHBOARD,
  INITIATE_DASHBOARD_USER,
  SUCCESS_DASHBOARD_USER,
  FAIL_DASHBOARD_USER,
  RESET_DASHBOARD_DETAIL,
} from "../actions/type";
const initialState = {
  dashboard: [],
  dashboard_detail: null,
  newDashbaord: null,
  loading: false,
  loading_detail: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INITIATE_DASHBOARD_USER:
      return {
        ...state,
        dashboard: payload,
        loading: true,
      };

    case SUCCESS_DASHBOARD_USER:
      return {
        ...state,
        dashboard: payload,
        loading: false,
      };

    case FAIL_DASHBOARD_USER:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case INITIATE_CREATE_DASHBOARD:
      return {
        ...state,
        newDashbaord: payload,
        loading: true,
      };

    case SUCCESS_CREATE_DASHBOARD:
      return {
        ...state,
        newDashbaord: payload,
        loading: false,
      };

    case FAIL_CREATE_DASHBOARD:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case INITIATE_DASHBOARD_DETAIL:
      return {
        ...state,
        dashboard_detail: payload,
        loading_detail: true,
      };

    case SUCCESS_DASHBOARD_DETAIL:
      return {
        ...state,
        dashboard_detail: payload,
        loading_detail: false,
      };

    case RESET_DASHBOARD_DETAIL:
      return {
        ...state,
        dashboard_detail: null,
        loading: false,
      };

    case FAIL_DASHBOARD_DETAIL:
      return {
        ...state,
        error: payload,
        loading_detail: false,
      };

    default:
      return state;
  }
}
