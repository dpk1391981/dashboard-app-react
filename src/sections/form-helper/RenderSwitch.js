import { Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FF4D42",
    "&:hover": {
      backgroundColor: alpha("#FF4D42", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FF4D42",
  },
}));

const RenderSwitch = ({ label, input, isCustomColor, handleClick, meta: { touched, invalid, error }, ...custom }) => (
  <PinkSwitch checked={isCustomColor} onClick={handleClick} {...input} {...custom} />
);

export default RenderSwitch;
