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
    ? "Unlimited"
    : `${Math.max(0, 3 - (stats.total || 0))} remaining`;

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
                <strong>Your account has been blocked!</strong>
                <p>
                  You cannot submit new reports, upvote, or boost issues. Please
                  contact an admin.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Hero */}
        <div className="text-center mb-16 mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
            Welcome,{" "}
            <span className="text-orange-300">{user?.name || "Citizen"}</span>!
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light">
            Together, we're making the city smarter, safer, and better
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        </div>

        {/* Report Limit Info */}
        <div className="text-center mb-10">
          <p className="text-lg">
            Your Report Limit:{" "}
            <span
              className={`font-bold ${
                remainingReports.includes("0")
                  ? "text-red-400"
                  : "text-cyan-300"
              }`}
            >
              {remainingReports}
            </span>
          </p>

          {!isPremium && stats.total >= 3 && (
            <Link
              to="/citizen/premium"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-500 hover:shadow-purple-500/50 hover:scale-105 mt-4"
            >
              {/* Shimmer Effect */}
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[100%]"></span>

              {/* Main Text */}
              <span className="relative z-10 flex items-center gap-3">
                Go Premium
                <span className="text-2xl font-bold">→</span>
                <span className="hidden group-hover:inline ml-2">
                  Unlimited Reports
                </span>
              </span>

              {/* Optional: Pulsing Glow Ring */}
              <span className="absolute inset-0 rounded-2xl ring-4 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-700"></span>
            </Link>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              label: "Total Reports",
              value: stats.total || 0,
              color: "from-cyan-400 to-purple-400",
            },
            {
              label: "Pending",
              value: stats.pending || 0,
              color: "from-yellow-400 to-orange-400",
              pulse: true,
            },
            {
              label: "In Progress",
              value: stats.inProgress || 0,
              color: "from-blue-400 to-cyan-400",
            },
            {
              label: "Resolved",
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
              My Recent Reports
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
                        {issue.status.charAt(0).toUpperCase() +
                          issue.status.slice(1)}
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
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <div className="my-20 text-center">
          {/* Section Title */}
          <h2 className="text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            Quick Actions
          </h2>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
            {/* Primary Action: Report New Issue */}
            <Link
              to="/reportIssue"
              onClick={(e) => {
                if (!isPremium && stats.total >= 3) {
                  e.preventDefault();
                  toast.error("Report limit reached! Upgrade to Premium.");
                }
              }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-3xl px-12 py-8 text-2xl font-bold text-white shadow-2xl transition-all duration-700 hover:shadow-purple-500/60 hover:scale-110"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 group-hover:from-purple-700 group-hover:via-pink-700 group-hover:to-cyan-700 transition-all duration-700"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-full"></div>

              {/* Glowing Border Ring */}
              <div className="absolute inset-0 rounded-3xl ring-4 ring-purple-500/0 group-hover:ring-purple-500/60 transition-all duration-700"></div>

              {/* Content */}
              <span className="relative z-10 flex items-center gap-5 drop-shadow-lg">
                <span className="text-4xl">📢</span>
                Report a New Issue
                <span className="text-3xl ml-2 group-hover:translate-x-3 transition-transform duration-500">
                  →
                </span>
              </span>
            </Link>

            {/* Secondary Action: View All Reports */}
            <Link
              to="/citizen/issues"
              className="group relative inline-flex items-center justify-center rounded-3xl px-12 py-8 text-2xl font-bold text-white backdrop-blur-xl bg-white/10 border-2 border-white/20 shadow-2xl transition-all duration-700 hover:bg-white/20 hover:border-white/40 hover:scale-110"
            >
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl group-hover:blur-2xl transition-all duration-700"></div>

              {/* Content */}
              <span className="relative z-10 flex items-center gap-5">
                <span className="text-4xl">📋</span>
                View All My Reports
                <span className="text-3xl ml-2 group-hover:translate-x-3 transition-transform duration-500">
                  →
                </span>
              </span>
            </Link>
          </div>

          {/* Optional: Premium Hint Below (only if free user near/at limit) */}
          {!isPremium && stats.total >= 2 && (
            <p className="mt-12 text-lg text-gray-300 animate-pulse">
              {stats.total === 3
                ? "🚨 You've reached your free report limit!"
                : `⚡ ${3 - stats.total} free report${
                    3 - stats.total === 1 ? "" : "s"
                  } remaining`}
            </p>
          )}
        </div>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes gradient-move {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            animation: gradient-move 6s ease infinite;
          }
        `}</style>
        {/* Premium CTA */}
        {!isPremium && (
          <div className="my-20 p-12 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-indigo-900/40 backdrop-blur-2xl rounded-3xl border border-purple-500/50 text-center relative overflow-hidden shadow-2xl">
            {/* Animated Floating Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-0s"></div>
            <div className="absolute top-20 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4s"></div>
            <div className="absolute -bottom-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2s"></div>

            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-border animate-pulse-glow pointer-events-none"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>

            {/* Header */}
            <h3 className="text-5xl md:text-6xl font-extrabold mb-8 relative z-10 bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Go Premium – Unlock Ultimate Power!
            </h3>

            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
              Elevate your impact. Report without limits and get your issues
              resolved faster.
            </p>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12 relative z-10">
              {[
                {
                  label: "Unlimited Reports",
                  icon: "∞",
                  color: "from-cyan-400 to-blue-400",
                },
                {
                  label: "Priority Support",
                  icon: "⚡",
                  color: "from-purple-400 to-indigo-400",
                },
                {
                  label: "50% Lower Boost Costs",
                  icon: "🚀",
                  color: "from-pink-400 to-rose-400",
                },
                {
                  label: "Exclusive Premium Badge",
                  icon: "👑",
                  color: "from-yellow-400 to-amber-400",
                },
              ].map((feat, i) => (
                <div
                  key={feat.label}
                  className="group relative bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-110 hover:-translate-y-4 shadow-xl hover:shadow-2xl"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Glow on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <span
                      className={`text-5xl mb-4 bg-gradient-to-r ${feat.color} bg-clip-text text-transparent`}
                    >
                      {feat.icon}
                    </span>
                    <span className="text-lg font-bold text-white">
                      {feat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-Action Button with Shimmer */}
            <Link
              to="/citizen/premium"
              className="relative inline-block px-10 py-5 text-xl font-bold text-white rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 group-hover:from-purple-700 group-hover:via-pink-700 group-hover:to-cyan-700 transition-all duration-500"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

              <span className="relative z-10 flex items-center gap-3">
                Upgrade to Premium Now
                <span className="text-2xl">→</span>
              </span>
            </Link>

            {/* Custom Animations */}
            <style jsx>{`
              @keyframes blob {
                0%,
                100% {
                  transform: translate(0px, 0px) scale(1);
                }
                25% {
                  transform: translate(50px, -50px) scale(1.15);
                }
                50% {
                  transform: translate(-40px, 60px) scale(0.95);
                }
                75% {
                  transform: translate(30px, 40px) scale(1.1);
                }
              }
              .animate-blob {
                animation: blob 25s infinite ease-in-out;
              }
              .animation-delay-2s {
                animation-delay: 2s;
              }
              .animation-delay-4s {
                animation-delay: 4s;
              }

              @keyframes gradient-move {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
              .animate-gradient {
                animation: gradient-move 8s ease infinite;
              }

              @keyframes pulse-glow {
                0%,
                100% {
                  opacity: 0.4;
                }
                50% {
                  opacity: 0.8;
                }
              }

              @keyframes float {
                0% {
                  transform: translateY(100vh) rotate(0deg);
                }
                100% {
                  transform: translateY(-100px) rotate(360deg);
                }
              }
              .animate-float {
                animation: float linear infinite;
              }
            `}</style>
          </div>
        )}

        {/* Motivation */}
        <div className="relative my-20 py-16 px-8 overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-0s"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-5s"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/20 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-3s"></div>
          </div>

          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Main Quote */}
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <p className="text-4xl md:text-6xl lg:text-7xl font-extrabold italic leading-tight">
              <span className="block bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]">
                "One Report =
              </span>
              <span className="block mt-4 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-reverse bg-[length:300%_300%]">
                One Step Toward a Better City"
              </span>
            </p>

            {/* Subtitle */}
            <p className="mt-10 text-2xl md:text-3xl font-light text-gray-200 tracking-wider">
              —{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                Your voice matters
              </span>
            </p>

            {/* Decorative Line */}
            <div className="mt-12 flex justify-center items-center gap-8 opacity-60">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <span className="text-4xl">✨</span>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>

          {/* Custom Styles */}
          <style jsx>{`
            @keyframes blob {
              0%,
              100% {
                transform: translate(0, 0) scale(1);
              }
              33% {
                transform: translate(40px, -60px) scale(1.1);
              }
              66% {
                transform: translate(-30px, 50px) scale(0.9);
              }
            }
            .animate-blob {
              animation: blob 25s infinite ease-in-out;
            }
            .animation-delay-3s {
              animation-delay: 3s;
            }
            .animation-delay-5s {
              animation-delay: 5s;
            }

            @keyframes gradient-move {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient {
              animation: gradient-move 12s ease infinite;
            }
            .animate-gradient-reverse {
              animation: gradient-move 12s ease infinite reverse;
            }

            @keyframes twinkle {
              0%,
              100% {
                opacity: 0;
                transform: scale(0);
              }
              50% {
                opacity: 0.8;
                transform: scale(1);
              }
            }
            .animate-twinkle {
              animation: twinkle linear infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;
