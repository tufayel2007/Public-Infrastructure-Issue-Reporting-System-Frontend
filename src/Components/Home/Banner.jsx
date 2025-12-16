import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      {/* Custom CSS for Blob Animation */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 20s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 px-6 md:px-12 text-center">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NagorSeba
            </span>
            <br />
            <span className="text-white block mt-3 text-4xl md:text-5xl lg:text-6xl">
              Your City. Your Voice.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-lg md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
            Report broken roads, faulty streetlights, garbage piles, water
            logging —{" "}
            <span className="text-cyan-300 font-bold">in just 30 seconds</span>.
            Together, let's make Sylhetcleaner, safer, and smarter.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/citizen/report"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-cyan-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Report a New Issue</span>
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
            </Link>

            <Link
              to="/allIssues"
              className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold text-xl rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 backdrop-blur-md bg-white/5"
            >
              View All Reports
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-cyan-400">247+</div>
              <p className="text-gray-400 mt-3 text-lg">Issues Reported</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-emerald-400">
                89+
              </div>
              <p className="text-gray-400 mt-3 text-lg">Issues Resolved</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-pink-400">
                1,200+
              </div>
              <p className="text-gray-400 mt-3 text-lg">Active Citizens</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-16 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 italic">
            One Report = One Step Toward a Better City
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
