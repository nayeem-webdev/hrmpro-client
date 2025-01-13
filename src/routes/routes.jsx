import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/other_pages/ErrorPage";
import Home from "../pages/other_pages/Home";
import SignUpPage from "../pages/other_pages/SignUpPage";
import ContactUs from "../pages/other_pages/ContactUs";
import AboutPage from "../pages/other_pages/AboutPage";
import LoginPage from "../pages/other_pages/LoginPage";

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
]);

export default routes;
