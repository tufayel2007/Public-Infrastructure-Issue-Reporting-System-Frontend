const Testimonials = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-0s"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-3s"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-16 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
          What Citizens Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              quote: "Finally, someone is listening!",
              author: "A Happy Citizen",
              color: "from-cyan-400 to-purple-400",
            },
            {
              quote: "My streetlight was fixed in 3 days!",
              author: "A Grateful Resident",
              color: "from-yellow-400 to-orange-400",
            },
            {
              quote: "Best civic app in Dhaka!",
              author: "Local Advocate",
              color: "from-pink-400 to-red-400",
            },
          ].map((t, i) => (
            <div
              key={i}
              className={`relative bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden`}
            >
              {/* Gradient Accent Circle */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${
                  t.color
                } opacity-30 blur-3xl animate-blob animation-delay-${i * 2}s`}
              ></div>

              <p className="text-gray-200 italic text-lg md:text-xl z-10 relative">
                "{t.quote}"
              </p>
              <p className="mt-6 text-cyan-300 font-bold z-10 relative">
                - {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-0s {
          animation-delay: 0s;
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
          background-size: 200% 200%;
          animation: gradient-move 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
