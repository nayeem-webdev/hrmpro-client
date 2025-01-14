import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import StateContext from "../../context/StateContext";
import { FaBars, FaBell, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const DashboardNavbar = ({ toggleSidebar, isOpen }) => {
  const { toggleDarkMode, darkMode } = useContext(StateContext);

  // Track scrolling
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const [notifications, setNotifications] = useState(null);
  const notifications = 1;

  const user = {
    name: "John Doe",
    role: "Admin",
    image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
  };

  return (
    <nav
      className={`fixed flex justify-between top-0 w-full z-40 transition duration-300  dark:backdrop-blur-sm  px-4 lg:px-8 py-3  items-center
         ${
           isScrolled
             ? "backdrop-blur-md bg-white/70 dark:bg-black/80 shadow-lg"
             : "bg-black/5 dark:bg-white/20"
         }
         `}
    >
      <div className="flex items-center gap-3 text-black dark:text-white lg:w-1/3">
        <button
          className="lg:hidden text-black dark:text-white text-2xl"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <Link
          to={"/"}
          className="logo-shadow text-center text-4xl font-bold text-black dark:text-white"
        >
          <h1>ATHLETIX</h1>
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        {/* User Details */}
        <div className="flex items-center gap-2 cursor-pointer border-r-2 pr-4 border-black">
          <div className="text-sm">
            <p className="font-bold text-black dark:text-white text-right">
              {user.name}
            </p>
            <p className="text-xs text-black/80 dark:text-white/80 text-right">
              {user.role}
            </p>
          </div>
          <img
            src={user.image}
            alt="User"
            className="w-10 h-10 rounded-full object-center object-cover"
          />
        </div>
        {/* User Details */}
        {/* Notification */}
        <div className="relative">
          <NavLink to="/admin-users">
            <FaBell className="text-black dark:text-white hover:text-primary dark:hover:text-primary" />
          </NavLink>

          {notifications > 0 && (
            <span className="absolute -top-1 right-0 bg-primary text-white rounded-full h-2 w-2 border border-white dark:border-black" />
          )}
        </div>
        {/* Notification */}
        {/* Dark Mode */}
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <FaSun className="text-black dark:text-white hover:text-primary dark:hover:text-primary" />
          ) : (
            <FaMoon className="text-black dark:text-white hover:text-primary dark:hover:text-primary" />
          )}
        </button>
        {/* Dark Mode */}
      </div>
    </nav>
  );
};
DashboardNavbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DashboardNavbar;
