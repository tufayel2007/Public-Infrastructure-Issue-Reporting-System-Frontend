// src/Dashboards/Admin/ManageIssues.jsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import StaffAssigned from "../Staff/StaffAssigned";

const AdminManageIssues = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // এখানে issues নাম ঠিক আছে, এটা useQuery থেকে আসছে
  const {
    data: issuesData, // ← এই নামটা যেকোনো হতে পারে
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "adminIssues",
      search,
      filterStatus,
      filterCategory,
      filterPriority,
      page,
    ],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/issues?search=${encodeURIComponent(
          search
        )}&status=${filterStatus}&category=${filterCategory}&priority=${filterPriority}&page=${page}&limit=15`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data.issues || data || []; // ব্যাকএন্ড যা পাঠাক
    },
  });

  // এখানে issues হলো issuesData.issues (যদি অবজেক্ট আসে) অথবা সরাসরি array
  const issues = Array.isArray(issuesData)
    ? issuesData
    : issuesData?.issues || [];

  const handleAssignStaff = (issue) => {
    setSelectedIssue(issue);
    document.getElementById("assign_modal").showModal();
  };

  const handleReject = (issue) => {
    Swal.fire({
      title: "Reject এই ইস্যু?",
      input: "text",
      inputLabel: "রিজেক্ট করার কারণ লিখুন",
      showCancelButton: true,
      confirmButtonText: "Reject করুন",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_API_URL}/admin/issue/reject/${issue._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ reason: result.value }),
          }
        ).then(() => {
          Swal.fire("Rejected!", "", "success");
          refetch();
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">সকল ইস্যু ম্যানেজ করুন</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="সার্চ করুন..."
          className="input input-bordered"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered"
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">সব স্ট্যাটাস</option>
          <option>pending</option>
          <option>in-progress</option>
          <option>resolved</option>
          <option>rejected</option>
        </select>
        <select
          className="select select-bordered"
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">সব ক্যাটাগরি</option>
          <option>pothole</option>
          <option>streetlight</option>
          <option>garbage</option>
          <option>water-leakage</option>
        </select>
        <select
          className="select select-bordered"
          onChange={(e) => {
            setFilterPriority(e.target.value);
            setPage(1);
          }}
        >
          <option value="">সব প্রায়োরিটি</option>
          <option>high</option>
          <option>normal</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>ইস্যু</th>
              <th>নাগরিক</th>
              <th>ক্যাটাগরি</th>
              <th>স্ট্যাটাস</th>
              <th>প্রায়োরিটি</th>
              <th>আপভোট</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className={issue.priority === "high" ? "bg-red-50" : ""}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={issue.imageUrl || "/placeholder.jpg"}
                      alt="issue"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-bold">{issue.title}</div>
                      <div className="text-sm opacity-70">{issue.location}</div>
                    </div>
                  </div>
                </td>
                <td>{issue.citizenName || "অজানা"}</td>
                <td>{issue.category}</td>
                <td>
                  <span className="badge badge-ghost">{issue.status}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high" ? "badge-error" : "badge-ghost"
                    }`}
                  >
                    {issue.priority === "high" ? "High" : "Normal"}
                  </span>
                </td>
                <td>{issue.upvotes?.length || 0}</td>
                <td className="space-x-2">
                  {!issue.assignedStaff && issue.status === "pending" && (
                    <button
                      onClick={() => handleAssignStaff(issue)}
                      className="btn btn-sm btn-primary"
                    >
                      Assign
                    </button>
                  )}
                  {issue.status === "pending" && (
                    <button
                      onClick={() => handleReject(issue)}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  )}
                  <a
                    href={`/issue/${issue._id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="btn"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="btn">
          Next
        </button>
      </div>

      <StaffAssigned issue={selectedIssue} refetch={refetch} />
    </div>
  );
};

export default AdminManageIssues;
