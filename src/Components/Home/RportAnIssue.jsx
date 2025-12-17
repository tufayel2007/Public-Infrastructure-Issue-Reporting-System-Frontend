import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const FREE_LIMIT = 3;

const RportAnIssue = () => {
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

    // Blocked user check
    if (user?.blocked) {
      toast.error("Your account has been blocked.");
      return;
    }

    // Free user limit check
    if (!isPremium && totalReports >= FREE_LIMIT) {
      Swal.fire({
        icon: "warning",
        title: "Free Limit Exceeded",
        text: "Free users can submit a maximum of 3 reports. Please upgrade to Premium.",
        confirmButtonText: "Go Premium",
      }).then(() => navigate("/premium"));
      return;
    }

    if (!title || !description || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to continue");
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Issue reported successfully!");
        setTitle("");
        setDescription("");
        setLocation("");
        setImage(null);
        setPreview("");
      } else {
        toast.error(data.message || "Failed to report the issue");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Report a New Issue
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Make your city better — one report at a time
          </p>
        </div>

        {/* Blocked Warning */}
        {user?.blocked && (
          <div className="alert alert-error shadow-lg mb-8">
            Your account has been blocked. You cannot submit reports.
          </div>
        )}

        {/* Form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-64 w-full object-cover rounded-xl shadow-lg"
              />
            )}

            <input
              type="text"
              placeholder="Issue Title"
              className="input input-bordered input-lg w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Provide detailed description..."
              className="textarea textarea-bordered textarea-lg w-full"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              className="select select-bordered select-lg w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="pothole">Pothole</option>
              <option value="streetlight">Street Light</option>
              <option value="garbage">Garbage</option>
              <option value="water-leakage">Water Leakage</option>
              <option value="drainage">Drainage</option>
              <option value="footpath">Footpath</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              className="input input-bordered input-lg w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-lg w-full"
              onChange={handleImage}
            />

            <button
              type="submit"
              disabled={loading || !canReport || user?.blocked}
              className="btn btn-primary btn-lg w-full"
            >
              {loading
                ? "Please wait..."
                : user?.blocked
                ? "Account Blocked"
                : !canReport
                ? "Limit Reached - Go Premium"
                : "Submit Report"}
            </button>
          </form>

          {!isPremium && (
            <div className="mt-6 text-center text-gray-300">
              You have used {totalReports} / {FREE_LIMIT} reports
            </div>
          )}
        </div>
      </div>

      {/* Free Limit Warning - Only show for non-premium users */}
      {!isPremium && (
        <div className="max-w-md mx-auto mt-12 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl shadow-2xl p-6 text-center text-black">
          {/* Badge */}
          <div className="mb-3">
            <span className="inline-block bg-black/80 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
              PREMIUM REQUIRED
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold">Free Report Limit Reached</h2>

          {/* Description */}
          <p className="mt-3 text-sm opacity-90">
            Free users can submit up to <strong>3 reports</strong>. Upgrade to
            Premium to continue reporting issues without limits.
          </p>

          {/* Features */}
          <ul className="mt-4 text-sm text-left space-y-1">
            <li>✅ Unlimited issue reporting</li>
            <li>✅ Default high-priority issues</li>
            <li>✅ Faster resolution workflow</li>
            <li>✅ Premium user badge</li>
          </ul>

          {/* CTA */}
          <Link
            to="/premium"
            className="btn btn-sm w-full mt-6 bg-black text-yellow-400 hover:bg-black/90 border-none"
          >
            Upgrade to Premium (৳1000)
          </Link>
        </div>
      )}
    </div>
  );
};

export default RportAnIssue;
