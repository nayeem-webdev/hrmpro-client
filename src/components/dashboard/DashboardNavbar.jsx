import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaPowerOff, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const DashboardNavbar = ({ toggleSidebar, isOpen }) => {
  const { user, logoutUser, setUser } = useContext(AuthContext);
  console.log(user);
  // Logout User

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.success("Logout Successful!");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <nav className=" bg-gray-200 fixed flex justify-between top-0 w-full transition duration-300 px-4 lg:px-8 py-3 items-center shadow-md  z-50 ">
      <div className="flex items-center gap-3 text-black lg:w-1/3">
        <button
          className="lg:hidden text-black text-2xl"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <Link to={"/"} className="text-xl font-bold">
          <span className="text-primary">HRM</span>
          pro
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        {/* User Details */}
        <div className="flex items-center gap-2 cursor-pointer ">
          <div className="text-sm">
            <p className="font-bold text-black  text-right">
              {user?.displayName}
            </p>
            <p className="text-xs text-black/80 text-right">{user?.email}</p>
          </div>
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co.com/nRm6fz9/Png-Item-5067022.png"
            }
            alt="User"
            className="w-10 h-10 rounded-full object-center object-cover"
          />
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          className="bg-primary text-white p-2 rounded-full hover:bg-accent transition"
        >
          <FaPowerOff size={20} />
        </button>
      </div>
    </nav>
  );
};
DashboardNavbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DashboardNavbar;
