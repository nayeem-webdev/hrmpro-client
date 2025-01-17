import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/public-pages/ErrorPage.jsx";
import Home from "../pages/public-pages/Home.jsx";
import ContactUs from "../pages/public-pages/ContactUs.jsx";
import AboutPage from "../pages/public-pages/AboutPage.jsx";
import LoginPage from "../pages/public-pages/LoginPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/shared_pages/UserProfile";
import PrivateRoutes from "./PrivateRoutes";
import SignUpPage from "../pages/public-pages/SignUpPage.jsx";
import WorkSheet from "../pages/employee-pages/WorkSheet.jsx";
import PaymentHistory from "../pages/employee-pages/PaymentHistory.jsx";
import HRRoutes from "./HRRoutes.jsx";
import EmployeeList from "../pages/hr-pages/EmployeeList.jsx";
import UserDetailsPage from "../components/hr-page-comps/UserDetailsPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user-profile",
        element: (
          <PrivateRoutes>
            <UserProfile />,
          </PrivateRoutes>
        ),
      },
      {
        path: "work-sheet",
        element: (
          <PrivateRoutes>
            <WorkSheet />,
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoutes>
            <PaymentHistory />,
          </PrivateRoutes>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HRRoutes>
            <EmployeeList />,
          </HRRoutes>
        ),
      },
      {
        path: "details/:id",
        element: (
          <HRRoutes>
            <UserDetailsPage />,
          </HRRoutes>
        ),
      },
    ],
  },
]);

export default routes;
