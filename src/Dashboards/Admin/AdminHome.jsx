// components/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import IssuesPieChart from "../Charts/IssuesPieChart";
import IssuesBarChart from "../Charts/IssuesBarChart";

const AdminHome = () => {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/issues").then((res) => setIssues(res.data));
    axiosSecure.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const pending = issues.filter((i) => i.status === "pending").length;
  const progress = issues.filter((i) => i.status === "in-progress").length;
  const resolved = issues.filter((i) => i.status === "resolved").length;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* STAT CARDS */}
      <div className="cards">
        <div className="card">Total Issues: {issues.length}</div>
        <div className="card">Pending: {pending}</div>
        <div className="card">In Progress: {progress}</div>
        <div className="card">Resolved: {resolved}</div>
        <div className="card">Total Users: {users.length}</div>
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: 20 }}>
        <IssuesPieChart
          pending={pending}
          progress={progress}
          resolved={resolved}
        />
        <IssuesBarChart issues={issues} />
      </div>
    </div>
  );
};

export default AdminHome;
