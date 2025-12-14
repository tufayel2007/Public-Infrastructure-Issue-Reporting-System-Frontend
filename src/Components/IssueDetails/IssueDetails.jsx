import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

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

  // Fetch issue
  const fetchIssue = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) {
        // try to show server message if any
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to fetch issue");
      }

      const data = await res.json();
      setIssue(data);

      setForm({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        location: data.location || "",
      });
    } catch (err) {
      toast.error(err.message || "Issue not found");
      navigate(`/issues/${id}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Edit issue (save)
  const handleEdit = async () => {
    if (!form.title || !form.description)
      return toast.error("Title & Description required");

    // Frontend guard: only allow editing if pending
    if (issue?.status !== "pending") {
      return toast.error("Cannot edit — issue is not pending");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      if (data.success) {
        toast.success("Updated");
        setEditing(false);
        fetchIssue();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  // Delete issue
  const handleDelete = async () => {
    if (!confirm("Delete this issue?")) return;

    // Frontend guard: only allow deleting if pending
    if (issue?.status !== "pending") {
      return toast.error("Cannot delete — issue is not pending");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      if (data.success) {
        toast.success("Deleted");
        navigate(`/issues/${id}`);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  // Mark as Resolved
  const handleMarkResolved = async () => {
    if (!confirm("Mark this issue as resolved?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/staff/issue/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "resolved", note: "Marked resolved" }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      if (data.success) {
        toast.success("Marked resolved");
        fetchIssue();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error(err.message || "Operation failed");
    }
  };

  // Close issue
  const handleClose = async () => {
    if (!confirm("Close this issue? (No further edits allowed)")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/staff/issue/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "closed", note: "Closed by user" }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      if (data.success) {
        toast.success("Closed");
        fetchIssue();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error(err.message || "Operation failed");
    }
  };

  // ---------------- BOOST PAYMENT ----------------
  const handleBoost = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/boost/create-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ issueId: id, amount: 100 }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Boost failed");

      // 🔥 New Stripe Method — direct redirect
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Boost failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!issue) return null;

  // helper: whether editing allowed
  const canEdit = issue.status === "pending";

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

      {/* Edit / view mode */}
      {editing ? (
        <div className="space-y-3 mb-4">
          <input
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <input
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
          />
          <input
            className="w-full p-2 border rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
          />

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              disabled={!canEdit}
              className={`px-4 py-2 rounded text-white ${
                canEdit ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                // reset form to latest issue values
                setForm({
                  title: issue.title,
                  description: issue.description,
                  category: issue.category,
                  location: issue.location,
                });
              }}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>
            <b>Category:</b> {issue.category}
          </p>
          <p>
            <b>Location:</b> {issue.location}
          </p>
          <p>
            <b>Status:</b> {issue.status}
          </p>
          <p>
            <b>Priority:</b> {issue.priority}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Edit button shown but disabled if not pending */}
            <button
              onClick={() => setEditing(true)}
              disabled={!canEdit}
              className={`px-4 py-2 rounded text-white ${
                canEdit ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={!canEdit}
              className={`px-4 py-2 rounded text-white ${
                canEdit ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Delete
            </button>

            {/* Boost button - you may want to disable boosting for closed issues */}
            <button
              onClick={handleBoost}
              disabled={issue.status === "closed"}
              className={`px-4 py-2 rounded text-white ${
                issue.status === "closed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600"
              }`}
            >
              Boost Now (৳100)
            </button>

            {/* Staff / user actions: mark resolved / close — show depending on status */}
            {issue.status !== "resolved" && issue.status !== "closed" && (
              <button
                onClick={handleMarkResolved}
                className="px-4 py-2 rounded text-white bg-green-600"
              >
                Mark Resolved
              </button>
            )}

            {issue.status !== "closed" && (
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded text-white bg-indigo-600"
              >
                Close
              </button>
            )}
          </div>
        </>
      )}

      {/* Timeline */}
      <h2 className="text-2xl font-bold mb-2 mt-5">Timeline</h2>
      {issue.timeline?.map((t, i) => (
        <div key={i} className="p-2 border rounded mb-2">
          <p>
            <b>Status:</b> {t.status}
          </p>
          <p>{t.message}</p>
          <small>{new Date(t.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default IssueDetails;
