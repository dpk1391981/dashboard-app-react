import SvgColor from "../../../../components/svg-color";
import { FormControl, TextField } from "@mui/material";
const RenderColorInput = ({ handleClick, label, placeholder, input, meta: { touched, invalid, error }, ...custom }) => (
  <FormControl sx={{ m: 1, width: "25ch", margin: "0px 0px 15px 0px" }} variant='standard'>
    <TextField
      className='input-create-dashboard'
      InputProps={{
        startAdornment: (
          <SvgColor src={`/images/color-code.svg`} sx={{ width: 18, height: 18, margin: "10px", cursor: "pointer" }} />
        ),
      }}
      onClick={handleClick}
      placeholder={placeholder}
      type='text'
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
);

export default RenderColorInput;
