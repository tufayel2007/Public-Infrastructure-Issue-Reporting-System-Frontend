import React from "react";

const StaffHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Staff Dashboard</h1>
      <p className="mt-3 text-gray-700">
        Welcome Staff! Here are your assigned tasks and issue updates.
      </p>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="p-5 bg-black rounded shadow">Assigned Issues: 14</div>
        <div className="p-5 bg-black rounded shadow">In Progress: 5</div>
        <div className="p-5 bg-black rounded shadow">Completed: 7</div>
      </div>
    </div>
  );
};

export default StaffHome;
