import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateIssue = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/issues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
        setStatus(data.status);
      });
  }, [id]);

  const updateStatus = () => {
    fetch(`http://localhost:5000/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => alert("Status updated successfully!"));
  };

  if (!issue) return <p>Loading...</p>;

  return (
    <div className="p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Update Issue</h1>

      <p className="mb-3 text-lg">Title: {issue.title}</p>
      <p className="mb-3">Description: {issue.description}</p>

      <select
        className="select select-bordered w-full mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <button className="btn btn-primary" onClick={updateStatus}>
        Update Status
      </button>
    </div>
  );
};

export default UpdateIssue;
