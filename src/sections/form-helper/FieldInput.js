import { Fragment, useState } from "react";
import { TextField } from "@mui/material";
import "./fieldInput.css";

const FieldInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, name, errors, onChange, type, ...inputProps } = props;

  const onHandleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='div-container'>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea {...inputProps} onChange={onChange} onBlur={onHandleFocus} />
      ) : (
        <TextField
          type={type}
          {...inputProps}
          onChange={onChange}
          onBlur={onHandleFocus}
          // focused={focused.toString()}
        />
      )}
      {/* {Object.keys(errors).length > 0 && <span className='error-msg'>{errors[name]}</span>} */}
    </div>
  );
};

export default FieldInput;
