import { NavLink } from "react-router-dom";
import { IoCashOutline } from "react-icons/io5";
import { PiUserList } from "react-icons/pi";

import PropTypes from "prop-types";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  AiFillDashboard,
  AiOutlineBarChart,
  AiOutlineMail,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
import Loading from "../shared/Loading";
import AuthContext from "../../context/AuthContext";
import { API } from "../../api/API";

const DashboardSideNav = ({ toggleSidebar, isOpen }) => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const { isPending, data, error } = useQuery({
    queryKey: ["userRole", uid],
    queryFn: async () => {
      const res = await API.get(`/user/role?uid=${uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
    enabled: !!uid, // Ensure the query only runs if uid exists
  });

  if (isPending) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  }

  // Handle errors explicitly
  if (error) {
    return (
      <div className="error">
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }

  // Safely destructure the data after ensuring it is defined
  const userRole = data?.userRole || "";
  const employee = userRole === "employee";
  const HRExecutive = userRole === "hr_executive";
  const admin = userRole === "admin";

  return (
    <>
      <nav
        className={`fixed z-50 bg-gray-200 text-black h-[calc(100vh-64px)] flex-shrink-0 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex`}
      >
        <div className="flex flex-col">
          <div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiFillDashboard /> Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/user-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineUser /> User Profile
            </NavLink>
            {employee && (
              <>
                <NavLink
                  to="/dashboard/work-sheet"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <AiOutlineUnorderedList /> Work Sheet
                </NavLink>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoCashOutline /> Payment History
                </NavLink>
              </>
            )}
            {HRExecutive && (
              <>
                <NavLink
                  to="/dashboard/employee-list"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <PiUserList />
                  Employee List
                </NavLink>
                <NavLink
                  to="/dashboard/progress"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <AiOutlineBarChart /> Progress
                </NavLink>
              </>
            )}
            {admin && (
              <>
                <NavLink
                  to="/dashboard/all-employee-list"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <PiUserList />
                  Employee List
                </NavLink>
                <NavLink
                  to="/dashboard/hr-list"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <PiUserList />
                  HR List
                </NavLink>
                <NavLink
                  to="/dashboard/payroll"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <IoCashOutline /> Payroll
                </NavLink>
                <NavLink
                  to="/dashboard/mails"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  <AiOutlineMail /> Mails
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-5 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
DashboardSideNav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
export default DashboardSideNav;
