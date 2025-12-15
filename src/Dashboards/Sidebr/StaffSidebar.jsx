import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAssignment,
  MdArrowBack,
  MdPerson,
  MdMenu,
  MdClose,
} from "react-icons/md";

const StaffSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-indigo-800 text-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <MdPerson className="w-8 h-8 text-cyan-400" />
          <span className="font-bold text-lg">Staff Panel</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MdClose className="w-6 h-6" />
          ) : (
            <MdMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-800 text-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <MdPerson className="w-10 h-10 text-cyan-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Staff Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6 space-y-3 flex-1">
          <NavLink
            to="/staff/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 font-semibold scale-[1.02]"
                  : "hover:bg-white/10 hover:scale-[1.02]"
              }`
            }
          >
            <MdDashboard className="w-5 h-5" />
            <span>Dashboard Home</span>
          </NavLink>

          <NavLink
            to="/staff/issues"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/30 font-semibold scale-[1.02]"
                  : "hover:bg-white/10 hover:scale-[1.02]"
              }`
            }
          >
            <MdAssignment className="w-5 h-5" />
            <span>Assigned Issues</span>
          </NavLink>
          <span>
            <Link to="/staff/profileRouter">MY Profile</Link>
          </span>
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <MdArrowBack className="w-5 h-5" />
            <span>Back to Home</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="text-center p-6 border-t border-white/10">
          <p className="text-xs opacity-50">© 2025 IssueHub</p>
          <p className="text-xs opacity-40 mt-1">Staff Panel</p>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default StaffSidebar;
