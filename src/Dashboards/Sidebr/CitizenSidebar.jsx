import React from "react";
import { Link, NavLink } from "react-router-dom";

import {
  MdHome,
  MdReportProblem,
  MdAddCircle,
  MdArrowBack,
  MdPerson,
} from "react-icons/md";

const CitizenSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white min-h-screen shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <h2 className="text-3xl font-bold flex items-center gap-3 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          <MdPerson className="w-9 h-9 text-cyan-300" />
          Citizen Panel
        </h2>
        <p className="text-xs mt-2 opacity-80 tracking-wider">
          Your Voice Matters
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {/* Home */}
        <NavLink
          to="/citizen/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30 font-bold scale-[1.02]"
                : "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
            }`
          }
          end
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-300 to-blue-400 rounded-r"></div>
              )}
              <MdHome
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-white" : "group-hover:text-cyan-300"
                }`}
              />
              <span className="text-base tracking-wide">Home</span>
            </>
          )}
        </NavLink>

        {/* My Issues */}
        <NavLink
          to="/citizen/issues"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30 font-bold scale-[1.02]"
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
              <span className="text-base tracking-wide">My Issues</span>
            </>
          )}
        </NavLink>

        {/* Report  */}
        <NavLink
          to="/citizen/report-issue"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-xl shadow-orange-500/30 font-bold scale-[1.02]"
                : "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-300 to-red-400 rounded-r"></div>
              )}
              <MdAddCircle
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-white" : "group-hover:text-orange-300"
                }`}
              />
              <span className="text-base tracking-wide">
                <Link to="/citizen/citizenReportIssue">Report New Issue</Link>
              </span>
            </>
          )}
        </NavLink>
        <span>
          <Link to="/citizen/profileRouter">MY Profile</Link>
        </span>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <NavLink
          to="/"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group"
        >
          <MdArrowBack className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          <span className="text-base tracking-wide">Back to Home</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 text-center">
        <p className="text-xs opacity-60">Together We Build a Better City</p>
        <p className="text-xs opacity-40 mt-2">© 2025 IssueHub</p>
      </div>
    </div>
  );
};

export default CitizenSidebar;
