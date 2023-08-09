import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Divider, Stack, Button } from "@mui/material";
import useResponsive from "../hooks/useResponsive";
import { connect } from "react-redux";
import { LoginForm } from "../sections/auth/login";
import { useNavigate } from "react-router-dom";
import RenderGoogleButton from "../sections/form-helper/RenderGoogleButton";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: "#FF4D42",
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const LoginPage = () => {
  const mdUp = useResponsive("up", "md");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/social/google";
  };

  return (
    <>
      <Helmet>
        <title> Login | Dashboard App </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' gutterBottom sx={{ textAlign: "center" }}>
              Welcome Back
            </Typography>

            <Typography>&nbsp;</Typography>

            <LoginForm />

            <Divider sx={{ my: 3 }}>
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>
            <Stack direction='row' spacing={2}>
              <RenderGoogleButton handleClick={handleGoogleLogin} />
            </Stack>

            <Typography>&nbsp;</Typography>

            <Typography variant='body2' sx={{ mb: 5, textAlign: "center" }}>
              Don’t have an account? {""}
              <Link
                variant='subtitle2'
                sx={{ cursor: "pointer", textDecoration: "none" }}
                onClick={() => navigate("/register", { replace: true })}>
                Get started
              </Link>
            </Typography>
          </StyledContent>
        </Container>

        {mdUp && (
          <StyledSection>
            <img src='/images/login-logo.png' alt='login' />
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(LoginPage);
