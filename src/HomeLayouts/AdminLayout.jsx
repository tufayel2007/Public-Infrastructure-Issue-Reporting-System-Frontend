import React from "react";
import AdminSidebar from "../Dashboards/Sidebr/AdminSidebar";
import AdminNavbar from "../Dashboards/Admin/AdminNavbar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div className="p-4">
          <Outlet /> {/* এখানে child route load হবে */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
