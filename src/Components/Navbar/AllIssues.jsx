/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaRegComment,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const reactionTypes = ["like", "love", "haha", "wow", "sad", "angry"];

const getStatusInfo = (status) => {
  switch (status) {
    case "pending":
      return { className: "bg-yellow-100 text-yellow-800", icon: "🕒" };
    case "in-progress":
      return { className: "bg-blue-100 text-blue-800", icon: "🛠️" };
    case "resolved":
      return { className: "bg-green-100 text-green-800", icon: "✅" };
    default:
      return { className: "bg-gray-100 text-gray-800", icon: "" };
  }
};

const AllIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [commentTexts, setCommentTexts] = useState({});
  const token = localStorage.getItem("token");
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/issues?page=${page}&limit=8&search=${search}&category=${category}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    if (!id || !type) return toast.error("Invalid reaction data");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${id}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Network response not ok:", errText);
        return toast.error("Reaction failed (network error)");
      }

      const data = await res.json();
      if (data.success) {
        // Refresh local AllIssues list
        fetchIssues();
        // Invalidate admin cache to auto-update admin panel
        queryClient.invalidateQueries({ queryKey: ["adminIssues"] });
        toast.success("Reaction updated!");
      } else {
        toast.error("Reaction failed (server error)");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Reaction failed (unexpected error)");
    }
  };

  const handleComment = async (id, text) => {
    if (!text) return toast.error("Comment cannot be empty");
    try {
      // NOTE: Logic for Comment remains unchanged
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
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

  // Custom helper for formatting date
  const formatIssueDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
          🌍 Community Issues Hub
        </h1>

        {/* 🔍 Search + Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between p-4 bg-white shadow-lg rounded-xl">
          <div className="flex-grow flex items-center bg-gray-100 rounded-lg p-2">
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full bg-gray-100 p-2 focus:outline-none text-gray-700 placeholder-gray-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to page 1 on new search
              }}
            />
            <FaSearch className="text-gray-500 mr-2" />
          </div>
          <div className="flex gap-3 flex-wrap justify-end">
            <select
              className="select select-bordered w-full md:w-auto border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Categories</option>
              <option value="pothole">Pothole</option>
              <option value="streetlight">Streetlight</option>
              <option value="garbage">Garbage</option>
            </select>
            <select
              className="select select-bordered w-full md:w-auto border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <hr className="mb-8" />

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          {issues.map((issue) => {
            const statusInfo = getStatusInfo(issue.status);
            return (
              <div
                key={issue._id}
                className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      issue.imageUrl?.startsWith("http")
                        ? issue.imageUrl
                        : `${import.meta.env.VITE_API_URL}${issue.imageUrl}`
                    }
                    alt={issue.title}
                  />

                  <div
                    className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.className}`}
                  >
                    {statusInfo.icon}{" "}
                    {issue.status.charAt(0).toUpperCase() +
                      issue.status.slice(1)}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-1">
                    {issue.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-1 text-red-500" />
                    <p className="line-clamp-1">{issue.location}</p>
                    <span className="mx-2 text-gray-300">|</span>
                    <FaCalendarAlt className="mr-1 text-blue-500" />
                    <p className="text-xs">
                      {formatIssueDate(issue.date)} {/* createdAt → date */}
                    </p>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap border-t pt-3">
                    {reactionTypes.map((type) => {
                      const count =
                        issue.reactions?.filter((r) => r.type === type)
                          .length || 0;

                      const reacted = issue.reactions?.some(
                        (r) => r.uid === "demo-user-id" && r.type === type
                      ); // Check if current user reacted with this type

                      return (
                        <button
                          key={type}
                          onClick={() => handleReact(issue._id, type)}
                          className={`btn btn-xs min-h-0 h-7 px-2 py-0.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                            reacted
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {type === "like"
                            ? "👍"
                            : type === "love"
                            ? "❤️"
                            : type === "haha"
                            ? "😂"
                            : type === "wow"
                            ? "😮"
                            : type === "sad"
                            ? "😢"
                            : type === "angry"
                            ? "😡"
                            : ""}
                          {count > 0 && ` ${count}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Comment Input */}
                  <div className="mb-6">
                    <div className="relative flex items-center">
                      {/* Main Input */}
                      <input
                        type="text"
                        placeholder="Add your support or comment..."
                        className={`w-full px-5 py-3 pl-5 pr-14 text-sm bg-white border-2 rounded-full shadow-inner transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder-gray-400 text-gray-800 ${
                          commentTexts[issue._id]?.trim()
                            ? "border-indigo-300"
                            : "border-gray-200"
                        }`}
                        value={commentTexts[issue._id] || ""}
                        onChange={(e) =>
                          setCommentTexts((prev) => ({
                            ...prev,
                            [issue._id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // Prevents newline if you want
                            handleComment(issue._id, commentTexts[issue._id]);
                          }
                        }}
                      />

                      {/* Send Button */}
                      <button
                        onClick={() =>
                          handleComment(issue._id, commentTexts[issue._id])
                        }
                        disabled={!commentTexts[issue._id]?.trim()}
                        className={`absolute right-1 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                          commentTexts[issue._id]?.trim()
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-110"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <MdOutlineDoubleArrow className="text-xl rotate-[-90deg]" />
                      </button>
                    </div>

                    {/* Optional: Helper text */}
                    <p className="text-xs text-gray-500 mt-2 ml-4">
                      Press Enter to send • Show your support!
                    </p>
                  </div>

                  {/* View All Comments Button - Only if there are comments */}
                  {issue.comments && issue.comments.length > 0 && (
                    <button
                      onClick={() => navigate(`/issue/${issue._id}`)}
                      className="w-full mb-3 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaRegComment className="text-lg" />
                      See All Comments ({issue.comments.length})
                    </button>
                  )}

                  {/* View Details Button */}
                  <button
                    className="btn btn-primary w-full mt-2"
                    onClick={() => navigate(`/issue/${issue._id}`)}
                  >
                    View Details
                  </button>
                  {/* Comments List Preview */}
                  {issue.comments && issue.comments.length > 0 && (
                    <div className="space-y-2 mt-4 border-t pt-3">
                      <div className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                        <FaRegComment className="mr-1" />
                        Latest Comments ({issue.comments.length})
                      </div>
                      {issue.comments.slice(0, 2).map(
                        (
                          c,
                          i // Show max 2 comments
                        ) => (
                          <div className="flex items-start gap-2 text-xs bg-gray-50 p-2 rounded-lg">
                            {/* Commenter's Avatar */}
                            <img
                              src={
                                c.avatar?.startsWith("http")
                                  ? c.avatar
                                  : c.avatar
                                  ? `${import.meta.env.VITE_API_URL}${c.avatar}`
                                  : "https://via.placeholder.com/40?text=👤"
                              }
                              alt={c.name}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/40?text=👤";
                              }}
                            />
                            <div className="leading-tight">
                              <b className="font-bold text-gray-900">
                                {c.name}:
                              </b>
                              <span className="text-gray-600 ml-1 line-clamp-2">
                                {c.text}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {issues.length === 0 && (
          <div className="min-h-[50vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-10 text-center">
              <div className="text-6xl mb-6">🔐</div>

              <h2 className="text-3xl font-extrabold text-white mb-4">
                Login Required,
              </h2>
              <h2 className="text-3xl font-extrabold text-orange-300 mb-4">
                Plasse wite
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                To view issues and access this feature, you must be logged in.
                <br />
                Please create an account using your email and password, or log
                in to your existing account to continue.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/CitizenRegister"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:scale-105 transition"
                >
                  Create Account
                </Link>

                <Link
                  to="/adminLogin"
                  className="px-8 py-4 rounded-2xl rounded-2xl bg-gray-800 text-white font-bold text-lg border border-gray-700 shadow-xl hover:bg-gray-700 transition"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}

        <hr className="mt-10" />

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="btn-group">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`btn min-w-10 ${
                  page === i + 1
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
