import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log(user);

  const navLinks = [
    {
      path: "/",
      name: "Home",
      id: 1,
    },
    {
      path: "/contact",
      name: "Contact Us",
      id: 2,
    },
    {
      path: "/about",
      name: "About",
      id: 3,
    },
  ];

  // Logout User
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.success("Logout Successful!");
      })
      .catch((err) => console.log(err.message));
  };

  const employee = true;
  return (
    <nav className="shadow-md fixed z-50 bg-white w-full">
      <Tooltip
        anchorSelect="#navUser"
        clickable
        className="z-50 !p-0 !bg-transparent !bg-opacity-100 !shadow-none !outline-none	"
      >
        <div className="flex flex-col bg-black text-white rounded-md p-4 ">
          {user && (
            <>
              <Link to={"/dashboard"} className="flex items-center gap-3 mb-4">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/nRm6fz9/Png-Item-5067022.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h4 className="text-sm font-medium">
                    {user?.displayName || "User Name"}
                  </h4>
                </div>
              </Link>
              {employee && (
                <>
                  <Link
                    to={"/dashboard/work-sheet"}
                    className="mt-2 px-4 py-2 w-full text-sm font-medium text-center rounded-md bg-primary text-white hover:bg-accent transition"
                  >
                    Work Sheet
                  </Link>
                  <Link
                    to={"/dashboard/payment-history"}
                    className="mt-2 px-4 py-2 w-full text-sm font-medium text-center rounded-md bg-primary text-white hover:bg-accent transition"
                  >
                    Payment History
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </Tooltip>
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-primary text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Logo */}
        <Link to={"/"} className="text-xl font-bold">
          <span className="text-primary">HRM</span>
          pro
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((navItem) => (
            <NavLink
              key={navItem.id}
              to={navItem.path}
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : " hover:text-primary"
              }
            >
              {navItem.name}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : " hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Profile and Login/Logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <button>
              <FaUser
                id="navUser"
                className="text-accent 0text-white hover:text-primary"
              />
            </button>
          )}

          {/* Login/Logout Button */}
          {!user ? (
            <Link
              to={"/login"}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition"
            >
              Login
            </Link>
          ) : (
            <Link
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition"
            >
              Logout
            </Link>
          )}
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="z-50 absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((navItem) => {
              <NavLink
                key={navItem.id}
                to={navItem.path}
                className={({ isActive }) =>
                  `font-semibold hover:text-primary uppercase ${
                    isActive ? "text-primary" : "text-black"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {navItem.name}
              </NavLink>;
            })}

            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `font-semibold hover:text-primary uppercase ${
                    isActive ? "text-primary" : "text-black"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
