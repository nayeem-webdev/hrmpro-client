import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/shared/Loading";

const HRRoutes = ({ children }) => {
  const loading = false;
  const HRExecutive = true;
  if (loading) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  } else if (HRExecutive) {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
};

HRRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HRRoutes;
