import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Dashboards/Sidebr/AdminSidebar";
import AdminNavbar from "../Dashboards/Admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
