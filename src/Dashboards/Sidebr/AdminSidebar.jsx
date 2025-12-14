// src/components/AdminSidebar.jsx  (বা যেখানে আছে)
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdReportProblem,
  MdHome,
  MdLogout,
  MdSettings,
} from "react-icons/md";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <h2 className="text-3xl font-bold flex items-center gap-3 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
          <MdSettings className="w-9 h-9 text-cyan-300" />
          Admin Panel
        </h2>
        <p className="text-xs mt-2 opacity-80 tracking-wider">
          City Control Center
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/30 font-bold scale-[1.02]"
                : "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-300 to-purple-400 rounded-r"></div>
              )}
              <MdDashboard
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-white" : "group-hover:text-purple-300"
                }`}
              />
              <span className="text-base tracking-wide">Dashboard Home</span>
            </>
          )}
        </NavLink>

        {/* Manage Users */}
        <NavLink
          to="/admin/manage-users"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl shadow-blue-500/30 font-bold scale-[1.02]"
                : "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-300 to-cyan-400 rounded-r"></div>
              )}
              <MdPeople
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-white" : "group-hover:text-cyan-300"
                }`}
              />
              <span className="text-base tracking-wide">Manage Users</span>
            </>
          )}
        </NavLink>

        {/* Manage Issues */}
        <NavLink
          to="/admin/manage-issues"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl shadow-emerald-500/30 font-bold scale-[1.02]"
                : "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-300 to-teal-400 rounded-r"></div>
              )}
              <MdReportProblem
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-white" : "group-hover:text-emerald-300"
                }`}
              />
              <span className="text-base tracking-wide">Manage Issues</span>
            </>
          )}
        </NavLink>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Back to Home */}
        <NavLink
          to="/"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group"
        >
          <MdHome className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <span className="text-base tracking-wide">Back to Home</span>
        </NavLink>

        {/* Logout */}
        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-600/20 hover:border hover:border-red-500/30 transition-all duration-300 group mt-2">
          <MdLogout className="w-6 h-6 text-red-400 group-hover:text-red-300 group-hover:rotate-12 transition-all" />
          <span className="text-base tracking-wide text-red-300 group-hover:text-red-100">
            Logout
          </span>
        </button>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 text-center">
        <p className="text-xs opacity-60">© 2025 IssueHub</p>
        <p className="text-xs opacity-40 mt-1">v2.0 • Powered by Admins</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
