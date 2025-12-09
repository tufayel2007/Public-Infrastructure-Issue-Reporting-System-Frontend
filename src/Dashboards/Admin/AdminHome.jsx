import React from "react";

const AdminHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-3 text-gray-700">
        Welcome Admin! Here you can manage users, issues, and system activities.
      </p>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="p-5 bg-white rounded shadow">Total Issues: 50</div>
        <div className="p-5 bg-white rounded shadow">Pending: 20</div>
        <div className="p-5 bg-white rounded shadow">Completed: 30</div>
      </div>
    </div>
  );
};

export default AdminHome;
