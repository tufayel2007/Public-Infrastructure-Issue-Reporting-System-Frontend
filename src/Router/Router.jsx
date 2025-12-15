import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import HomeLayouts from "../HomeLayouts/HomeLayouts";
import AdminLayout from "../HomeLayouts/AdminLayout";
import StaffLayout from "../HomeLayouts/StaffLayout";
import CitizenLayout from "../HomeLayouts/CitizenLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import ForgotPassword from "../Components/Login/ForgotPassword";
import AllIssues from "../Components/Navbar/AllIssues";
import ReportIssue from "../Components/Home/RportAnIssue";
import IssueDetails from "../Components/IssueDetails/IssueDetails";
import StaffAssigned from "../Dashboards/Staff/StaffAssigned";
import StaffHome from "../Dashboards/Staff/StaffHome";
import UpdateIssue from "../Dashboards/Staff/UpdateIssue";
import MyIssues from "../Dashboards/Citizen/MyIssues";
import CitizenIssueDetails from "../Dashboards/Citizen/CitizenIssueDetails";
import AdminAndStaffAndCeitjenLogin from "../Dashboards/Admin/AdminAndStaffAndCeitjenLogin";
import AllServices from "../Components/Navbar/AllServises";
import ManageUsers from "../Dashboards/Admin/ManageUsers";
import ManageIssues from "../Dashboards/Admin/ManageIssues";
import CitizenHome from "../Dashboards/Citizen/CitizenHome";
import AdminHome from "../Dashboards/Admin/AdminHome";
import ReportKNow from "../Dashboards/Citizen/RepotKNow";
import BoostSuccess from "../OnlinePyment/BoostSuccess";
import BoostCancel from "../OnlinePyment/BoostCancel";
import CitizenRegister from "../Dashboards/Admin/CitizenRegister";
import CitizenReportIssue from "../Dashboards/Citizen/CitizenReportIssue";
import PrivateRoute from "../Components/Footer/PrivareRoute";
import Premium from "../OnlinePyment/Premium";
import PremiumSuccess from "../OnlinePyment/PremiumSuccess";
import About from "../Components/Navbar/About";
import CitizenProfile from "../Dashboards/Citizen/CitizenProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forgotPassword", element: <ForgotPassword></ForgotPassword> },
      { path: "/allIssues", element: <AllIssues /> },
      { path: "/about", element: <About /> },
      {
        path: "/reportIssue",
        element: (
          <PrivateRoute>
            <ReportIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "/allservises",
        element: <AllServices></AllServices>,
      },

      {
        path: "/issue/:id",
        element: <IssueDetails />,
      },

      {
        path: "/boost/success",
        element: <BoostSuccess />,
      },

      {
        path: "/boost/cancel",
        element: <BoostCancel />,
      },
      {
        path: "/CitizenRegister",
        element: <CitizenRegister></CitizenRegister>,
      },
    ],
  },

  // ---------------- ADMIN ----------------
  {
    path: "/adminLogin",
    element: <AdminAndStaffAndCeitjenLogin></AdminAndStaffAndCeitjenLogin>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminHome /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-issues", element: <ManageIssues /> },
    ],
  },

  // ---------------- STAFF ----------------
  {
    path: "/staff",
    element: (
      <ProtectedRoute role="staff">
        <StaffLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <StaffHome /> },
      { path: "issues", element: <StaffAssigned /> },
      { path: "issues/:id", element: <UpdateIssue /> },
    ],
  },

  // ---------------- CITIZEN ----------------
  {
    path: "/citizen",
    element: (
      <ProtectedRoute role="citizen">
        <CitizenLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <CitizenHome /> },
      { path: "issues", element: <MyIssues /> },
      { path: "CitizenProfile", element: <CitizenProfile /> },
      { path: "issues/:id", element: <CitizenIssueDetails /> },
      { path: "reportKNow", element: <ReportKNow /> },
      { path: "citizenReportIssue", element: <CitizenReportIssue /> },
      { path: "premium", element: <Premium /> },
      { path: "premium/success", element: <PremiumSuccess /> },
    ],
  },
]);

export default router;
