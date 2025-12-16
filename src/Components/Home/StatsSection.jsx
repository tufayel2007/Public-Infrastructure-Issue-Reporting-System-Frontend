import { useEffect, useState } from "react";

const StatsSection = () => {
  const stats = [
    { end: 2847, label: "Issues Reported", suffix: "+" },
    { end: 1292, label: "Issues Resolved", suffix: "+" },
    { end: 89, label: "Resolution Rate", suffix: "%" },
    { end: 15000, label: "Active Citizens", suffix: "+" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts(
        stats.map((stat, i) => {
          const progress = Math.min(currentStep / steps, 1);
          return Math.floor(stat.end * progress);
        })
      );

      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-900/60 via-slate-900/90 to-cyan-900/60 backdrop-blur-xl">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-screen blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/40 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-4s"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/30 rounded-full mix-blend-screen blur-3xl animate-blob animation-delay-2s"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
            Platform Impact
          </h2>
          <p className="mt-6 text-xl text-gray-300 font-light">
            Real results driven by our community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl hover:scale-110 hover:bg-white/10 transition-all duration-700"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <h3 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  {counts[i].toLocaleString()}
                  {stat.suffix}
                </h3>
                <p className="mt-4 text-lg text-gray-200 font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>

              {/* Subtle Pulse Animation */}
              <div className="absolute inset-0 rounded-3xl ring-4 ring-cyan-400/0 group-hover:ring-cyan-400/30 animate-pulse transition-all duration-1000"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.2);
          }
          66% {
            transform: translate(-40px, 40px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 30s infinite ease-in-out;
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
    </section>
  );
};

export default StatsSection;
