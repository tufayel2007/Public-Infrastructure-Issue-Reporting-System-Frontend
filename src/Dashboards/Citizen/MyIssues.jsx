/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/issues?mine=true`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.issues || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            My Reported Issues
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Track all the problems you've raised for the city
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            {issues.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 opacity-20">Empty</div>
                <p className="text-2xl text-gray-400">
                  You haven't reported any issues yet.
                </p>
                <Link
                  to="/citizen/report"
                  className="mt-8 inline-block btn btn-primary btn-lg shadow-lg hover:scale-105 transition"
                >
                  Report First Issue
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg">
                      <th className="rounded-tl-2xl">Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="rounded-tr-2xl text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    // eslint-disable-next-line no-unused-vars, no-unused-vars
                    {issues.map((i, index) => (
                      <tr
                        key={i._id}
                        className="hover:bg-white/10 transition-all duration-300 border-b border-white/10"
                      >
                        <td className="font-medium text-lg text-gray-100">
                          {i.title}
                        </td>
                        <td>
                          <span
                            className={`badge badge-lg ${
                              i.category === "pothole"
                                ? "badge-error"
                                : i.category === "streetlight"
                                ? "badge-warning"
                                : i.category === "garbage"
                                ? "badge-success"
                                : "badge-info"
                            }`}
                          >
                            {i.category.replace("-", " ")}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-lg font-bold ${
                              i.status === "pending"
                                ? "badge-warning animate-pulse"
                                : i.status === "in-progress"
                                ? "badge-primary"
                                : i.status === "resolved"
                                ? "badge-success"
                                : "badge-ghost"
                            }`}
                          >
                            {i.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="text-gray-300">
                          {new Date(i.date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/citizen/issues/${i._id}`}
                            className="btn btn-outline btn-info btn-md hover:btn-primary hover:scale-110 transition shadow-lg"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Total Count Badge */}
            {issues.length > 0 && (
              <div className="mt-8 text-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Total Issues: {issues.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            to="/citizen/dashboard"
            className="btn btn-ghost btn-lg text-gray-300 hover:text-white hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
