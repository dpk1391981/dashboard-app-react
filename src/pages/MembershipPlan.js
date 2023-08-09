import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { resetDashboard } from "../actions/dashboard";

import { styled } from "@mui/material/styles";
// @mui
import { Card, Paper, Typography, IconButton, InputAdornment, Grid } from "@mui/material";
import Iconify from "../components/iconify";
import RenderTextField from "../sections/form-helper/RenderTextField";
import RenderMobileField from "../sections/form-helper/RenderMobileField";
import { Field, reduxForm, reset, initialize } from "redux-form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MembershipPlan = ({ user_profile, resetDashboard, handleSubmit, dispatch, submitting }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    resetDashboard();
  }, []);

  useEffect(() => {
    dispatch(
      initialize("UserProfileScreenForm", {
        fullName: user_profile ? user_profile["fullName"] : "",
        company: user_profile ? user_profile["company"] : "",
        email: user_profile ? user_profile["email"] : "",
        mobileNumber: user_profile ? user_profile["mobileNumber"] : "",
      }),
    );
  }, [user_profile]);

  const onSubmit = async (data) => {
    console.log(`on submit`);
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title> User | Dashboard App </title>
      </Helmet>

      <Grid mb={5} sx={{ margin: "0px 20px 0px 30px" }}>
        <Typography variant='h4' gutterBottom>
          Setting
        </Typography>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_profile: state.auth.user,
});

export default reduxForm({
  form: "MembershipPlanForm",
})(connect(mapStateToProps, { resetDashboard })(MembershipPlan));
