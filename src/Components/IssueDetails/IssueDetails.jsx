import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  // ---------------- Fetch single issue ----------------
  const fetchIssue = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        headers: { authorization: "Bearer demo-token" },
      });
      if (!res.ok) throw new Error("Failed to fetch issue");
      const data = await res.json();
      setIssue(data);
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
      });
    } catch (err) {
      toast.error("Issue not found");
      navigate("/all-issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  // ---------------- Edit issue ----------------
  const handleEdit = async () => {
    if (!form.title || !form.description) {
      return toast.error("Title and Description are required");
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer demo-token",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Issue updated successfully!");
        setEditing(false);
        fetchIssue();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Failed to update issue");
    }
  };

  // ---------------- Delete issue ----------------
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        method: "DELETE",
        headers: { authorization: "Bearer demo-token" },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Issue deleted successfully!");
        navigate("/all-issues");
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch {
      toast.error("Failed to delete issue");
    }
  };

  // ---------------- Boost priority ----------------
  const handleBoost = async () => {
    if (!window.confirm("Pay 100 Taka to boost priority?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${id}/boost`,
        {
          method: "PUT",
          headers: { authorization: "Bearer demo-token" },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Priority boosted to High!");
        fetchIssue();
      } else {
        toast.error(data.message || "Boost failed");
      }
    } catch {
      toast.error("Failed to boost priority");
    }
  };

  // ---------------- Loading & null handling ----------------
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!issue) return null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 mt-24">
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>

      {issue.imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL}${issue.imageUrl}`}
          className="w-full h-64 object-cover rounded mb-4"
          alt="issue"
        />
      )}

      {editing ? (
        <div className="space-y-3 mb-4">
          <input
            className="input input-bordered w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <select
            className="select select-bordered w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="pothole">Pothole</option>
            <option value="streetlight">Streetlight</option>
            <option value="garbage">Garbage</option>
            <option value="water-leakage">Water Leakage</option>
          </select>
          <input
            className="input input-bordered w-full"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
          />
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setEditing(false);
                setForm({
                  title: issue.title,
                  description: issue.description,
                  category: issue.category,
                  location: issue.location,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-1">
            <b>Category:</b> {issue.category}
          </p>
          <p className="mb-1">
            <b>Location:</b> {issue.location}
          </p>
          <p className="mb-1">
            <b>Status:</b>{" "}
            <span className="badge badge-outline">{issue.status}</span>
          </p>
          <p className="mb-4">
            <b>Priority:</b>{" "}
            <span
              className={`badge ${
                issue.priority === "High" ? "badge-primary" : "badge-outline"
              }`}
            >
              {issue.priority || "Normal"}
            </span>
          </p>

          {/* ✅ Edit/Delete buttons: Only own pending issues */}
          {issue.uid === "demo-user-id" &&
            issue.status === "pending" &&
            !editing && (
              <div className="flex gap-2 mb-4">
                <button
                  className="btn btn-warning"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
                <button className="btn btn-error" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}

          <button className="btn btn-success mb-4" onClick={handleBoost}>
            Boost Priority
          </button>
        </>
      )}

      {/* Timeline */}
      <h2 className="text-2xl font-bold mb-2">Timeline</h2>
      <div className="space-y-2 border-t pt-2">
        {issue.timeline?.map((t, i) => (
          <div key={i} className="p-2 border rounded">
            <p>
              <b>Status:</b> {t.status} | <b>Updated By:</b> {t.updatedBy}
            </p>
            <p>{t.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(t.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueDetails;
