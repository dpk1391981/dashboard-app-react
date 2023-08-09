import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, CircularProgress, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// ----------------------------------------------------------------------

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

const AuthenticatingPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the authentication code is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("token");
    const tokenExpiry = urlParams.get("expireIn");
    if (code) {
      localStorage.setItem("token", code);
      const now = new Date();
      if (now.getTime() > tokenExpiry) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  if (isAuthenticated) {
    navigate("/");
  } else {
    navigate("/login");
  }

  return (
    <>
      <Helmet>
        <title> Check Authentication | Dashboard App </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <CircularProgress />
          {/* {isAuthenticated ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant='h3' paragraph>
                Sorry, Your session has been expired!
              </Typography>

              <Box
                component='img'
                src='/images/session-expired.png'
                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
              />

              <Button to='/' size='large' variant='contained' component={RouterLink}>
                Go to Home
              </Button>
            </>
          )} */}
        </StyledContent>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(AuthenticatingPage);
