import * as uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./type";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const successAlert = (msg) => {
  toast(msg, {
    icon: (
      <span style={{ color: "green" }}>
        <CheckCircleIcon />
      </span>
    ),
  });
};

const errorAlert = (message) => {
  toast(message, {
    icon: (
      <span style={{ color: "red", fontSize: "12px" }}>
        <CancelIcon />
      </span>
    ),
  });
};

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuid.v4();
    switch (alertType) {
      case "success":
        successAlert(msg);
        break;

      case "error":
        errorAlert(msg);
        break;

      default:
        break;
    }
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout,
    );
  };
