import { Outlet } from "react-router-dom";

import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSideNav from "../components/dashboard/DashboardSideNav";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <DashboardNavbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
      <div className="flex h-screen text-black dark:text-white py-[64px]">
        <DashboardSideNav toggleSidebar={toggleSidebar} isOpen={isOpen} />

        {/* Outlet */}
        <div className="h-[calc(100vh-64px)] overflow-auto p-4 w-full">
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
