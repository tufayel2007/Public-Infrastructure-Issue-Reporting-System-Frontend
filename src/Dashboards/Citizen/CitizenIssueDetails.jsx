/* eslint-disable no-unused-vars */
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (!issue) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Card with Glass Effect */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            {issue.imageUrl ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${issue.imageUrl}`}
                alt="issue"
                className="w-full h-96 object-cover opacity-90"
              />
            ) : (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-96 flex items-center justify-center">
                <p className="text-5xl font-bold opacity-30">NO IMAGE</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
                {issue.title}
              </h1>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="badge badge-lg badge-primary">
                  {issue.category}
                </span>
                <span className="badge badge-lg badge-outline border-white/50">
                  {issue.location}
                </span>
                <span
                  className={`badge badge-lg ${
                    issue.priority === "High"
                      ? "badge-error animate-pulse"
                      : "badge-ghost"
                  }`}
                >
                  {issue.priority || "Normal"} Priority
                </span>
                <span className="badge badge-lg badge-success">
                  {issue.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-10">
            {editing ? (
              <div className="space-y-5 animate-fadeIn">
                <input
                  type="text"
                  className="input input-bordered input-lg w-full bg-white/5 border-white/20 text-white placeholder-gray-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Issue Title"
                />
                <textarea
                  className="textarea textarea-bordered textarea-lg w-full bg-white/5 border-white/20 text-white placeholder-gray-400 h-40"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the issue..."
                />
                <select
                  className="select select-bordered select-lg w-full bg-white/5 border-white/20 text-white"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="pothole">Pothole</option>
                  <option value="streetlight">Streetlight</option>
                  <option value="garbage">Garbage</option>
                  <option value="water-leakage">Water Leakage</option>
                </select>
                <input
                  type="text"
                  className="input input-bordered input-lg w-full bg-white/5 border-white/20 text-white"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Location"
                />

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleEdit}
                    className="btn btn-primary btn-lg flex-1"
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
                    className="btn btn-ghost btn-lg flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="prose prose-invert max-w-none mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">
                    Description
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {issue.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {issue.uid === "demo-user-id" &&
                    issue.status === "pending" && (
                      <>
                        <button
                          onClick={() => setEditing(true)}
                          className="btn btn-warning btn-lg shadow-lg hover:scale-105 transition"
                        >
                          Edit Issue
                        </button>
                        <button
                          onClick={handleDelete}
                          className="btn btn-error btn-lg shadow-lg hover:scale-105 transition"
                        >
                          Delete Issue
                        </button>
                      </>
                    )}
                  <button
                    onClick={handleBoost}
                    className="btn btn-success btn-lg shadow-lg hover:scale-105 transition flex items-center gap-2"
                  >
                    Boost Priority (100৳)
                  </button>
                </div>

                {/* Timeline Section */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Activity Timeline
                  </h2>
                  <div className="space-y-4">
                    {issue.timeline?.length > 0 ? (
                      issue.timeline.map((t, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-sm"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                              {i + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-purple-300">
                                {t.status}
                              </span>
                              <span className="text-sm text-gray-400">
                                by {t.updatedBy}
                              </span>
                            </div>
                            <p className="text-gray-200">{t.message}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(t.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-400 py-10">
                        No timeline updates yet.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
