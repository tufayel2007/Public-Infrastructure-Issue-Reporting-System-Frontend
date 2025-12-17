import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { MdHome, MdReportProblem, MdAddCircle, MdPerson } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CitizenNavbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPremium = user?.subscription === "premium";

  const getAvatarUrl = () => {
    if (!user?.avatarUrl) return null;
    if (user.avatarUrl.startsWith("http")) return user.avatarUrl;
    return `${import.meta.env.VITE_API_URL}${user.avatarUrl}`;
  };

  const quickLinks = [
    { to: "/citizen/dashboard", icon: MdHome, label: "Home" },
    { to: "/citizen/issues", icon: MdReportProblem, label: "My Issues" },
    {
      to: "/citizen/reportKNow",
      icon: MdAddCircle,
      label: "Report New Issue",
    },
    { to: "/citizen/profileRouter", icon: MdPerson, label: "Profile" },
  ];

  return (
    <>
      <div className="relative w-full h-16 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-700 hover:text-blue-600 transition-colors z-50"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3 truncate">
            <MdPerson className="text-xl sm:text-2xl flex-shrink-0" />
            <span className="truncate">Citizen Dashboard</span>
            {isPremium && (
              <span className="ml-2 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md flex-shrink-0">
                ⭐ PREMIUM
              </span>
            )}
          </h2>
          <div>
            <h2>
              {isPremium && (
                <span className="ml-2 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md flex-shrink-0">
                  <Link to="/citizen/contactSuportTem">Support Center</Link>
                </span>
              )}
            </h2>
          </div>
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
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notification */}
          <div className="relative group">
            <IoMdNotificationsOutline className="text-2xl sm:text-3xl text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              5
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0.5 ${
                isPremium
                  ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                  : "bg-gradient-to-br from-blue-500 to-cyan-500"
              } shadow-lg`}
            >
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                {getAvatarUrl() ? (
                  <img
                    src={getAvatarUrl()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CgProfile className="text-2xl sm:text-3xl text-gray-600" />
                )}
              </div>
            </div>

            {/* Profile Hover Dropdown */}
            <div className="absolute right-0 mt-3 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "C"}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-gray-800 truncate">
                      {user?.name || "Citizen"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                    {isPremium && (
                      <p className="text-xs text-yellow-600 font-semibold mt-1">
                        Premium Member
                      </p>
                    )}
                  </div>
                </div>
                <hr className="border-gray-200 my-4" />
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition font-medium text-sm sm:text-base"
                >
                  <CgLogOut className="text-lg sm:text-xl" />
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-16 w-80 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Quick Menu</h3>
            </div>
            <nav className="p-4 space-y-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    onClick={() => setMobileMenuOpen(false)} // close menu after click
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

export default CitizenNavbar;
