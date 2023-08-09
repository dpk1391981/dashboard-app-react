import { INITIATE_WIDGETS, SUCCESS_WIDGETS, FAIL_WIDGETS } from "../actions/type";
const initialState = {
  widgets: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INITIATE_WIDGETS:
      return {
        ...state,
        widgets: payload,
        loading: true,
      };

    case SUCCESS_WIDGETS:
      return {
        ...state,
        widgets: payload,
        loading: false,
      };

    case FAIL_WIDGETS:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
