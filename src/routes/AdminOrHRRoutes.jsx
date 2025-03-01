import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/shared/Loading";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/API";

const AdminOrHRRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const { isLoading, data } = useQuery({
    queryKey: ["userRole", uid],
    queryFn: async () => {
      const res = await API.get(`/user/role?uid=${uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  } else if (data.userRole === "admin" || data.userRole === "hr_executive") {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
};
AdminOrHRRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminOrHRRoutes;
