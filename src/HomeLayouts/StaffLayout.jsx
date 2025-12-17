import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../Dashboards/Sidebr/StaffSidebar";
import StaffNavbar from "../Dashboards/Staff/StaffNavbar";

const StaffLayout = () => {
  return (
    <div className="flex">
      <StaffSidebar />

      <div style={{ flex: 1 }}>
        <StaffNavbar></StaffNavbar>

        <div className="p-4">
          <Outlet /> {/* এখানে child route load হবে */}
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
