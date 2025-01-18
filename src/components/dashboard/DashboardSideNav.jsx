import { NavLink } from "react-router-dom";
import { IoCashOutline } from "react-icons/io5";
import { PiUserList } from "react-icons/pi";

import {
  AiFillDashboard,
  AiOutlineBarChart,
  AiOutlineMail,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";
import PropTypes from "prop-types";

const DashboardSideNav = ({ toggleSidebar, isOpen }) => {
  const employee = true;
  const HRExecutive = true;
  const admin = true;
  return (
    <>
      <nav
        className={`fixed z-50 bg-gray-200 text-black  h-[calc(100vh-64px)] flex-shrink-0 transform transition-transform duration-500 ${
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

      {/* Overlay for Mobile */}
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
