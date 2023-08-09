import { INITITATE_USER_LIST, SUCCESS_USER_LIST, FAIL_USER_LIST } from "./type";
import axios from "axios";

//All user list
export const AllUserList = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: INITITATE_USER_LIST,
      });

      const { data } = await axios.get("/api/users");

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
