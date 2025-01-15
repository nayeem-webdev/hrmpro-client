import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/public_pages/ErrorPage";
import Home from "../pages/public_pages/Home";
// import SignUpPage from "../pages/public_pages/SignUpPage";
import TestPage from "../../other_compo/TestPage";
import ContactUs from "../pages/public_pages/ContactUs";
import AboutPage from "../pages/public_pages/AboutPage";
import LoginPage from "../pages/public_pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/shared_pages/UserProfile";
import PrivateRoutes from "./PrivateRoutes";
import ImageUploadPage from "../../other_compo/ImageUploadPage.jsx";
import SignUpPage from "../pages/public_pages/SignUpPage.jsx";

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
      {
        path: "/up",
        element: <ImageUploadPage />,
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
        element: <UserProfile />,
      },
    ],
  },
]);

export default routes;
