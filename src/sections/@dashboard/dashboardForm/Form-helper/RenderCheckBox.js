import SvgColor from "../../../../components/svg-color";
import { FormControl, Checkbox } from "@mui/material";

const commonCheckBoxColor = {
  "&.Mui-checked": {
    color: "#FF4D42",
  },
};

const RenderCheckBox = ({
  handleChange,
  checked,
  label,
  placeholder,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl>
    <Checkbox
      sx={commonCheckBoxColor}
      type='checkbox'
      checked={checked}
      onChange={handleChange}
      {...input}
      {...custom}
    />
  </FormControl>
);

export default RenderCheckBox;
