import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import "./style/dashboard.css";
import { loadAllWidgets } from "../actions/widget";
import { resetDashboard } from "../actions/dashboard";

import { connect } from "react-redux";
import DashboardCreateForm from "../sections/@dashboard/dashboardForm/DashboardCreateForm";

const DashboardCreatePage = ({ loadAllWidgets, resetDashboard, dispatch }) => {
  useEffect(() => {
    loadAllWidgets();
    resetDashboard();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Dashboard App </title>
      </Helmet>

      <DashboardCreateForm />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loadAllWidgets, resetDashboard })(DashboardCreatePage);
