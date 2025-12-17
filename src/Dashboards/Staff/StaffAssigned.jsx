/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const StaffAssigned = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/staff/issues/my-assigned`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      const sortedIssues = (Array.isArray(data) ? data : []).sort((a, b) => {
        const aDate = a.timeline?.length
          ? new Date(a.timeline[a.timeline.length - 1].date)
          : new Date(0);

        const bDate = b.timeline?.length
          ? new Date(b.timeline[b.timeline.length - 1].date)
          : new Date(0);

        return bDate - aDate;
      });

      setIssues(sortedIssues);
    } catch (err) {
      toast.error("Failed to load assigned issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
    const interval = setInterval(fetchIssues, 1500000); // Auto refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await fetch(
        `${
          import.meta.env.VITE_API_URL || "https://issue-server-site.vercel.app"
        }/staff/issue/${issueId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: newStatus,
            note: `Status changed to ${newStatus} by staff`,
          }),
        }
      );
      toast.success("Status updated successfully!");
      fetchIssues();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            My Assigned Issues
          </h1>
          <p className="text-xl text-base-content/70">
            You're the hero fixing the city — one issue at a time
          </p>
          <div className="mt-4 inline-block px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold">
            Total Assigned: {issues.length}
          </div>
        </div>

        {/* Empty State */}
        {issues.length === 0 && (
          <div className="text-center py-32">
            <div className="text-9xl mb-8 animate-bounce">All Clear</div>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              No Issues Assigned Yet!
            </h3>
            <p className="text-2xl mt-6 text-base-content/70">
              Great job! Take a break, you've earned it
            </p>
          </div>
        )}

        {/* Issues Table - Premium Style */}
        {issues.length > 0 && (
          <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
            <div className="bg-gradient-to-r from-primary to-secondary p-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Active Missions ({issues.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                  <tr>
                    <th className="text-left">Issue Details</th>
                    <th>Citizen</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Action</th>
                    <th>Latest Update</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => {
                    const latest = issue.timeline?.[issue.timeline?.length - 1];

                    return (
                      <tr
                        key={issue._id}
                        className="hover:bg-primary/5 transition-all duration-300 hover:scale-[1.01] cursor-pointer border-b border-base-300"
                      >
                        <td>
                          <div className="flex items-center gap-4">
                            <ss
                              src={`${import.meta.env.VITE_API_URL}${
                                issue.imageUrl || "/placeholder.jpg"
                              }`}
                              alt="issue"
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md"
                            />

                            <div>
                              <div className="font-bold text-lg">
                                {issue.title}
                              </div>
                              <div className="text-sm opacity-70">
                                {issue.category.replace("-", " ")} •{" "}
                                {issue.location}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="font-medium">
                            {issue.citizenName || "Anonymous"}
                          </div>
                        </td>

                        <td>
                          <select
                            value={issue.status}
                            onChange={(e) =>
                              handleStatusChange(issue._id, e.target.value)
                            }
                            className={`select select-sm font-bold w-full max-w-xs ${
                              issue.status === "pending"
                                ? "select-warning"
                                : issue.status === "in-progress"
                                ? "select-info"
                                : issue.status === "resolved"
                                ? "select-success"
                                : "select-ghost"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>

                        <td>
                          <span
                            className={`badge badge-lg font-bold ${
                              issue.priority === "high"
                                ? "badge-error animate-pulse"
                                : "badge-success"
                            }`}
                          >
                            {issue.priority === "high" ? "Urgent" : "Normal"}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={`/staff/issues/${issue._id}`}
                            className="btn btn-primary btn-sm hover:scale-110 hover:shadow-xl transition-all"
                          >
                            Update Now
                          </Link>
                        </td>

                        <td className="text-sm">
                          {latest ? (
                            <div>
                              <div className="font-semibold text-primary">
                                {latest.status.toUpperCase()}
                              </div>
                              <div className="opacity-80">{latest.message}</div>
                              <div className="text-xs opacity-60 mt-1">
                                {new Date(latest.date).toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-base-content/50">
                              No updates yet
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAssigned;
