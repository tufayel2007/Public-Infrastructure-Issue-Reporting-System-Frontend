import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-4">
        <NavLink
          to="/admin/dashboard"
          className="block p-2 rounded hover:bg-gray-700"
        >
          Dashboard Home
        </NavLink>

        <NavLink
          to="/admin/manage-users"
          className="block p-2 rounded hover:bg-gray-700"
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/manage-issues"
          className="block p-2 rounded hover:bg-gray-700"
        >
          Manage Issues
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
