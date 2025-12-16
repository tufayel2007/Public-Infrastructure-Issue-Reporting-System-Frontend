import React from "react";
import { Outlet } from "react-router-dom";
import CitizenSidebar from "../Dashboards/Sidebr/CitizenSidebar";

import CitizenNavbar from "./CitizenNavbar";

const CitizenLayout = () => {
  return (
    <div className="flex">
      <CitizenSidebar />

      <div style={{ flex: 1 }}>
        <CitizenNavbar></CitizenNavbar>

        <div className="p-4">
          <Outlet /> {/* এখানে child route load হবে */}
        </div>
      </div>
    </div>
  );
};

export default CitizenLayout;
