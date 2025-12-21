import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAssignment,
  MdArrowBack,
  MdPerson,
  MdMenu,
  MdClose,
  MdLock, // New icon for Change Password
} from "react-icons/md";

const StaffSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-800 to-purple-900 text-white p-4 shadow-2xl flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <MdPerson className="w-9 h-9 text-cyan-300" />
          <span className="font-bold text-xl">Staff Panel</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-3xl hover:text-cyan-300 transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-80
          bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900
          text-white shadow-2xl flex flex-col overflow-y-auto
          transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* Header */}
        <div className="p-10 border-b border-white/20">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-xl">
              <MdPerson className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Staff Panel
              </h2>
              <p className="text-sm mt-2 opacity-80 tracking-wide">
                City Service Operations
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 py-8 space-y-4">
          {/* Dashboard */}
          <NavLink
            to="/staff/dashboard"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-600/50 scale-[1.02]"
                  : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MdDashboard
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "group-hover:text-purple-300"
                  } transition-all`}
                />
                <span>Dashboard Home</span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r-full" />
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
              `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-2xl shadow-emerald-600/50 scale-[1.02]"
                  : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MdAssignment
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "group-hover:text-emerald-300"
                  } transition-all`}
                />
                <span>Assigned Issues</span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full" />
                )}
              </>
            )}
          </NavLink>

          {/* Change Password */}
          <NavLink
            to="/staff/staffChangePassword"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl shadow-blue-600/50 scale-[1.02]"
                  : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MdLock
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "group-hover:text-blue-300"
                  } transition-all`}
                />
                <span>Change Password</span>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full" />
                )}
              </>
            )}
          </NavLink>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Back to Home */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-5 px-7 py-5 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all duration-400 group text-lg font-medium"
          >
            <MdArrowBack className="w-7 h-7 text-gray-300 group-hover:text-cyan-300 group-hover:-translate-x-2 transition-all" />
            <span>Back to City Home</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-white/20 text-center">
          <p className="text-base font-medium opacity-90">© 2025 NagorSeba</p>
          <p className="text-sm opacity-70 mt-2">Staff Operations Center</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer for mobile top bar */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default StaffSidebar;
