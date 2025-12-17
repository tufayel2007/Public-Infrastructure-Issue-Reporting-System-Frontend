import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactSupportTem = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [problemDetails, setProblemDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !problemDetails || !duration) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("আপনার সমস্যা সফলভাবে সাপোর্ট টিমের কাছে পাঠানো হয়েছে!");

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setLocation("");
        setDuration("");
        setProblemDetails("");
      }, 5000);
    }, 2000);
  };

  return (
    <>
      {/* Custom Animation CSS */}
      <style>
        {`
          @keyframes roadClean {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          @keyframes carMove {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(120vw); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-road { animation: roadClean 4s ease-in-out forwards; }
          .animate-car { animation: carMove 4s ease-in-out forwards; }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              Premium Support Center
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light">
              Dedicated help for our Premium Citizens ✨
            </p>
            <p className="mt-3 text-lg text-cyan-300">
              Your issue will be handled with top priority by our support team
            </p>
          </div>

          {/* Success Animation - Only show after submit */}
          {submitted && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="relative w-full max-w-2xl">
                {/* Clean Road Animation */}
                <div className="absolute inset-x-0 bottom-32 h-32 bg-gradient-to-t from-green-500 to-transparent opacity-60 animate-road"></div>

                {/* Car Animation */}
                <div className="absolute bottom-32 left-0 animate-car">
                  <div className="relative">
                    <img
                      src="/car-cleaning.png" // তুমি একটা কারের PNG দিতে পারো (অথবা এমোজি)
                      alt="Support Team"
                      className="w-32 h-32 drop-shadow-2xl"
                      onError={(e) => (e.target.src = "🚛")} // fallback emoji
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl text-lg font-bold animate-bounce">
                      On the way! 🎉
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
                  <div className="relative max-w-2xl w-full">
                    {/* Premium Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse"></div>

                    {/* Main Card */}
                    <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-10 md:p-14 text-center transform scale-100 animate-fadeIn">
                      {/* Success Icon with Premium Ring */}
                      <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur-xl animate-ping"></div>
                        <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                          <svg
                            className="w-20 h-20 md:w-24 md:h-24 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        {/* Premium Crown Badge */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-black rounded-full p-3 shadow-xl animate-bounce">
                          <span className="text-2xl">👑</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
                        Support Request Received!
                      </h2>

                      {/* Subtitle */}
                      <p className="text-xl md:text-2xl text-cyan-200 mb-8 font-light leading-relaxed">
                        Your issue has been escalated to our{" "}
                        <span className="font-bold text-yellow-300">
                          Premium Support Team
                        </span>
                      </p>

                      {/* Assurance Message */}
                      <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/20 mb-8">
                        <p className="text-lg md:text-xl text-gray-200">
                          A dedicated support specialist will reach out to you
                          within{" "}
                          <span className="text-2xl font-bold text-yellow-300">
                            24 hours
                          </span>
                        </p>
                        <p className="text-base text-gray-400 mt-4">
                          We prioritize Premium members for faster resolution
                        </p>
                      </div>

                      {/* Thank You Note */}
                      <p className="text-lg md:text-xl text-gray-300 italic">
                        Thank you for being a valued Premium Citizen of
                        NagorSeba 🌟
                      </p>

                      {/* Decorative Line */}
                      <div className="mt-10 flex items-center justify-center gap-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
                        <span className="text-cyan-300 text-sm uppercase tracking-wider font-medium">
                          Priority Service
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div
            className={`backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 transition-all duration-1000 ${
              submitted ? "opacity-30" : "opacity-100"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-lg font-medium text-cyan-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered input-lg w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading || submitted}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-lg font-medium text-cyan-300 mb-2">
                  Location of the Issue
                </label>
                <input
                  type="text"
                  placeholder="e.g., Road No. 5, Block A, Sylhet"
                  className="input input-bordered input-lg w-full bg-white/5 border-white/20 text-white placeholder-gray-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={loading || submitted}
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-lg font-medium text-cyan-300 mb-2">
                  How long has this been an issue?
                </label>
                <select
                  className="select select-bordered select-lg w-full bg-white/5 border-white/20 text-white"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  disabled={loading || submitted}
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="few-days">A few days</option>
                  <option value="1-week">About 1 week</option>
                  <option value="2-weeks">About 2 weeks</option>
                  <option value="1-month">About 1 month</option>
                  <option value="more-than-month">More than a month</option>
                </select>
              </div>

              {/* Problem Details */}
              <div>
                <label className="block text-lg font-medium text-cyan-300 mb-2">
                  Describe Your Problem in Detail
                </label>
                <textarea
                  placeholder="Please explain the issue clearly so we can help faster..."
                  className="textarea textarea-bordered textarea-lg w-full h-40 bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                  value={problemDetails}
                  onChange={(e) => setProblemDetails(e.target.value)}
                  required
                  disabled={loading || submitted}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="btn btn-lg w-full md:w-auto px-16 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-500 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending to Support Team...
                    </>
                  ) : submitted ? (
                    "Sent Successfully! 🎉"
                  ) : (
                    "Submit to Premium Support"
                  )}
                </button>
              </div>

              {/* Premium Badge */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-3 bg-black/50 backdrop-blur px-6 py-3 rounded-full border border-yellow-400/50">
                  <span className="text-3xl">⭐</span>
                  <span className="text-yellow-400 font-bold text-lg">
                    Exclusive Premium Support
                  </span>
                  <span className="text-3xl">⭐</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSupportTem;
