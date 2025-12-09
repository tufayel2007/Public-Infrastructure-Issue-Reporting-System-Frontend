import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const CitizenHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-gray-700 mt-2">This is your citizen dashboard.</p>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="bg-white p-5 rounded shadow">Total Issues</div>
        <div className="bg-white p-5 rounded shadow">Pending</div>
        <div className="bg-white p-5 rounded shadow">Resolved</div>
      </div>
    </div>
  );
};

export default CitizenHome;
