import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//

import UserProfileScreen from "./pages/UserProfileScreen";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Page404 from "./pages/Page404";
import DashboardCreatePage from "./pages/DashboardCreatePage";
import DashboardAppPage from "./pages/DashboardAppPage";
import SalesPage from "./pages/SalesPage";
import RevenuePage from "./pages/RevenuePage";
import MembershipPlan from "./pages/MembershipPlan";
import IntegrationPage from "./pages/IntegrationPage";
import DashboardWhileLabelPage from "./pages/DashboardWhileLabelPage";
import AuthenticatingPage from "./pages/AuthenticatingPage";
import DashboardEditPage from "./pages/DashboardEditPage";
// ----------------------------------------------------------------------

export default function Router({ defaultURL }) {
  const child = [
    { element: <Navigate to={defaultURL ? `/dashboard/app` : `/dashboard/create`} />, index: true },
    { activeClass: "dashboard", path: "app", element: <DashboardAppPage /> },
    { activeClass: "user", path: "user", element: <UserPage /> },
    { activeClass: "integration", path: "integration", element: <IntegrationPage /> },
    { activeClass: "setting", path: "setting", element: <MembershipPlan /> },
    { activeClass: "dashboard", path: "create", element: <DashboardCreatePage /> },
    { activeClass: "dashboard", path: "view/:id", element: <DashboardWhileLabelPage /> },
    { activeClass: "dashboard", path: "edit/:id", element: <DashboardEditPage /> },
    { activeClass: "user", path: "user/profile", element: <UserProfileScreen /> },
  ];

  const routesJson = [
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: child,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={`/dashboard/app`} />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to='/404' /> },
        { path: "authentication", element: <AuthenticatingPage /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to='/404' replace />,
    },
  ];

  const routes = useRoutes(routesJson);

  return routes;
}
