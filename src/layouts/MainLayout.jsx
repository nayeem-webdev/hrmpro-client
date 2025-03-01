import { ToastContainer } from "react-toastify";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="pt-[64px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
