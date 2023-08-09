import { Fragment } from "react";
import { connect } from "react-redux";
import Router from "./routes";
// ----------------------------------------------------------------------

const RouteComponent = ({ user, dashboard }) => {
  console.log(`Dashboard under Route component ...`);
  console.log(dashboard);
  const isAnyDashboard = "";
  console.log(user);

  return (
    <Fragment>
      <Router defaultURL={isAnyDashboard} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  dashboard: state.dashboard.dashboard,
});

export default connect(mapStateToProps, {})(RouteComponent);
