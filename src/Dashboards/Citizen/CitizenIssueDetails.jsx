import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/issues/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          if (res.status === 404) setError("Issue not found");
          else setError("Failed to load this issue");
          return;
        }

        const data = await res.json();
        setIssue(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to connect to server. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-400 mx-auto mb-6"></div>
          <p className="text-white text-2xl font-medium">
            Loading issue details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/40 backdrop-blur-xl border border-red-400/50 rounded-3xl p-10 max-w-lg text-center shadow-2xl">
          <p className="text-red-200 text-xl font-medium mb-6">{error}</p>
          <Link
            to="/citizen/issues"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600/80 hover:bg-red-500 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            <ArrowLeftIcon className="h-6 w-6" />
            Back to My Issues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/citizen/issues"
          className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-200 mb-10 transition-all duration-300 hover:translate-x-1 group"
        >
          <ArrowLeftIcon className="h-7 w-7 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg font-semibold">Back to My Issues</span>
        </Link>

        {/* Premium Card */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 transform hover:scale-[1.01] transition-all duration-500">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-800/60 via-cyan-800/60 to-purple-800/60 px-10 py-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {issue.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-4">
              <span className="bg-yellow-600/30 text-yellow-200 px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wide">
                Priority:{" "}
                {issue.priority.charAt(0).toUpperCase() +
                  issue.priority.slice(1)}
              </span>
              <span
                className={`px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wide ${
                  issue.status === "pending"
                    ? "bg-orange-600/30 text-orange-200"
                    : issue.status === "in-progress"
                    ? "bg-blue-600/30 text-blue-200"
                    : issue.status === "resolved"
                    ? "bg-green-600/30 text-green-200"
                    : "bg-gray-600/30 text-gray-200"
                }`}
              >
                Status:{" "}
                {issue.status.charAt(0).toUpperCase() +
                  issue.status.slice(1).replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-10 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                Description
              </h2>
              <p className="text-gray-100 leading-relaxed text-lg whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-black/20 p-6 rounded-2xl">
              <div>
                <strong className="text-purple-300 block mb-2">Category</strong>
                <p className="text-white text-lg capitalize">
                  {issue.category}
                </p>
              </div>
              <div>
                <strong className="text-purple-300 block mb-2">
                  Submitted On
                </strong>
                <p className="text-white text-lg">
                  {new Date(issue.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <strong className="text-purple-300 block mb-2">Issue ID</strong>
                <p className="text-cyan-400 font-mono text-lg">#{id}</p>
              </div>
            </div>

            {/* Image – Bigger & More Beautiful */}
            {issue.imageUrl && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6">
                  Attached Photo
                </h3>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-500/40 transform hover:scale-105 transition-all duration-500">
                  <img
                    src={
                      issue.imageUrl.startsWith("http")
                        ? issue.imageUrl
                        : `${import.meta.env.VITE_API_URL}${issue.imageUrl}`
                    }
                    alt="Issue photo"
                    className="w-full h-auto max-h-[600px] object-contain bg-gradient-to-b from-black/70 to-black/30"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=Image+Not+Available";
                      e.target.alt = "Image not available";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-black/30 px-10 py-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              Report ID: <span className="text-cyan-400 font-mono">#{id}</span>{" "}
              • Viewed on December 16, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
