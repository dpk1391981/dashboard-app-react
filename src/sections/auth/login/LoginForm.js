import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { login } from "../../../actions/auth";
import { Field, reduxForm, reset } from "redux-form";

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import RenderTextField from "../../form-helper/RenderTextField";
import validation from "./validation";

// ----------------------------------------------------------------------

const LoginForm = ({ login, handleSubmit, isAuthenticated, submitting, dispatch }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    dispatch(reset("LoginForm"));
  };

  const onSubmit = async (data) => {
    // e.preventDefault();

    if (data) {
      const { email, password } = data;
      let result = await login(email, password);
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
          <Field name='email' component={RenderTextField} type='email' placeholder='Enter Email' />

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
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
          <span>&nbsp;</span>
          <Link variant='subtitle2' underline='hover'>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          disabled={submitting}
          sx={{ background: "#FF4D42" }}>
          Login
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
    email: "",
    password: "",
  },
  form: "LoginForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validation,
})(connect(mapStateToProps, { login })(LoginForm));
