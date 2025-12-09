import React from "react";
import { Outlet } from "react-router-dom";
import CitizenSidebar from "../Dashboards/Sidebr/CitizenSidebar";

const CitizenLayout = () => {
  return (
    <div className="flex">
      <CitizenSidebar />

      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default CitizenLayout;
