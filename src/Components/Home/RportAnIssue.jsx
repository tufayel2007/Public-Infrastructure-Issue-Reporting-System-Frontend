/* eslint-disable no-unused-vars */
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
  const [preview, setPreview] = useState(""); // লোকাল প্রিভিউ
  const [imageUrl, setImageUrl] = useState(""); // Cloudinary থেকে পাওয়া URL
  const [uploading, setUploading] = useState(false); // ইমেজ আপলোড লোডিং
  const [loading, setLoading] = useState(false); // ফর্ম সাবমিট লোডিং

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

  // ইমেজ সিলেক্ট + Cloudinary-তে আপলোড
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // লোকাল প্রিভিউ দেখানো
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    // চাইলে ফোল্ডার সেট করতে পারো
    // formData.append("folder", "issuehub/issues");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("ইমেজ সফলভাবে আপলোড হয়েছে!");
      } else {
        toast.error("ইমেজ আপলোড ফেল! আবার চেষ্টা করো।");
        setPreview("");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("ইমেজ আপলোডে সমস্যা হয়েছে।");
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.blocked) {
      toast.error("Your account has been blocked.");
      return;
    }

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

      const payload = {
        title,
        description,
        category,
        location,
        imageUrl:
          imageUrl ||
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/placeholder-issue.jpg", // একটা default Cloudinary placeholder দাও
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Issue reported successfully!");

        setTitle("");
        setDescription("");
        setLocation("");
        setPreview("");
        setImageUrl("");
      } else {
        toast.error(data.message || "Failed to report the issue");
      }
    } catch (error) {
      console.error(error);
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
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Report a New Issue
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Make your city better — one report at a time
          </p>
        </div>

        {user?.blocked && (
          <div className="alert alert-error shadow-lg mb-8">
            Your account has been blocked. You cannot submit reports.
          </div>
        )}

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* প্রিভিউ */}
            {preview && (
              <div className="relative">
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <span className="loading loading-spinner loading-md text-white"></span>
                  </div>
                )}
              </div>
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
              disabled={uploading}
            />

            <button
              type="submit"
              disabled={loading || uploading || !canReport || user?.blocked}
              className="btn btn-primary btn-lg w-full"
            >
              {loading
                ? "Submitting..."
                : uploading
                ? "Uploading Image..."
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

      {!isPremium && totalReports >= FREE_LIMIT && (
        <div className="max-w-md mx-auto mt-12 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl shadow-2xl p-6 text-center text-black">
          <div className="mb-3">
            <span className="inline-block bg-black/80 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
              PREMIUM REQUIRED
            </span>
          </div>

          <h2 className="text-2xl font-extrabold">Free Report Limit Reached</h2>

          <p className="mt-3 text-sm opacity-90">
            Free users can submit up to <strong>3 reports</strong>. Upgrade to
            Premium to continue reporting issues without limits.
          </p>

          <ul className="mt-4 text-sm text-left space-y-1">
            <li>✅ Unlimited issue reporting</li>
            <li>✅ Default high-priority issues</li>
            <li>✅ Faster resolution workflow</li>
            <li>✅ Premium user badge</li>
          </ul>

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
