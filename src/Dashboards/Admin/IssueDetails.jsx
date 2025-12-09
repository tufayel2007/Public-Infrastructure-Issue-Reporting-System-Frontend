// components/admin/AllIssues.jsx

import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";

const IssueDetails = () => {
  const [issues, setIssues] = useState([]);

  const loadIssues = () => {
    axiosSecure.get("/admin/issues").then((res) => setIssues(res.data));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleReject = (id) => {
    axiosSecure.patch(`/admin/issue/reject/${id}`).then(() => loadIssues());
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Issues</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Citizen</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((i) => (
              <tr key={i._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img src={i.imageUrl} alt="" className="w-12 h-12 rounded" />
                </td>

                <td className="p-3">{i.title}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      i.status === "pending"
                        ? "bg-yellow-500"
                        : i.status === "resolved"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>

                <td className="p-3">{i.uid}</td>

                <td className="p-3">{new Date(i.date).toLocaleDateString()}</td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReject(i._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>

                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Assign
                    </button>

                    <button className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueDetails;
