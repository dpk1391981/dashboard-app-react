import { INITITATE_USER_LIST, SUCCESS_USER_LIST, FAIL_USER_LIST } from "../actions/type";
const initialState = {
  userList: [],
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

    default:
      return state;
  }
}
