// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdReportProblem,
  MdHome,
  MdCreditCard,
  MdGroupAdd, // নতুন আইকন Staff Add-এর জন্য
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth?.() || {};

  const quickLinks = [
    { to: "/admin/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/admin/manage-users", icon: MdPeople, label: "Manage Users" },
    {
      to: "/admin/manage-issues",
      icon: MdReportProblem,
      label: "Manage Issues",
    },
    { to: "/admin/payments", icon: MdCreditCard, label: "Payments" },
    { to: "/admin/staffManagement", icon: MdPeople, label: "Staff List" },
    { to: "/admin/addstaffManagement", icon: MdGroupAdd, label: "Add Staff" },
    { to: "/", icon: MdHome, label: "Back to Home" },
  ];

  return (
    <>
      {/* Top Navbar - Dark Modern Style */}
      <div className="relative w-full h-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-300 hover:text-cyan-300 transition-colors lg:hidden z-50"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h2>
        </div>

        {/* Desktop Quick Links - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 group ${
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
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
              </div>
            </div>

            {/* Dropdown on Hover */}
            <div className="absolute right-0 mt-4 w-72 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {user?.email || "admin@nagorseba.com"}
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

      {/* Mobile Menu - Full Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-40 lg:hidden border-b border-white/10">
          <div className="p-5">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Admin Menu</h3>
            <nav className="space-y-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-xl"
                          : "text-gray-300 hover:bg-white/10 hover:text-cyan-300"
                      }`
                    }
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
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

export default AdminNavbar;
