import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const FREE_LIMIT = 3;

const CitizenReportIssue = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("pothole");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch citizen stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["citizen-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/citizen/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!user?.email,
  });

  const totalReports = stats?.total || stats?.totalIssues || 0;
  const isPremium = user?.subscription === "premium";
  const canReport = isPremium || totalReports < FREE_LIMIT;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.blocked) {
      toast.error("Your account is blocked.");
      return;
    }

    if (!isPremium && totalReports >= FREE_LIMIT) {
      Swal.fire({
        icon: "warning",
        title: "Free Report Limit Reached",
        text: "Free users can only submit 3 reports. Upgrade to Premium for unlimited reporting.",
        confirmButtonText: "Go Premium",
        confirmButtonColor: "#a855f7",
      }).then(() => navigate("/citizen/premium"));
      return;
    }

    if (!title || !description || !location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to continue.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Issue reported successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setLocation("");
        setCategory("pothole");
        setImage(null);
        setPreview("");
        navigate("/citizen/issues");
      } else {
        toast.error(data.message || "Failed to report issue.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <span className="loading loading-spinner loading-lg text-cyan-400"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Report a New Issue
          </h1>
          <p className="mt-6 text-xl text-gray-300 font-light">
            Help make your city better — one report at a time
          </p>
        </div>

        {/* Blocked Account Alert */}
        {user?.blocked && (
          <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
            <svg
              className="w-8 h-8 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
            <div>
              <strong>Your account has been blocked.</strong>
              <p>You cannot submit new reports. Please contact support.</p>
            </div>
          </div>
        )}

        {/* Report Form Card */}
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Preview */}
            {preview && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-cyan-500/30">
                <img
                  src={preview}
                  alt="Issue preview"
                  className="w-full h-96 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                  }}
                  className="absolute top-4 right-4 btn btn-circle btn-error btn-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Title */}
            <input
              type="text"
              placeholder="Issue Title"
              className="input input-lg input-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <textarea
              placeholder="Describe the issue in detail..."
              className="textarea textarea-lg textarea-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Category */}
            <select
              className="select select-lg select-bordered w-full bg-white/5 border-white/20 text-white focus:border-cyan-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="pothole">Pothole</option>
              <option value="streetlight">Street Light Out</option>
              <option value="garbage">Garbage Accumulation</option>
              <option value="water-leakage">Water Leakage</option>
              <option value="drainage">Drainage Blockage</option>
              <option value="footpath">Damaged Footpath</option>
            </select>

            {/* Location */}
            <input
              type="text"
              placeholder="Location (e.g., Road name, area, landmark)"
              className="input input-lg input-bordered w-full bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-lg file-input-bordered w-full bg-white/5 border-white/20"
              onChange={handleImage}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !canReport || user?.blocked}
              className="btn btn-lg w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Submitting...</>
              ) : user?.blocked ? (
                "Account Blocked"
              ) : !canReport ? (
                "Free Limit Reached – Go Premium"
              ) : (
                "Submit Report"
              )}
            </button>

            {/* Report Counter */}
            {!isPremium && (
              <div className="text-center text-gray-300">
                You have used <strong>{totalReports}</strong> out of{" "}
                <strong>{FREE_LIMIT}</strong> free reports
              </div>
            )}
          </form>
        </div>

        {/* Premium Upsell Card - Shown only when limit reached */}
        {!isPremium && totalReports >= FREE_LIMIT && (
          <div className="max-w-2xl mx-auto p-10 bg-gradient-to-br from-purple-800/60 via-pink-800/50 to-cyan-800/60 backdrop-blur-xl rounded-3xl border border-purple-500/50 shadow-2xl text-center relative overflow-hidden">
            {/* Animated Blobs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-screen blur-3xl opacity-30 animate-blob animation-delay-4s"></div>

            <span className="inline-block bg-black/70 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              PREMIUM REQUIRED
            </span>

            <h2 className="text-4xl font-extrabold text-white mb-4">
              Unlock Unlimited Reports
            </h2>

            <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto">
              You've reached the free limit of 3 reports. Upgrade to Premium to
              continue making your city better.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">∞</span>
                <span className="text-white font-medium">
                  Unlimited Reports
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-white font-medium">
                  Priority Processing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <span className="text-white font-medium">
                  Faster Resolution
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👑</span>
                <span className="text-white font-medium">Premium Badge</span>
              </div>
            </div>

            <Link
              to="/citizen/premium"
              className="relative inline-block px-10 py-5 text-xl font-bold text-white rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Upgrade to Premium Now</span>
            </Link>
          </div>
        )}
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CitizenReportIssue;
