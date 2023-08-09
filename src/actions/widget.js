import { INITIATE_WIDGETS, SUCCESS_WIDGETS, FAIL_WIDGETS } from "./type";
import axios from "axios";

//@loadAllWidgets
export const loadAllWidgets = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: INITIATE_WIDGETS,
      });
      const { data } = await axios.get("/api/widget");
      dispatch({
        type: SUCCESS_WIDGETS,
        payload: data,
      });
      resolve(data);
    } catch (error) {
      dispatch({
        type: FAIL_WIDGETS,
      });
    }
  });
};
