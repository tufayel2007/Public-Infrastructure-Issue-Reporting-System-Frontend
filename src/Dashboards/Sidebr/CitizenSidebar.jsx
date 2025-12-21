import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdReportProblem,
  MdAddCircle,
  MdArrowBack,
  MdPerson,
  MdCreditCard,
  MdAccountCircle,
} from "react-icons/md";

const CitizenSidebar = () => {
  return (
    <div className="hidden lg:flex w-80 bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-900 text-white min-h-screen shadow-2xl flex-col overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-white/20">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl">
            <MdPerson className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Citizen Panel
            </h2>
            <p className="text-sm mt-2 opacity-80 tracking-wide">
              Your Voice Matters
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-6 py-8 space-y-4">
        {/* Home */}
        <NavLink
          to="/citizen/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
              isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/50 scale-[1.02]"
                : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdHome
                className={`w-7 h-7 ${
                  isActive ? "text-white" : "group-hover:text-cyan-300"
                } transition-all`}
              />
              <span>Home</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-300 to-blue-400 rounded-r-full" />
              )}
            </>
          )}
        </NavLink>

        {/* My Issues */}
        <NavLink
          to="/citizen/issues"
          end
          className={({ isActive }) =>
            `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/50 scale-[1.02]"
                : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdReportProblem
                className={`w-7 h-7 ${
                  isActive ? "text-white" : "group-hover:text-emerald-300"
                } transition-all`}
              />
              <span>My Issues</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-300 to-teal-400 rounded-r-full" />
              )}
            </>
          )}
        </NavLink>

        {/* Report New Issue */}
        <NavLink
          to="/citizen/citizenReportIssue"
          end
          className={({ isActive }) =>
            `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-2xl shadow-orange-500/50 scale-[1.02]"
                : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdAddCircle
                className={`w-7 h-7 ${
                  isActive ? "text-white" : "group-hover:text-orange-300"
                } transition-all`}
              />
              <span>Report New Issue</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-300 to-red-400 rounded-r-full" />
              )}
            </>
          )}
        </NavLink>

        {/* Your Payments */}
        <NavLink
          to="/citizen/citizenPaymentHomePayment"
          end
          className={({ isActive }) =>
            `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50 scale-[1.02]"
                : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdCreditCard
                className={`w-7 h-7 ${
                  isActive ? "text-white" : "group-hover:text-purple-300"
                } transition-all`}
              />
              <span>Your Payments</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-300 to-pink-400 rounded-r-full" />
              )}
            </>
          )}
        </NavLink>

        {/* Profile Update */}
        <NavLink
          to="/citizen/profileRouter"
          end
          className={({ isActive }) =>
            `flex items-center gap-5 px-7 py-5 rounded-2xl transition-all duration-400 group relative overflow-hidden text-lg font-medium ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-blue-600 shadow-2xl shadow-indigo-500/50 scale-[1.02]"
                : "hover:bg-white/10 hover:shadow-xl hover:scale-[1.02]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MdAccountCircle
                className={`w-7 h-7 ${
                  isActive ? "text-white" : "group-hover:text-indigo-300"
                } transition-all`}
              />
              <span>Profile Update</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-300 to-blue-400 rounded-r-full" />
              )}
            </>
          )}
        </NavLink>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Back to Home */}
        <NavLink
          to="/"
          end
          className="flex items-center gap-5 px-7 py-5 rounded-2xl hover:bg-white/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-400 group text-lg font-medium"
        >
          <MdArrowBack className="w-7 h-7 text-gray-300 group-hover:text-cyan-300 group-hover:-translate-x-2 transition-all" />
          <span>Back to City Home</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-8 border-t border-white/20 text-center">
        <p className="text-base font-medium opacity-90">
          Together We Build a Better City
        </p>
        <p className="text-sm opacity-70 mt-3">© 2025 NagorSeba</p>
      </div>
    </div>
  );
};

export default CitizenSidebar;
