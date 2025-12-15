import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LatestResolvedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestResolved = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/issues/resolved/latest?limit=6`
        );
        setIssues(res.data.issues || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestResolved();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-400 text-lg">
        Loading latest issues...
      </div>
    );
  if (!issues.length)
    return (
      <div className="text-center py-10 text-gray-400 text-lg">
        No resolved issues yet.
      </div>
    );

  return (
    <section className="latest-resolved py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
          Latest Resolved Issues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src={
                    issue.imageUrl
                      ? `${import.meta.env.VITE_API_URL}${issue.imageUrl}`
                      : "/placeholder.jpg"
                  }
                  alt={issue.title}
                  className="w-full h-56 object-cover transition duration-300 hover:scale-110"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-2">{issue.title}</h3>
              <p className="text-gray-400 mb-1">{issue.category}</p>

              <p className="mb-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    issue.status === "resolved"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {issue.status}
                </span>
              </p>

              <p className="mb-1">
                Priority:{" "}
                <span
                  className={`font-semibold ${
                    issue.priority === "high"
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {issue.priority.toUpperCase()}
                </span>
              </p>

              <p className="text-gray-400 mb-4">{issue.location}</p>

              <button
                onClick={() => navigate(`/issue/${issue._id}`)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestResolvedIssues;
