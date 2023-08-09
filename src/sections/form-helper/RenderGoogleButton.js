import { Button } from "@mui/material";
import Iconify from "../../components/iconify";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const RenderGoogleButton = ({ handleClick }) => (
  <Button fullWidth size='large' color='inherit' variant='outlined' onClick={handleClick}>
    <Iconify icon='eva:google-fill' color='#DF3E30' width={22} height={22} />
  </Button>
);

export default RenderGoogleButton;
