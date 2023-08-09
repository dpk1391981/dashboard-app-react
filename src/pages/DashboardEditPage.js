import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import "./style/dashboard.css";
import { loadAllWidgets } from "../actions/widget";
import { useParams } from "react-router-dom";
import { GetDashboardById, resetDashboard } from "../actions/dashboard";
import { connect } from "react-redux";
import DashboardEditForm from "../sections/@dashboard/dashboardForm/DashboardEditForm";

const DashboardEditPage = ({ loadAllWidgets, GetDashboardById }) => {
  const params = useParams();
  const slug = params.id;

  useEffect(() => {
    GetDashboardById(slug);
    loadAllWidgets();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit | Dashboard App </title>
      </Helmet>

      <DashboardEditForm />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loadAllWidgets, resetDashboard, GetDashboardById })(DashboardEditPage);
