import React from "react";

const RecentUsers = ({ users = [], loading }) => {
  if (loading) return <div>Loading users...</div>;
  if (!users || users.length === 0)
    return <div className="text-gray-500">No recent users</div>;

  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u._id} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {u.name?.charAt(0) ?? "U"}
          </div>
          <div>
            <div className="font-medium">{u.name}</div>
            <div className="text-xs text-gray-500">{u.email}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecentUsers;
