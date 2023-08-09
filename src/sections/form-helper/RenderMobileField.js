import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const RenderMobileField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <>
    <PhoneInput
      label='Email address'
      inputStyle={{ width: "100%" }}
      country={"us"}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      inputProps={{
        name: "mobileNumber",
        required: true,
      }}
      {...input}
      {...custom}
    />
    {touched && error && <p className='mobile-error'>{error}</p>}
  </>
);

export default RenderMobileField;
