import React from "react";
import { NavLink } from "react-router-dom";

const StaffSidebar = () => {
  return (
    <div className="w-64 bg-indigo-700 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Staff Panel</h2>

      <nav className="space-y-4">
        <NavLink
          to="/staff/dashboard"
          className="block p-2 rounded hover:bg-indigo-500"
        >
          Dashboard Home
        </NavLink>

        <NavLink
          to="/staff/issues"
          className="block p-2 rounded hover:bg-indigo-500"
        >
          Assigned Issues
        </NavLink>
      </nav>
    </div>
  );
};

export default StaffSidebar;
