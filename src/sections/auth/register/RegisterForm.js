import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import { Field, reduxForm, reset } from "redux-form";
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";

import RenderMobileField from "../../form-helper/RenderMobileField";
import RenderTextField from "../../form-helper/RenderTextField";
import RenderCheckBox from "../../form-helper/RenderCheckBox";
import validator from "./validator";

// ----------------------------------------------------------------------

const RegisterForm = ({ setAlert, register, isAuthenticated, handleSubmit, submitting, dispatch }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    dispatch(reset("RegisterForm"));
  };

  const onSubmit = async (data) => {
    if (data) {
      let result = await register(data);
      if (result) {
        resetForm();
        navigate("/", { replace: true });
      }
    }
  };

  if (isAuthenticated) {
    navigate("/", { replace: true });
  }
  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Field name='fullName' component={RenderTextField} type='text' placeholder='Enter Full Name' />
          <Field name='email' component={RenderTextField} type='email' placeholder='Enter Email' />
          <Field name='mobileNumber' component={RenderMobileField} type='number' placeholder='Enter Mobile Number' />

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
          />

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
          />
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
          <Field name='agree' component={RenderCheckBox} type='checkbox' />
        </Stack>

        <LoadingButton
          fullWidth
          size='large'
          disabled={submitting}
          type='submit'
          variant='contained'
          sx={{ background: "#FF4D42" }}>
          Register
        </LoadingButton>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default reduxForm({
  initialValues: {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    agree: false,
  },
  form: "RegisterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validator,
})(connect(mapStateToProps, { setAlert, register })(RegisterForm));
