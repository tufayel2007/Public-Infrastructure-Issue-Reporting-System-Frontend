import React from "react";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => toggleSidebar && toggleSidebar()}
        className="text-xl lg:hidden text-gray-700"
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-700">Admin Dashboard</h2>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <div
          className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 duration-200"
          title="Notifications"
        >
          <IoMdNotificationsOutline />
        </div>

        {/* Profile */}
        <div
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          title="Profile"
        >
          <CgProfile className="text-2xl text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
