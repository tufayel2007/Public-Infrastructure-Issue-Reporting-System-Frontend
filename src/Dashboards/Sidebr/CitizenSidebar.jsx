import React from "react";
import { NavLink } from "react-router-dom";

const CitizenSidebar = () => {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Citizen Panel</h2>

      <nav className="space-y-4">
        <NavLink
          to="/citizen/dashboard"
          className="block p-2 rounded hover:bg-blue-500"
        >
          Home
        </NavLink>

        <NavLink
          to="/citizen/issues"
          className="block p-2 rounded hover:bg-blue-500"
        >
          My Issues
        </NavLink>

        <NavLink
          to="/reprotAnIssue"
          className="block p-2 rounded hover:bg-blue-500"
        >
          Report New Issue
        </NavLink>
        <NavLink to="/" className="block p-2 rounded hover:bg-gray-700">
          Back to Home page
        </NavLink>
      </nav>
    </div>
  );
};

export default CitizenSidebar;
