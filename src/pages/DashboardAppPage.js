import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { resetDashboard } from "../actions/dashboard";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppNewsUpdate } from "../sections/@dashboard/app";
import SvgColor from "../components/svg-color";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "50vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const DashboardAppPage = ({ dashboard, loading, resetDashboard }) => {
  useEffect(() => {
    resetDashboard();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Dashboard App </title>
      </Helmet>

      <Typography variant='h4' sx={{ mb: 5 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "22.5px",
              color: "#000",
            }}>
            My Dashboard
          </span>
        </div>
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {dashboard && dashboard.length ? (
              dashboard.map((db) => (
                <Grid item xs={12} sm={6} md={3}>
                  <AppNewsUpdate
                    title={db["title"]}
                    total={5000}
                    svgicon={"/assets/icons/icon.svg"}
                    customcolor='#FF4842'
                    subtitle='+10% from yesterday'
                    viewLink={`/dashboard/view/${db["_id"]}`}
                    editLink={`/dashboard/edit/${db["_id"]}`}
                    style={{ background: db["color"]["primary"] }}
                  />
                </Grid>
              ))
            ) : (
              <>
                <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
                  <Typography variant='h3' paragraph>
                    You do not have any active dashboard!
                  </Typography>
                  <Button
                    to='/dashboard/create'
                    size='large'
                    variant='contained'
                    sx={{ background: "#FF4D42" }}
                    component={RouterLink}>
                    <span>Create dashboard</span>
                    <span style={{ margin: "5px 2px 0px 10px" }}>
                      <SvgColor src={`/assets/icons/navbar/addIcon.svg`} sx={{ width: 18, height: 18 }} />
                    </span>
                  </Button>
                </StyledContent>
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  dashboard: state.dashboard.dashboard,
  loading: state.dashboard.loading,
});

export default connect(mapStateToProps, { resetDashboard })(DashboardAppPage);
