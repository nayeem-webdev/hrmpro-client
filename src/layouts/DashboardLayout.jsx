import { Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSideNav from "../components/dashboard/DashboardSideNav";
import { ToastContainer } from "react-toastify";
import DashboardStats from "../pages/shared_pages/DashboardStats";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <ToastContainer />
      <DashboardNavbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
      <div className="flex h-screen text-black py-[64px]">
        <DashboardSideNav toggleSidebar={toggleSidebar} isOpen={isOpen} />

        {/* Outlet */}
        <div className="h-[calc(100vh-64px)] overflow-auto p-4 w-full ">
          <div className="">
            {location.pathname === "/dashboard" ? (
              <DashboardStats />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
