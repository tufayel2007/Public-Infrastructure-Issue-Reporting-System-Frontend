// src/Dashboards/Admin/ManageIssues.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import AssignStaffModal from "./AssignStaffModal";

const reactionTypes = {
  like: "Like",
  love: "Love",
  haha: "Haha",
  wow: "Wow",
  sad: "Sad",
  angry: "Angry",
};

const AdminManageIssues = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: issuesData,
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
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data = await res.json();
      return data.issues || data || [];
    },
    refetchInterval: 3000,
  });

  const issues = Array.isArray(issuesData)
    ? issuesData
    : issuesData?.issues || [];

  // Calculate stats for hero section
  const total = issues.length;
  const pending = issues.filter((i) => i.status === "pending").length;
  const inProgress = issues.filter((i) => i.status === "in-progress").length;
  const resolved = issues.filter((i) => i.status === "resolved").length;

  const handleAssignStaff = (issue) => {
    setSelectedIssue(issue);
    document.getElementById("assign_modal").showModal();
  };

  const handleReject = (issue) => {
    Swal.fire({
      title: "Reject this issue?",
      input: "text",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter reason...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed && result.value?.trim()) {
        fetch(
          `${import.meta.env.VITE_API_URL}/admin/issue/reject/${issue._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ reason: result.value.trim() }),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Rejected!", "Issue has been rejected.", "success");
            refetch();
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleReact = async (issueId, type) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${issueId}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ type }),
        }
      );
      const data = await res.json();
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["adminIssues"] });
      } else {
        Swal.fire("Error!", data.message || "Failed to react", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Network error", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="stat bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg rounded-2xl">
          <div className="stat-title text-white/80">Total Issues</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat bg-gradient-to-br from-orange-600 to-orange-500 text-white shadow-lg rounded-2xl">
          <div className="stat-title text-white/80">Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
        <div className="stat bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg rounded-2xl">
          <div className="stat-title text-white/80">In Progress</div>
          <div className="stat-value">{inProgress}</div>
        </div>
        <div className="stat bg-gradient-to-br from-green-600 to-green-500 text-white shadow-lg rounded-2xl">
          <div className="stat-title text-white/80">Resolved</div>
          <div className="stat-value">{resolved}</div>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Manage All Issues
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            className="input input-bordered w-full pl-10 peer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <label className="absolute left-10 -top-2.5 bg-base-100 px-1 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm text-primary">
            Search issues...
          </label>
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {["status", "category", "priority"].map((filter) => (
          <select
            key={filter}
            className="select select-bordered w-full capitalize"
            value={
              filter === "status"
                ? filterStatus
                : filter === "category"
                ? filterCategory
                : filterPriority
            }
            onChange={(e) => {
              const val = e.target.value;
              if (filter === "status") setFilterStatus(val);
              if (filter === "category") setFilterCategory(val);
              if (filter === "priority") setFilterPriority(val);
              setPage(1);
            }}
          >
            <option value="">All {filter}s</option>
            {filter === "status" && (
              <>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </>
            )}
            {filter === "category" && (
              <>
                <option value="pothole">Pothole</option>
                <option value="streetlight">Street Light</option>
                <option value="garbage">Garbage</option>
                <option value="water-leakage">Water Leakage</option>
              </>
            )}
            {filter === "priority" && (
              <>
                <option value="high">High</option>
                <option value="normal">Normal</option>
              </>
            )}
          </select>
        ))}
      </div>

      {(filterStatus || filterCategory || filterPriority) && (
        <div className="flex flex-wrap gap-3 mb-6">
          {filterStatus && (
            <div className="badge badge-info badge-lg gap-2">
              Status: {filterStatus}
              <button
                onClick={() => {
                  setFilterStatus("");
                  setPage(1);
                }}
                className="ml-1"
              >
                ×
              </button>
            </div>
          )}
          {filterCategory && (
            <div className="badge badge-secondary badge-lg gap-2">
              {filterCategory.replace("-", " ")}
              <button
                onClick={() => {
                  setFilterCategory("");
                  setPage(1);
                }}
                className="ml-1"
              >
                ×
              </button>
            </div>
          )}
          {filterPriority && (
            <div className="badge badge-accent badge-lg gap-2">
              {filterPriority} Priority
              <button
                onClick={() => {
                  setFilterPriority("");
                  setPage(1);
                }}
                className="ml-1"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {issues.length === 0 && (
        <div className="text-center py-32">
          <div className="text-9xl mb-8 animate-bounce">All Clear</div>
          <h3 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            No Issues Found!
          </h3>
          <p className="text-xl mt-6 opacity-80">
            The city is running smoothly. You're doing an amazing job!
          </p>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className={`card bg-base-100/90 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-8 ${
              issue.priority === "high" ? "border-error" : "border-success"
            } rounded-2xl overflow-hidden`}
          >
            <div className="card-body p-5">
              <div className="flex gap-4">
                <img
                  src={issue.imageUrl || "/placeholder.jpg"}
                  alt="issue"
                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{issue.title}</h3>
                  <p className="text-sm opacity-70 flex items-center gap-1">
                    Location: {issue.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="badge badge-ghost">
                      {issue.category.replace("-", " ")}
                    </span>
                    <span
                      className={`badge ${
                        issue.status === "pending"
                          ? "badge-warning"
                          : issue.status === "in-progress"
                          ? "badge-info"
                          : issue.status === "resolved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {issue.status.replace("-", " ")}
                    </span>
                    {issue.priority === "high" && (
                      <span className="badge badge-error animate-pulse font-bold">
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Reactions */}
                  <div className="flex gap-4 mt-5">
                    {Object.entries(reactionTypes).map(([type, emoji]) => {
                      const count =
                        issue.reactions?.filter((r) => r.type === type)
                          .length || 0;
                      return (
                        <button
                          key={type}
                          onClick={() => handleReact(issue._id, type)}
                          className="relative group transform transition-all duration-300 hover:scale-150 hover:-translate-y-8"
                        >
                          <div className="text-4xl drop-shadow-lg">{emoji}</div>
                          {count > 0 && (
                            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                              {count}
                            </span>
                          )}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                            {count} {type}(s)
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {!issue.assignedStaff && issue.status === "pending" && (
                  <button
                    onClick={() => handleAssignStaff(issue)}
                    className="btn btn-primary btn-sm"
                  >
                    Assign Staff
                  </button>
                )}
                {issue.status === "pending" && (
                  <button
                    onClick={() => handleReject(issue)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                )}
                {issue.status === "closed" && (
                  <button
                    onClick={async () => {
                      const confirm = await Swal.fire({
                        title: "Delete permanently?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, Delete",
                        confirmButtonColor: "#d33",
                      });
                      if (confirm.isConfirmed) {
                        await fetch(
                          `${import.meta.env.VITE_API_URL}/issues/${issue._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        );
                        Swal.fire("Deleted!", "", "success");
                        refetch();
                      }
                    }}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete
                  </button>
                )}
                <a
                  href={`/issue/${issue._id}`}
                  className="btn btn-ghost btn-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto rounded-2xl shadow-2xl bg-base-100">
        <table className="table table-zebra">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white text-lg">
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Reactions</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className="hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              >
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={issue.imageUrl || "/placeholder.jpg"}
                      alt="issue"
                      className="w-14 h-14 object-cover rounded-xl shadow"
                    />
                    <div>
                      <div className="font-bold text-lg">{issue.title}</div>
                      <div className="text-sm opacity-70">{issue.location}</div>
                    </div>
                  </div>
                </td>
                <td className="capitalize font-medium">
                  {issue.category.replace("-", " ")}
                </td>
                <td>
                  <span
                    className={`badge badge-lg ${
                      issue.status === "pending"
                        ? "badge-warning"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : issue.status === "resolved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {issue.status.replace("-", " ")}
                  </span>
                </td>
                <td>
                  {issue.priority === "high" ? (
                    <span className="badge badge-error animate-pulse font-bold">
                      Urgent
                    </span>
                  ) : (
                    <span className="badge badge-success">Normal</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    {Object.entries(reactionTypes).map(([type, emoji]) => {
                      const count =
                        issue.reactions?.filter((r) => r.type === type)
                          .length || 0;
                      return count > 0 ? (
                        <span key={type} className="badge badge-ghost">
                          {emoji} {count}
                        </span>
                      ) : null;
                    })}
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2 justify-center">
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
                    {issue.status === "closed" && (
                      <button
                        onClick={async () => {
                          const confirm = await Swal.fire({
                            title: "Delete permanently?",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                          });
                          if (confirm.isConfirmed) {
                            await fetch(
                              `${import.meta.env.VITE_API_URL}/issues/${
                                issue._id
                              }`,
                              {
                                method: "DELETE",
                                headers: {
                                  authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            );
                            Swal.fire("Deleted!", "", "success");
                            refetch();
                          }
                        }}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    )}
                    <a
                      href={`/issue/${issue._id}`}
                      className="btn btn-sm btn-ghost"
                    >
                      View
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="btn btn-outline btn-lg"
        >
          Previous
        </button>
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Page {page}
        </div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-outline btn-lg"
        >
          Next
        </button>
      </div>

      <AssignStaffModal issue={selectedIssue} refetch={refetch} />
    </div>
  );
};

export default AdminManageIssues;
