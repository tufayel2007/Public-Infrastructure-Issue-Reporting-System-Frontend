import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Dashboards/Sidebr/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
