import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/shared/Loading";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/API";

const AdminRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const { isPending, data } = useQuery({
    queryKey: ["userRole", uid],
    queryFn: async () => {
      const res = await API.get(`/user/role?uid=${uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  if (isPending) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  } else if (data.userRole === "admin") {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
};
AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoutes;
