import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

const StaffHome = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });

  const fetchIssues = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/staff/issues/my-assigned`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      // ✅ ensure array
      const issuesArray = Array.isArray(data)
        ? data
        : Array.isArray(data.issues)
        ? data.issues
        : [];

      setIssues(issuesArray);

      const pending = issuesArray.filter((i) => i.status === "pending").length;
      const inProgress = issuesArray.filter(
        (i) => i.status === "in-progress"
      ).length;
      const resolved = issuesArray.filter(
        (i) => i.status === "resolved"
      ).length;
      const closed = issuesArray.filter((i) => i.status === "closed").length;

      setStats({ pending, inProgress, resolved, closed });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch assigned issues");
    }
  };

  useEffect(() => {
    fetchIssues();
    const interval = setInterval(fetchIssues, 10000); // Auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/staff/issue/${issueId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: newStatus,
            note: `Status updated to ${newStatus} by staff`,
          }),
        }
      );
      toast.success("Status updated successfully!");
      fetchIssues();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
    { name: "Closed", value: stats.closed },
  ].filter((item) => item.value > 0);

  const COLORS = ["#facc15", "#3b82f6", "#16a34a", "#6b7280"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Staff Dashboard
          </h1>
          <p className="text-xl mt-3 text-base-content/70">
            Welcome back, Hero of the City! Here are your assigned missions
          </p>
        </div>

        {/* Stats Cards - Modern Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Pending",
              value: stats.pending,
              color: "from-yellow-500 to-orange-500",
              icon: "Clock",
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              color: "from-blue-500 to-cyan-500",
              icon: "Wrench",
            },
            {
              label: "Resolved",
              value: stats.resolved,
              color: "from-green-500 to-emerald-500",
              icon: "CheckCircle",
            },
            {
              label: "Closed",
              value: stats.closed,
              color: "from-gray-500 to-slate-600",
              icon: "Archive",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} p-1 shadow-xl`}
            >
              <div className="bg-base-100/95 backdrop-blur rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold text-base-content">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-base-content/80 mt-2">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="bg-base-100 rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Issue Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={60}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelStyle={{ fontWeight: "bold", fill: "#fff" }}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Assigned Issues Table */}
        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              My Assigned Issues ({issues.length})
            </h2>
          </div>

          {issues.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-9xl mb-6">All Clear</div>
              <p className="text-2xl font-semibold text-base-content/70">
                No issues assigned yet. Enjoy your coffee!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-300 text-base">
                  <tr>
                    <th>Title</th>
                    <th>Citizen</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Action</th>
                    <th>Latest Update</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => {
                    const latest = issue.timeline?.[issue.timeline.length - 1];
                    return (
                      <tr
                        key={issue._id}
                        className="hover:bg-primary/5 transition-all"
                      >
                        <td>
                          <div className="font-semibold">{issue.title}</div>
                          <div className="text-sm opacity-70">
                            {issue.category.replace("-", " ")}
                          </div>
                        </td>
                        <td>{issue.citizenName || "Anonymous"}</td>
                        <td>
                          <select
                            value={issue.status}
                            onChange={(e) =>
                              handleStatusChange(issue._id, e.target.value)
                            }
                            className={`select select-sm font-bold ${
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
                            className={`badge ${
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
                            className="btn btn-primary btn-sm hover:scale-110 transition"
                          >
                            Update
                          </Link>
                        </td>
                        <td className="text-sm">
                          {latest ? (
                            <div>
                              <span className="font-medium">
                                {latest.status}
                              </span>
                              : {latest.message}
                              <div className="text-xs opacity-70">
                                {new Date(latest.date).toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            "No updates"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
