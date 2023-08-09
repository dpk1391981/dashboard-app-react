import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { connect } from "react-redux";
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 80;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout = ({ isAuthenticated, dashboard_detail, DashboardEditForm }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useLocation();
  const isEditPage = params[["pathname"]].includes("edit") ? true : false;

  if (!isAuthenticated) {
    return navigate("/login");
  }
  const primaryColor = dashboard_detail && dashboard_detail["color"] && dashboard_detail["color"]["primary"];
  const colorCode =
    isEditPage && DashboardEditForm && DashboardEditForm["color_code"]
      ? DashboardEditForm["color_code"]
      : primaryColor
      ? primaryColor
      : "";
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Paper sx={{ padding: "30px", width: "100%", margin: "20px", background: colorCode }} elevation={3}>
        <Main>
          <Outlet />
        </Main>
      </Paper>
    </StyledRoot>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  dashboard_detail: state.dashboard.dashboard_detail,
  DashboardEditForm: state.form.DashboardEditForm ? state.form.DashboardEditForm.values : "",
});

export default connect(mapStateToProps, {})(DashboardLayout);
