import React from "react";
import { Checkbox, FormHelperText, Link } from "@mui/material";

const RenderCheckBox = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <>
    <div>
      <Checkbox {...input} {...custom} sx={touched && error ? { color: "red" } : {}} />
      <span>
        By creating an account, you agree to our <Link>Terms of Service.</Link>{" "}
      </span>
    </div>
  </>
);

export default RenderCheckBox;
