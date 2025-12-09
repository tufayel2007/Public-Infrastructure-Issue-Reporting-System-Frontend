import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminHome from "../dashboards/admin/AdminHome";
import ManageUsers from "../dashboards/admin/ManageUsers";
import ManageIssues from "../dashboards/admin/ManageIssues";

import CitizenHome from "../dashboards/citizen/CitizenHome";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forgotPassword", element: <ForgotPassword></ForgotPassword> },
      { path: "/allIssues", element: <AllIssues /> },
      { path: "/reportIssue", element: <ReportIssue /> },
      {
        path: "/allservises",
        element: <AllServices></AllServices>,
      },
      {
        path: "/issues/:id",
        element: (
          <ProtectedRoute>
            <IssueDetails />
          </ProtectedRoute>
        ),
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
      { path: "issues/:id", element: <CitizenIssueDetails /> },
    ],
  },
]);

export default router;
