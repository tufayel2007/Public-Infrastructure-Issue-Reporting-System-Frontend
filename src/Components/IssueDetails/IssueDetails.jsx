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
        navigate("/issues");
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

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
          body: JSON.stringify({
            status: "resolved",
            note: "Marked resolved by staff/user",
          }),
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
          body: JSON.stringify({
            status: "closed",
            note: "Closed by user/staff",
          }),
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
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/boost/create-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ issueId: id }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Boost failed");

      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Boost failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">
          Loading issue details...
        </p>
      </div>
    );
  if (!issue) return null;

  const canEdit = issue.status === "pending";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-pink-800 p-8 sm:p-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {issue.title}
            </h1>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
              <div className="flex items-center gap-3">
                <span className="font-medium">Category:</span>
                <span className="bg-gray-800/50 px-4 py-2 rounded-full">
                  {issue.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Location:</span>
                <span className="bg-gray-800/50 px-4 py-2 rounded-full">
                  {issue.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-5 py-2.5 text-sm font-bold uppercase rounded-full shadow-lg ${
                    issue.status === "resolved"
                      ? "bg-green-600/30 text-green-300 border border-green-500/50"
                      : issue.status === "pending"
                      ? "bg-yellow-600/30 text-yellow-300 border border-yellow-500/50"
                      : "bg-gray-600/40 text-gray-300 border border-gray-500/50"
                  }`}
                >
                  {issue.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-red-400">Priority:</span>
                <span className="text-2xl font-bold text-red-400">
                  {issue.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Issue Image */}
          {issue.imageUrl && (
            <div className="p-6 sm:p-8">
              <img
                src={`${import.meta.env.VITE_API_URL}${issue.imageUrl}`}
                className="w-full h-72 sm:h-96 object-cover rounded-2xl border-4 border-gray-800 shadow-2xl"
                alt="Issue visual reference"
              />
            </div>
          )}

          {/* Description / Edit */}
          <div className="p-6 sm:p-10">
            {editing ? (
              <div className="space-y-6">
                <input
                  type="text"
                  className="w-full px-6 py-4 text-xl bg-gray-900/70 border border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500 transition"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Issue Title"
                />
                <textarea
                  rows="6"
                  className="w-full px-6 py-4 bg-gray-900/70 border border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500 resize-none transition"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Detailed Description"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    className="px-6 py-4 bg-gray-900/70 border border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500 text-white"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    className="px-6 py-4 bg-gray-900/70 border border-gray-700 rounded-2xl focus:ring-4 focus:ring-purple-500 text-white"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Location"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button
                    onClick={handleEdit}
                    disabled={!canEdit}
                    className={`py-5 px-10 rounded-2xl font-bold text-xl shadow-2xl transition transform hover:scale-105 ${
                      canEdit
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setForm({
                        title: issue.title,
                        description: issue.description,
                        category: issue.category,
                        location: issue.location,
                      });
                    }}
                    className="py-5 px-10 rounded-2xl bg-gray-800/70 text-white font-bold shadow-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Description
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {issue.description}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons - Neon Style */}
          <div className="p-6 sm:p-10 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => setEditing(true)}
                disabled={!canEdit}
                className={`py-5 rounded-2xl font-bold text-xl shadow-2xl transition transform hover:scale-105 ${
                  canEdit
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                Edit Issue
              </button>

              <button
                onClick={handleDelete}
                disabled={!canEdit}
                className={`py-5 rounded-2xl font-bold text-xl shadow-2xl transition transform hover:scale-105 ${
                  canEdit
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                Delete Issue
              </button>

              <button
                onClick={handleBoost}
                disabled={issue.status === "closed" || loading}
                className={`py-6 rounded-3xl font-bold text-2xl shadow-2xl transition transform ${
                  issue.status === "closed" || loading
                    ? "from-gray-700 to-gray-800 text-gray-500 cursor-not-allowed"
                    : "hover:scale-110 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white animate-pulse shadow-pink-500/50"
                }`}
              >
                {loading ? (
                  "Redirecting to payment..."
                ) : issue.isPremiumUser ? (
                  <>
                    Boost Priority{" "}
                    <span className="text-green-300 font-extrabold">
                      (৳50 • Premium)
                    </span>
                  </>
                ) : (
                  "Boost Priority (৳100)"
                )}
              </button>

              {issue.status !== "resolved" && issue.status !== "closed" && (
                <button
                  onClick={handleMarkResolved}
                  className="py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl transform hover:scale-105 col-span-1 sm:col-span-2 lg:col-span-1"
                >
                  Mark as Resolved
                </button>
              )}

              {issue.status !== "closed" && (
                <button
                  onClick={handleClose}
                  className="py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-2xl transform hover:scale-105 col-span-1 sm:col-span-2 lg:col-span-1"
                >
                  Close Issue
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Timeline - Dark Glassmorphism */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 sm:p-10 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Timeline & History
          </h2>

          <div className="space-y-10">
            {issue.timeline?.map((t, i) => (
              <div
                key={i}
                className="relative pl-12 before:absolute before:left-5 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-indigo-500 before:rounded-full last:before:h-12"
              >
                <div className="absolute left-0 top-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-2xl ring-4 ring-black">
                  {i + 1}
                </div>

                <div className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition">
                  <p className="text-2xl font-bold text-white">
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    <span className="ml-5 text-sm font-normal text-gray-400">
                      {new Date(t.date).toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-3 text-gray-300 italic text-lg">
                    {t.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
