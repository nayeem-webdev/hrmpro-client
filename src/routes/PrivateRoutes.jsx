import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/shared/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
