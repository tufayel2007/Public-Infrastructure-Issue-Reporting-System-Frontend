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
      to: "/citizen/citizenReportIssue",
      icon: MdAddCircle,
      label: "Report New Issue",
    },
    { to: "/citizen/profileRouter", icon: MdPerson, label: "Profile" },
  ];

  return (
    <>
      {/* Main Navbar - Modern Glassmorphic with Gradient Accent */}
      <div className="relative w-full h-16 bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-700 hover:text-blue-600 transition-all duration-300 p-2 rounded-xl hover:bg-blue-50 lg:hidden"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
              Citizen Dashboard
            </h2>

            {isPremium && (
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/30 animate-pulse">
                  ⭐ PREMIUM
                </span>
                <Link
                  to="/citizen/contactSuportTem"
                  className="text-sm font-medium text-blue-600 hover:underline hidden md:inline"
                >
                  Support Center
                </Link>
              </div>
            )}
          </div>
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
                  `flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/40"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                  }`
                }
              >
                <Icon className="text-xl group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <div className="relative group p-2 rounded-xl hover:bg-blue-50 transition-all">
            <IoMdNotificationsOutline className="text-3xl text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse border-2 border-white">
              5
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div
              className={`w-12 h-12 rounded-full p-0.5 shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                isPremium
                  ? "bg-gradient-to-br from-yellow-400 to-amber-500 ring-4 ring-yellow-300/50"
                  : "bg-gradient-to-br from-blue-500 to-cyan-500 ring-4 ring-blue-300/30"
              }`}
            >
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                {getAvatarUrl() ? (
                  <img
                    src={getAvatarUrl()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-avatar.jpg";
                    }}
                  />
                ) : (
                  <div className="text-3xl font-bold text-gray-700">
                    {user?.name?.charAt(0).toUpperCase() || "C"}
                  </div>
                )}
              </div>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-16 h-16 rounded-full p-0.5 ${
                      isPremium
                        ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                        : "bg-gradient-to-br from-blue-500 to-cyan-500"
                    } shadow-xl`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      {getAvatarUrl() ? (
                        <img
                          src={getAvatarUrl()}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl font-bold text-gray-700">
                          {user?.name?.charAt(0).toUpperCase() || "C"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {user?.name || "Citizen"}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      {user?.email}
                    </p>
                    {isPremium && (
                      <p className="text-sm font-bold text-amber-600 mt-1 flex items-center gap-1">
                        <span>⭐</span> Premium Member
                      </p>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200 my-5" />

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-300 font-medium group"
                >
                  <CgLogOut className="text-xl group-hover:rotate-12 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu - Premium Style */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-16 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out border-r border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Quick Menu
              </h3>
              {isPremium && (
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-xl animate-pulse">
                    ⭐ PREMIUM USER
                  </span>
                </div>
              )}
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
                      `flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                      }`
                    }
                  >
                    <Icon className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </NavLink>
                );
              })}

              {isPremium && (
                <Link
                  to="/citizen/contactSuportTem"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-5 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 hover:shadow-lg transition mt-6"
                >
                  <IoMdNotificationsOutline className="text-2xl" />
                  <span className="font-medium text-lg">Support Center</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default CitizenNavbar;
