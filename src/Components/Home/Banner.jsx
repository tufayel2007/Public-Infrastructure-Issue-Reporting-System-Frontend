import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      {/* Custom Animations */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 25s infinite;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-3000 { animation-delay: 3s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            opacity: 0;
            animation: fadeInUp 1.2s ease-out forwards;
          }

          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
            50% { box-shadow: 0 0 50px rgba(34, 211, 238, 0.8); }
          }
        `}
      </style>

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-8 md:px-12 text-center">
        {/* Responsive Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute top-10 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob animation-delay-3000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main Heading - Highly Responsive */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight animate-fadeInUp">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              NagorSeba
            </span>
            <br />
            <span
              className="text-white block mt-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fadeInUp"
              style={{ animationDelay: "0.5s" }}
            >
              <em>"Your City, Your Voice"</em>
            </span>
          </h1>

          {/* Subheading - Responsive Text */}
          <p
            className="mt-8 sm:mt-10 md:mt-12 text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-200 font-light max-w-4xl mx-auto leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.8s" }}
          >
            Report broken roads, faulty streetlights, garbage piles, water
            logging —{" "}
            <span className="text-cyan-300 font-extrabold text-2xl xs:text-3xl sm:text-4xl">
              in just 30 seconds
            </span>
            .
            <br className="block sm:hidden" />
            Together, let's make{" "}
            <strong className="text-purple-300">Sylhet</strong> cleaner, safer,
            and smarter.
          </p>

          {/* CTA Buttons - Stack on Mobile */}
          <div
            className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center animate-fadeInUp"
            style={{ animationDelay: "1.2s" }}
          >
            <Link
              to="/reportIssue"
              className="group relative inline-flex items-center gap-4 px-10 py-5 sm:px-12 sm:py-6 md:px-14 md:py-7 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg sm:text-xl md:text-2xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 overflow-hidden animate-pulseGlow"
            >
              <span className="relative z-10">Report a New Issue</span>
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10 group-hover:translate-x-3 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </Link>

            <Link
              to="/allIssues"
              className="px-10 py-5 sm:px-12 sm:py-6 md:px-14 md:py-7 border-2 sm:border-4 border-cyan-300 text-cyan-300 font-bold text-lg sm:text-xl md:text-2xl rounded-full hover:bg-cyan-400/20 hover:text-white hover:border-cyan-200 transition-all duration-500 backdrop-blur-md bg-white/10 shadow-2xl"
            >
              View All Reports
            </Link>
          </div>

          {/* Trust Stats - Responsive Grid */}
          <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 max-w-5xl mx-auto">
            <div
              className="text-center animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-cyan-300 drop-shadow-xl">
                2,847+
              </div>
              <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl">
                Issues Reported
              </p>
            </div>
            <div
              className="text-center animate-fadeInUp"
              style={{ animationDelay: "1.7s" }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-emerald-300 drop-shadow-xl">
                1,292+
              </div>
              <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl">
                Issues Resolved
              </p>
            </div>
            <div
              className="text-center animate-fadeInUp"
              style={{ animationDelay: "1.9s" }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-pink-300 drop-shadow-xl">
                15,00+
              </div>
              <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl">
                Active Citizens
              </p>
            </div>
          </div>

          {/* Final Tagline - Responsive */}
          <p
            className="mt-16 sm:mt-20 md:mt-28 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-300 to-pink-300 italic drop-shadow-2xl animate-fadeInUp"
            style={{ animationDelay: "2.2s" }}
          >
            One Report = One Step Toward a Better City
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
