import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CitizenIssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [boostLoading, setBoostLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/issues/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 404) {
          setError("Issue not found");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setIssue(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch issue");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id, token]);

  const handleBoost = async () => {
    if (!issue.isPremiumUser) {
      toast.error("Only premium users can boost for ৳50");
      return;
    }

    try {
      setBoostLoading(true);
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
      setBoostLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
        {/* Issue Info */}
        <h1 className="text-4xl font-bold mb-4">{issue.title}</h1>
        <p className="mb-4">{issue.description}</p>
        <p className="mb-2">
          <strong>Category:</strong> {issue.category}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {issue.status}
        </p>
        <p className="mb-2">
          <strong>Priority:</strong> {issue.priority}
        </p>
        <p className="mb-2">
          <strong>Date:</strong> {new Date(issue.date).toLocaleString()}
        </p>

        {issue.imageUrl && (
          <img
            src={
              issue.imageUrl.startsWith("http")
                ? issue.imageUrl
                : `${import.meta.env.VITE_API_URL}${issue.imageUrl}`
            }
            alt="issue"
            className="mt-4 rounded-lg border-2 border-yellow-400"
          />
        )}

        {/* Boost Button */}
        <button
          onClick={handleBoost}
          disabled={boostLoading || issue.status === "closed"}
          className={`mt-6 w-full py-4 rounded-3xl font-bold text-2xl shadow-2xl transition transform hover:scale-105 ${
            issue.status === "closed"
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white animate-pulse"
          }`}
        >
          {boostLoading ? "Redirecting..." : `Boost Priority (৳100)`}
        </button>

        {/* Edit Button */}
        {issue.status === "pending" && issue.uid === uid && (
          <button
            onClick={() => navigate(`/issues/edit/${id}`)}
            className="mt-4 w-full py-4 rounded-3xl font-bold text-2xl shadow-2xl bg-yellow-500 hover:bg-yellow-600 text-black transition"
          >
            Edit Issue
          </button>
        )}

        {/* Timeline */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Timeline</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {issue.timeline.map((item, idx) => (
              <li key={idx} className="bg-white/20 p-3 rounded-xl">
                <p className="font-semibold">{item.status}</p>
                <p>{item.message}</p>
                <p className="text-sm text-gray-300">
                  {new Date(item.date || item.createdAt).toLocaleString()} -{" "}
                  {item.updatedBy}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/citizen/issues"
          className="mt-6 inline-block btn btn-outline btn-info hover:btn-primary transition"
        >
          Back to My Issues
        </Link>
      </div>
    </div>
  );
};

export default CitizenIssueDetails;
