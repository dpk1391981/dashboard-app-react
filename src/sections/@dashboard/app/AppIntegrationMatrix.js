// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Button, CardContent, Box, Paper, Avatar } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/iconify";
import SvgColor from "../../../components/svg-color";
// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppIntegrationMatrix.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppIntegrationMatrix({
  matrix,
  title,
  svgicon,
  subtitle,
  total,
  icon,
  customcolor = "",
  color = "primary",
  sx,
  handleClickOpen,
  ...other
}) {
  return (
    <div {...other}>
      <Box>
        <div style={{ display: "flex" }}>
          <img alt={matrix.title} src={matrix.logo} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant='h4' sx={{ margin: "0px 0px 0px 22px" }}>
              {matrix.title}
            </Typography>
          </div>
        </div>
      </Box>
      <Button
        onClick={handleClickOpen}
        variant='contained'
        style={{
          display: "flex",
          width: "322px",
          padding: "8px 23px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
          background: "#FF4D42",
          margin: "45px 0px 0px 0px",
        }}>
        <span
          style={{
            color: "#FFF",
            fontSize: "17.5px",
            fontWeight: 500,
            lineHeight: "normal",
          }}>
          Connect
        </span>
      </Button>
    </div>
  );
}
