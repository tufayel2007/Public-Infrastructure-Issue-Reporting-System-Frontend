import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayouts from "../HomeLayouts/HomeLayouts";
import Error from "../Error/Error";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import ForgotPassword from "../Components/Login/ForgotPassword";
import AllIssues from "../Components/Navbar/AllIssues";
import About from "../Components/Navbar/About";
import AllServises from "../Components/Navbar/AllServises";
import ReportAnIssue from "../Components/Home/RportAnIssue";
import IssueDetails from "../Components/IssueDetails/IssueDetails";
import PrivateRoute from "../Components/Footer/PrivareRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/allIssues",
        element: <AllIssues></AllIssues>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/allservises",
        element: <AllServises></AllServises>,
      },
      {
        path: "/reprotAnIssue",
        element: <ReportAnIssue></ReportAnIssue>,
      },
      {
        path: "/issues/:id",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
