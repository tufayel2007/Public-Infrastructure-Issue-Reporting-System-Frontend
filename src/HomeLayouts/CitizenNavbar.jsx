import React from "react";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";

const CitizenNavbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const isPremium = user?.subscription === "premium";

  const getAvatarUrl = () => {
    if (!user?.avatarUrl) return null;
    if (user.avatarUrl.startsWith("http")) return user.avatarUrl;
    return `${import.meta.env.VITE_API_URL}${user.avatarUrl}`;
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left */}
      <button
        onClick={toggleSidebar}
        className="text-xl lg:hidden text-gray-700"
      >
        <FaBars />
      </button>

      {/* Center */}
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        Citizen Dashboard
        {isPremium && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-400 text-black font-bold">
            ⭐ Premium
          </span>
        )}
      </h2>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 duration-200">
          <IoMdNotificationsOutline />
        </div>

        {/* Profile */}
        <div className="relative">
          {isPremium && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] px-1 rounded-full">
              PRO
            </span>
          )}
          {getAvatarUrl() ? (
            <img
              src={getAvatarUrl()}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 cursor-pointer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <CgProfile className="text-2xl text-gray-700" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenNavbar;
