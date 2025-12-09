import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CitizenHome = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  // Fetch Citizen Stats
  const {
    data: stats = {},
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["citizenStats", user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/citizen/stats`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!user?.email,
  });

  // Fetch My Recent Issues
  const { data: recentIssues = [], isLoading: issuesLoading } = useQuery({
    queryKey: ["myRecentIssues", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/my-recent`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data.issues || [];
    },
    enabled: !!user?.email,
  });

  if (authLoading || statsLoading || issuesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const isPremium = user?.subscription === "premium";
  const remainingReports = isPremium
    ? "আনলিমিটেড"
    : `${Math.max(0, 3 - (stats.total || 0))} টি বাকি`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Blocked Warning */}
        {user?.blocked && (
          <div className="alert alert-error shadow-lg mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                />
              </svg>
              <div>
                <strong>আপনার অ্যাকাউন্ট ব্লক করা হয়েছে!</strong>
                <p>
                  নতুন রিপোর্ট, আপভোট বা বুস্ট করতে পারবেন না। অ্যাডমিনের সাথে
                  যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Hero */}
        <div className="text-center mb-16 mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
            স্বাগতম, {user?.name || "নাগরিক"}!
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light">
            একসাথে আমরা ঢাকাকে আরও সুন্দর, নিরাপদ ও স্মার্ট করছি
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        </div>

        {/* Report Limit Info */}
        <div className="text-center mb-10">
          <p className="text-lg">
            আপনার রিপোর্ট লিমিট:{" "}
            <span
              className={`font-bold ${
                remainingReports === "0 টি বাকি"
                  ? "text-red-400"
                  : "text-cyan-300"
              }`}
            >
              {remainingReports}
            </span>
          </p>

          {!isPremium && stats.total >= 3 && (
            <Link
              to="/premium"
              className="btn btn-warning btn-lg mt-4 shadow-lg hover:scale-105"
            >
              প্রিমিয়াম নিন → আনলিমিটেড রিপোর্ট
            </Link>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              label: "মোট রিপোর্ট",
              value: stats.total || 0,
              color: "from-cyan-400 to-purple-400",
            },
            {
              label: "পেন্ডিং",
              value: stats.pending || 0,
              color: "from-yellow-400 to-orange-400",
              pulse: true,
            },
            {
              label: "চলমান",
              value: stats.inProgress || 0,
              color: "from-blue-400 to-cyan-400",
            },
            {
              label: "সমাধান হয়েছে",
              value: stats.resolved || 0,
              color: "from-green-400 to-emerald-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:bg-white/20 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color}/20 blur-xl group-hover:blur-2xl transition`}
              ></div>
              <div className="relative z-10">
                <div className="text-2xl mb-4 opacity-90">{stat.label}</div>
                <p
                  className={`text-5xl font-bold bg-gradient-to-r ${
                    stat.color
                  } bg-clip-text text-transparent ${
                    stat.pulse ? "animate-pulse" : ""
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Issues */}
        {recentIssues.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              আমার সাম্প্রতিক রিপোর্টসমূহ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentIssues.slice(0, 3).map((issue) => (
                <div
                  key={issue._id}
                  className="card glass hover:scale-105 transition-all duration-300 border border-white/10"
                >
                  <figure>
                    <img
                      src={issue.imageUrl || "/placeholder-issue.jpg"}
                      alt={issue.title}
                      className="h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-lg">{issue.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`badge ${
                          issue.status === "pending"
                            ? "badge-warning"
                            : issue.status === "in-progress"
                            ? "badge-primary"
                            : "badge-success"
                        }`}
                      >
                        {issue.status}
                      </span>
                      {issue.priority === "high" && (
                        <span className="badge badge-error">Boosted</span>
                      )}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/issue/${issue._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        বিস্তারিত
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            দ্রুত কার্যক্রম
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/reportIssue"
              className="btn btn-lg btn-primary shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 text-xl"
              onClick={(e) => {
                if (!isPremium && stats.total >= 3) {
                  e.preventDefault();
                  toast.error("রিপোর্ট লিমিট শেষ! প্রিমিয়াম নিন।");
                }
              }}
            >
              নতুন সমস্যা রিপোর্ট করুন
            </Link>
            <Link
              to="/citizen/issues"
              className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 text-xl"
            >
              আমার সব রিপোর্ট
            </Link>
          </div>
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="my-16 p-10 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-md rounded-3xl border border-purple-500 text-center">
            <h3 className="text-4xl font-bold mb-6">
              প্রিমিয়াম হয়ে আরও শক্তিশালী হোন!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left mb-8">
              {[
                "আনলিমিটেড রিপোর্ট",
                "প্রায়োরিটি সাপোর্ট",
                "বুস্ট খরচ কম",
                "প্রিমিয়াম ব্যাজ",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <span className="text-2xl">Checkmark</span>
                  <span className="text-lg">{feat}</span>
                </div>
              ))}
            </div>
            <Link
              to="/premium"
              className="btn btn-lg btn-accent shadow-2xl hover:scale-105"
            >
              মাত্র ১০০০ টাকায় প্রিমিয়াম হোন
            </Link>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="text-center py-12 px-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10">
          <p className="text-3xl md:text-5xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
            "একটি অভিযোগ = একটি উন্নত শহর"
          </p>
          <p className="mt-6 text-xl text-gray-300">
            — আপনার কণ্ঠস্বর গুরুত্বপূর্ণ
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;
