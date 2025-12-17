// src/components/StaffNavbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdAssignment, MdHome, MdPerson } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const StaffNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth?.() || {};

  const quickLinks = [
    { to: "/staff/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/staff/issues", icon: MdAssignment, label: "Assigned Issues" },

    { to: "/", icon: MdHome, label: "Back to Home" },
  ];

  return (
    <>
      <div className="relative w-full h-16 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-indigo-700 hover:text-indigo-500 transition-colors lg:hidden"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <MdPerson className="text-2xl" />
            Staff Panel
          </h2>
        </div>

        {/* Desktop Quick Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`
                }
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <div className="relative group">
            <IoMdNotificationsOutline className="text-3xl text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              3
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <CgProfile className="text-3xl text-gray-700" />
              </div>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {user?.name || "Staff Member"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "staff@nagorseba.com"}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-200 my-4" />
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition font-medium"
                >
                  <CgLogOut className="text-xl" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-16 w-80 h-full bg-gradient-to-b from-indigo-800 via-indigo-700 to-purple-800 shadow-2xl transform transition-transform duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Staff Menu</h3>
            </div>
            <nav className="p-4 space-y-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "text-white/90 hover:bg-white/10"
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

export default StaffNavbar;
