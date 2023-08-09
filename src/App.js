import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// routes
import Router from "./routes";
// theme
import { Provider } from "react-redux";

import ThemeProvider from "./theme";
import store from "./store";
// components

import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import setAuthToken from "./utils/setAuthToken";
import { loadedUser } from "./actions/auth";
import Alert from "./layouts/simple/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
  console.log(localStorage.token);
}

// ----------------------------------------------------------------------

export default function App() {
  console.log(`Init ...`);
  useEffect(() => {
    console.log(`Init ...`);

    return () => loadedUser();
  }, []);
  let { auth, dashboard } = store.getState();
  console.log(`App component ...`);
  console.log(dashboard);
  console.log(auth);

  const isAnyDashboard = dashboard.dashboard && dashboard.dashboard.length > 0 ? true : false;
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Alert />
            <Router defaultURL={isAnyDashboard} />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
