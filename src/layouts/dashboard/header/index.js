import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";

import { FavouriteDashboard } from "../../../actions/dashboard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import { connect } from "react-redux";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const Header = ({ user, onOpenNav, dashboard_detail, FavouriteDashboard }) => {
  const params = useLocation();
  const isEditPage = params[["pathname"]].includes("edit") ? true : false;
  console.log(`dashboard_detaildashboard_detail  -header`);
  console.log(dashboard_detail);

  const addFavourite = async (dId) => {
    await FavouriteDashboard(dId, user["_id"]);
  };

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}>
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1,
          }}>
          {/* <LanguagePopover /> */}

          {!isEditPage && dashboard_detail && (
            <>
              <IconButton
                color={"default"}
                to={"/dashboard/edit/" + dashboard_detail["_id"]}
                variant='contained'
                component={RouterLink}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                color={"default"}
                sx={{ width: 50, height: 50 }}
                onClick={() => addFavourite(dashboard_detail["_id"])}>
                {dashboard_detail["favourite"] ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </>
          )}

          {isEditPage && dashboard_detail && (
            <>
              <IconButton
                color={"default"}
                to={"/dashboard/view/" + dashboard_detail["_id"]}
                variant='contained'
                component={RouterLink}>
                <VisibilityIcon />
              </IconButton>
            </>
          )}
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
};

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  dashboard_detail: state.dashboard.dashboard_detail,
});
export default connect(mapStateToProps, { FavouriteDashboard })(Header);
