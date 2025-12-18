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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-400"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-indigo-500/30 rounded-full animate-spin border-t-indigo-400 animation-delay-75"></div>
          </div>
          <p className="mt-6 text-xl font-medium text-gray-300">
            Loading latest resolved issues...
          </p>
        </div>
      </div>
    );
  }

  if (!issues.length) {
    return (
      <div className="flex justify-center py-24 px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-12 max-w-lg text-center">
          {/* Glowing background orb */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/50">
              <span className="text-4xl">✓</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              All Clear for Now!
            </h3>

            <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
              No resolved issues at the moment. Your reports help keep the city
              running smoothly — thank you!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="latest-resolved py-20 bg-gradient-to-b from-black via-gray-950 to-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Section Header with Premium Flair */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Latest Resolved Issues
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Celebrating progress — these community reports have been
            successfully resolved.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue, index) => (
            <div
              key={issue._id}
              className="group relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>

              {/* Image Container */}
              <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={
                    issue.imageUrl && !issue.imageUrl.includes("placeholder")
                      ? issue.imageUrl
                      : "/placeholder-issue.jpg"
                  }
                  alt={issue.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder-issue.jpg";
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full">
                  <span className="text-green-400 font-semibold text-sm">
                    RESOLVED
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                  {issue.title}
                </h3>

                <p className="text-indigo-400 font-medium mb-2">
                  {issue.category}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <div>
                    Priority:{" "}
                    <span
                      className={`font-bold ${
                        issue.priority === "high"
                          ? "text-red-400"
                          : issue.priority === "medium"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <div className="truncate max-w-xs">{issue.location}</div>
                </div>

                <button
                  onClick={() => navigate(`/issue/${issue._id}`)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestResolvedIssues;
