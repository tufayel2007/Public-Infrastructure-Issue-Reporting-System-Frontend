import React from "react";

const RecentIssuesTable = ({ issues }) => {
  if (!issues || issues.length === 0)
    return <div className="text-gray-500">No recent issues</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="py-2">Title</th>
            <th className="py-2">Category</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Status</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((i) => (
            <tr key={i._id} className="border-t hover:bg-gray-50">
              <td className="py-2">{i.title}</td>
              <td className="py-2">{i.category || "—"}</td>
              <td className="py-2">{i.priority || "Normal"}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded text-xs text-white ${
                    i.status === "pending"
                      ? "bg-yellow-500"
                      : i.status === "resolved"
                      ? "bg-green-600"
                      : i.status === "rejected"
                      ? "bg-red-600"
                      : "bg-blue-600"
                  }`}
                >
                  {i.status}
                </span>
              </td>
              <td className="py-2">{new Date(i.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentIssuesTable;
