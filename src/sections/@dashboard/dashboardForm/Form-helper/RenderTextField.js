import SvgColor from "../../../../components/svg-color";
import { FormControl, TextField } from "@mui/material";
const RenderTextField = ({ label, placeholder, input, meta: { touched, invalid, error }, ...custom }) => (
  <FormControl
    className='input-create-dashboard'
    sx={{ m: 1, width: "25ch", margin: "0px 0px 15px 0px" }}
    variant='standard'>
    <TextField
      id='outlined-adornment-weight'
      aria-describedby='outlined-weight-helper-text'
      InputProps={{
        startAdornment: <SvgColor src={`/images/group-305.svg`} sx={{ width: 18, height: 18, margin: "10px" }} />,
      }}
      placeholder={placeholder}
      type='text'
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </FormControl>
);

export default RenderTextField;
