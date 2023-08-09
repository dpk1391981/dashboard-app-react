import React from "react";
import FieldInput from "./FieldInput";

const RenderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <FieldInput placeholder={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />
);

export default RenderTextField;
