import PropTypes from "prop-types";
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
//
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";
import { loadedUser } from "../actions/auth";
import { connect, useStore } from "react-redux";

const ThemeProvider = ({ children, loadedUser, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    loadedUser();
  }, []);

  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [],
  );

  // if (!isAuthenticated) {
  //   return navigate("/login");
  // }

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};
// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadedUser })(ThemeProvider);
