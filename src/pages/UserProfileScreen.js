import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { resetDashboard } from "../actions/dashboard";
import { UpdateUserProfile } from "../actions/user";
import "./style/user.css";
import { useNavigate } from "react-router-dom";
import { Card, Paper, Typography, IconButton, InputAdornment, Grid } from "@mui/material";
import Iconify from "../components/iconify";
import RenderTextField from "../sections/form-helper/RenderTextField";
import RenderMobileField from "../sections/form-helper/RenderMobileField";
import { Field, reduxForm, reset, initialize } from "redux-form";
import UserProfileValidation from "./validation/UserProfileValidation";

const UserProfileScreen = ({
  user_profile,
  resetDashboard,
  UpdateUserProfile,
  handleSubmit,
  dispatch,
  submitting,
  submitFailed,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    resetDashboard();
  }, []);

  console.log("==============submitFailed======================");
  console.log(submitFailed);
  console.log("==============submitFailed======================");

  const resetForm = () => {
    dispatch(reset("UserProfileScreenForm"));
  };

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
    if (data) {
      data["_id"] = user_profile["_id"];
      let result = await UpdateUserProfile(data);
      if (result) {
        resetForm();
        navigate("/dashboard/user/profile", { replace: true });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> User | Dashboard App </title>
      </Helmet>

      <Grid mb={5} sx={{ margin: "0px 20px 0px 30px" }}>
        <Typography variant='h4' gutterBottom>
          Manage User Profile
        </Typography>
      </Grid>

      <Card>
        <div className='root'>
          <div className='container'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Typography variant='h6' className='top-header'>
                  General Information
                </Typography>
                <div>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <div className='left-text-container-user'>
                        <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                          Full Name
                        </Typography>
                        <Field
                          name='fullName'
                          placeholder='Enter your full name'
                          component={RenderTextField}
                          className='text-input'
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='left-text-container-user'>
                        <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                          Company Name
                        </Typography>
                        <Field
                          name='company'
                          placeholder='Enter your company name'
                          component={RenderTextField}
                          className='text-input'
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='left-text-container-user'>
                        <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                          Email Address
                        </Typography>
                        <Field
                          name='email'
                          placeholder='Enter your email address'
                          component={RenderTextField}
                          className='text-input'
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='left-text-container-user'>
                        <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                          Phone Number
                        </Typography>
                        <Field
                          name='mobileNumber'
                          component={RenderMobileField}
                          type='number'
                          placeholder='Enter Mobile Number'
                          className='text-input'
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <div className='change-password-section'>
                <Typography variant='h6' className='top-header'>
                  Change Password
                </Typography>

                <Grid container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <div className='left-text-container-user'>
                      <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                        New Password
                      </Typography>
                      <Field
                        name='password'
                        component={RenderTextField}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder='Enter Password'
                        className='text-input'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <div className='left-text-container-user'>
                      <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                        Re-type Password
                      </Typography>
                      <Field
                        name='confirmPassword'
                        component={RenderTextField}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder='Re-Type Password'
                        className='text-input'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </div>

              <LoadingButton
                className='button-update'
                size='large'
                disabled={submitting}
                type='submit'
                variant='contained'>
                Update Profile
              </LoadingButton>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_profile: state.auth.user,
});

export default reduxForm({
  form: "UserProfileScreenForm",
  validate: UserProfileValidation,
})(connect(mapStateToProps, { resetDashboard, UpdateUserProfile })(UserProfileScreen));
