import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const CitizenHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake stats fetch (তোমার API থাকলে এখানে লাগাবে)
    setTimeout(() => {
      setStats({
        total: 24,
        pending: 8,
        inProgress: 10,
        resolved: 6,
      });
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Hero */}
        <div className="text-center mb-16 mt-10">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl animate-fadeIn">
            Welcome back, {user?.name || "Citizen"}!
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light">
            Together we're making Dhaka cleaner, safer & smarter
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards - Glassmorphism + Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-48 rounded-3xl"></div>
            ))
          ) : (
            <>
              <div className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-xl group-hover:blur-2xl transition"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">Total Issues</div>
                  <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stats?.total || 0}
                  </p>
                  <p className="text-gray-400 mt-2">You've reported</p>
                </div>
              </div>

              <div className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-600/30 to-orange-600/30 blur-xl group-hover:blur-2xl transition"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">Pending</div>
                  <p className="text-5xl font-bold text-yellow-300 animate-pulse">
                    {stats?.pending || 0}
                  </p>
                  <p className="text-gray-400 mt-2">Waiting for action</p>
                </div>
              </div>

              <div className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-xl group-hover:blur-2xl transition"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">In Progress</div>
                  <p className="text-5xl font-bold text-cyan-300">
                    {stats?.inProgress || 0}
                  </p>
                  <p className="text-gray-400 mt-2">Being fixed</p>
                </div>
              </div>

              <div className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:scale-105 hover:bg-white/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 blur-xl group-hover:blur-2xl transition"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">Resolved</div>
                  <p className="text-5xl font-bold text-emerald-400">
                    {stats?.resolved || 0}
                  </p>
                  <p className="text-gray-400 mt-2">Successfully fixed!</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/citizen/report"
              className="btn btn-lg btn-primary shadow-2xl hover:scale-110 hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-3 text-xl"
            >
              Report New Issue
            </Link>
            <Link
              to="/citizen/issues"
              className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 text-xl"
            >
              View My Issues
            </Link>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center py-12 px-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10">
          <p className="text-3xl md:text-4xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
            "একটি অভিযোগ = একটি উন্নত শহর"
          </p>
          <p className="mt-6 text-xl text-gray-300">— Your voice matters</p>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;
