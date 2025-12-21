// src/components/StaffNavbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAssignment,
  MdHome,
  MdLockReset, // Change Password এর জন্য নতুন আইকন
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const StaffNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth?.() || {};

  const quickLinks = [
    { to: "/staff/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/staff/issues", icon: MdAssignment, label: "Assigned Issues" },
    {
      to: "/staff/staffChangePassword",
      icon: MdLockReset,
      label: "Change Password",
    },
    { to: "/", icon: MdHome, label: "Back to Home" },
  ];

  return (
    <>
      {/* Top Navbar - Dark Gradient Theme */}
      <div className="relative w-full h-16 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 shadow-2xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-300 hover:text-cyan-300 transition-colors lg:hidden"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Staff Panel
            </span>
          </h2>
        </div>

        {/* Desktop Quick Links */}
        <nav className="hidden lg:flex items-center gap-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/40"
                      : "text-gray-300 hover:bg-white/10 hover:text-cyan-300"
                  }`
                }
              >
                <Icon className="text-lg group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-5">
          {/* Notification Bell */}
          <div className="relative group">
            <IoMdNotificationsOutline className="text-3xl text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
              3
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-0.5 shadow-xl cursor-pointer ring-2 ring-white/20 hover:ring-cyan-300 transition-all">
              <div className="w-full h-full rounded-full bg-indigo-900 flex items-center justify-center">
                <div className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "S"}
                </div>
              </div>
            </div>

            {/* Hover Dropdown */}
            <div className="absolute right-0 mt-4 w-72 bg-indigo-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {user?.name || "Staff Member"}
                    </p>
                    <p className="text-sm text-gray-300">
                      {user?.email || "staff@nagorseba.com"}
                    </p>
                  </div>
                </div>

                <hr className="border-white/10 my-5" />

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white transition-all duration-300 font-medium group"
                >
                  <CgLogOut className="text-xl group-hover:rotate-12 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-16 w-80 h-full bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 shadow-2xl transform transition-transform duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-cyan-300">Staff Menu</h3>
            </div>
            <nav className="p-6 space-y-3">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-6 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-xl"
                          : "text-gray-200 hover:bg-white/10 hover:text-cyan-300"
                      }`
                    }
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffNavbar;
