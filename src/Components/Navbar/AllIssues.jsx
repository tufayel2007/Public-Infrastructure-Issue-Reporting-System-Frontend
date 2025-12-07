import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const reactionTypes = ["like", "love", "haha", "wow", "sad", "angry"];

const AllIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [commentTexts, setCommentTexts] = useState({});

  const fetchIssues = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/issues?page=${page}&limit=8&search=${search}&category=${category}&status=${status}`
      );
      const data = await res.json();
      setIssues(data.issues || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error("Failed to load issues");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [page, search, category, status]);

  const handleReact = async (id, type) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${id}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer demo-token",
          },
          body: JSON.stringify({ type }),
        }
      );
      const data = await res.json();
      if (data.success) fetchIssues();
      else toast.error("Reaction failed");
    } catch {
      toast.error("Reaction failed");
    }
  };

  const handleComment = async (id, text) => {
    if (!text) return toast.error("Comment cannot be empty");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer demo-token",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Comment added!");
        setCommentTexts((prev) => ({ ...prev, [id]: "" }));
        fetchIssues();
      } else toast.error("Failed to comment");
    } catch {
      toast.error("Failed to comment");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by title or location..."
            className="input input-bordered w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-gray-500" />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="pothole">Pothole</option>
            <option value="streetlight">Streetlight</option>
            <option value="garbage">Garbage</option>
          </select>
          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {issues.map((issue) => (
          <div key={issue._id} className="card bg-white shadow p-4 rounded-lg">
            <img
              src={
                issue.imageUrl
                  ? `${import.meta.env.VITE_API_URL}${issue.imageUrl}`
                  : "https://via.placeholder.com/300"
              }
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{issue.title}</h3>
            <p className="text-sm text-gray-500">{issue.location}</p>
            <div className="flex justify-between items-center mt-3 mb-2">
              <span className="badge badge-outline">{issue.status}</span>
            </div>

            {/* Reactions */}
            <div className="flex gap-2 mb-2">
              {reactionTypes.map((type) => {
                const count =
                  issue.reactions?.filter((r) => r.type === type).length || 0;
                const reacted = issue.reactions?.some(
                  (r) => r.type === type && r.uid === "demo-user-id"
                );
                return (
                  <button
                    key={type}
                    onClick={() => handleReact(issue._id, type)}
                    className={`btn btn-sm ${
                      reacted ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {type} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Comment Input */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="input input-bordered w-full mb-1"
                value={commentTexts[issue._id] || ""}
                onChange={(e) =>
                  setCommentTexts((prev) => ({
                    ...prev,
                    [issue._id]: e.target.value,
                  }))
                }
              />
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={() =>
                  handleComment(issue._id, commentTexts[issue._id])
                }
              >
                Comment
              </button>
            </div>

            {/* View Details */}
            <button
              className="btn btn-primary w-full mt-2"
              onClick={() => navigate(`/issues/${issue._id}`)}
            >
              View Details
            </button>

            {/* Comments List */}
            <div className="space-y-2 mt-2">
              {issue.comments?.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={c.avatarUrl} className="h-6 w-6 rounded-full" />
                  <b>{c.name}:</b> {c.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
