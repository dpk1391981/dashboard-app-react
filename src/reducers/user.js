import {
  INITITATE_USER_LIST,
  SUCCESS_USER_LIST,
  FAIL_USER_LIST,
  INITITATE_USER_PROFILE_UPDATE,
  SUCCESS_USER_PROFILE_UPDATE,
  FAIL_USER_PROFILE_UPDATE,
} from "../actions/type";
const initialState = {
  userList: [],
  user_profile: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INITITATE_USER_LIST:
      return {
        ...state,
        userList: payload,
        loading: true,
      };

    case SUCCESS_USER_LIST:
      return {
        ...state,
        userList: payload,
        loading: false,
      };

    case FAIL_USER_LIST:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case INITITATE_USER_PROFILE_UPDATE:
      return {
        ...state,
        user_profile: payload,
        loading: true,
      };

    case SUCCESS_USER_PROFILE_UPDATE:
      return {
        ...state,
        user_profile: payload,
        loading: false,
      };

    case FAIL_USER_PROFILE_UPDATE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
