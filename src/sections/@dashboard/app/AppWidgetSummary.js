// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
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
  height: theme.spacing(5),
  justifyContent: "center",
  marginBottom: theme.spacing(0),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  svgicon,
  subtitle,
  total,
  icon,
  customcolor = "",
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: "0px 20px 50px 0px rgba(220, 224, 249, 0.50)",
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => "#FDFDFF",
        borderRadius: "15px",
        ...sx,
      }}
      {...other}>
      <StyledIcon
        sx={{
          color: (theme) => customcolor || theme.palette[color].dark,
          backgroundImage: (theme) =>
            svgicon
              ? ``
              : `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24,
                )} 100%)`,
        }}>
        {svgicon ? (
          <SvgColor src={svgicon} sx={{ width: 1, height: 1 }} />
        ) : (
          <Iconify icon={icon} width={24} height={24} />
        )}
      </StyledIcon>

      <Typography variant='h3'>{fShortenNumber(total)}</Typography>

      <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant='subtitle1' color={customcolor}>
          {subtitle}
        </Typography>
      )}
    </Card>
  );
}
