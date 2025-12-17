import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-800 to-indigo-900 text-white p-4 shadow-lg flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <MdPerson className="w-8 h-8 text-cyan-300" />
          <span className="font-bold text-lg">Staff Panel</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:text-cyan-300 transition-colors"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:z-auto`}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <MdPerson className="w-12 h-12 text-cyan-300" />
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Staff Panel
            </h2>
          </div>
          <p className="text-sm mt-4 opacity-80 tracking-wider">
            City Service Operations
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 py-8 space-y-4">
          {/* Dashboard */}
          <NavLink
            to="/staff/dashboard"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-400 group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50 font-bold"
                  : "hover:bg-white/10 hover:shadow-xl"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MdDashboard
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "group-hover:text-purple-300"
                  }`}
                />
                <span className="text-lg">Dashboard Home</span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r"></div>
                )}
              </>
            )}
          </NavLink>

          {/* Assigned Issues */}
          <NavLink
            to="/staff/issues"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-400 group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-teal-700 shadow-2xl shadow-emerald-500/50 font-bold"
                  : "hover:bg-white/10 hover:shadow-xl"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MdAssignment
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "group-hover:text-emerald-300"
                  }`}
                />
                <span className="text-lg">Assigned Issues</span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r"></div>
                )}
              </>
            )}
          </NavLink>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Back to Home */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-5 px-6 py-4 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all duration-400 group"
          >
            <MdArrowBack className="w-7 h-7 text-gray-300 group-hover:text-white group-hover:-translate-x-2 transition-all" />
            <span className="text-lg">Back to City Home</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 text-center">
          <p className="text-sm opacity-80">© 2025 NagorSeba</p>
          <p className="text-xs opacity-60 mt-2">Staff Operations Center</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer for mobile top bar */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default StaffSidebar;
