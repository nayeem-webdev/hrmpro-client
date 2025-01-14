import { NavLink } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineAppstore,
  AiOutlineComment,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import PropTypes from "prop-types";

const DashboardSideNav = ({ toggleSidebar, isOpen }) => {
  return (
    <>
      <nav
        className={`fixed z-50 lg:bg-black/5 lg:dark:text-white lg:text-black bg-black/90 dark:bg-white/20 text-white dark:bg-white  h-[calc(100vh-64px)] flex-shrink-0 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex`}
      >
        <div className="flex flex-col">
          <div className="mt-4">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiFillDashboard /> Dashboard
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineUser /> Users
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineAppstore /> All Products
            </NavLink>

            <NavLink
              to="/admin/sales"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineShoppingCart /> Sales
            </NavLink>

            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineBarChart /> Reports
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 hover:bg-primary/50 dark:hover:bg-primary/50 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <AiOutlineComment /> All Reviews
            </NavLink>
          </div>

          {/* Home Button */}
          <NavLink
            to="/"
            className=" mt-8 flex items-center gap-2 px-4 py-2 bg-white lg:bg-black text-black lg:text-white hover:bg-black/80 dark:bg-white dark:text-black hover:dark:bg-white/90 w-full justify-center"
          >
            <FaHome /> Back to Home Page
          </NavLink>
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
