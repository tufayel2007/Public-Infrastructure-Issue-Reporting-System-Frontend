import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const CitizenReportIssue = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("pothole");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current user's report count
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["citizen-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      // console.log("TOKEN CHECK =", token);

      const res = await fetch("http://localhost:5000/citizen/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch stats");

      return res.json();
    },

    enabled: !!user?.email,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Block check
    if (user?.blocked) {
      toast.error("আপনার অ্যাকাউন্ট ব্লক করা হয়েছে। রিপোর্ট করা যাবে না।");
      return;
    }

    // Free user limit check (3 reports)
    const token = localStorage.getItem("token");
    const isPremium = user?.subscription === "premium";
    const totalReports = stats?.total || 0;

    if (!isPremium && totalReports >= 100) {
      toast.error("আপনার ফ্রি রিপোর্ট লিমিট শেষ হয়েছে!");
      return;
    }

    if (!title || !description || !location) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("অনুগ্রহ করে লগইন করুন");
        setLoading(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("সমস্যা সফলভাবে রিপোর্ট করা হয়েছে!");
        // Reset form
        setTitle("");
        setDescription("");
        setLocation("");
        setImage(null);
        setPreview("");
      } else {
        toast.error(data.message || "রিপোর্ট করতে সমস্যা হয়েছে");
      }
    } catch (err) {
      toast.error("সার্ভারে সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const isPremium = user?.subscription === "premium";
  const totalReports = stats?.total || 0;
  const canReport = isPremium || totalReports < 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            নতুন সমস্যা রিপোর্ট করুন
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            আপনার শহরকে আরও ভালো করুন — একটি রিপোর্ট দিয়ে
          </p>
        </div>

        {/* Limit Warning */}
        {!isPremium && totalReports >= 3 && (
          <div className="alert alert-error shadow-lg mb-8 text-center">
            <div>
              <strong>আপনার ফ্রি রিপোর্ট লিমিট (৩টি) শেষ হয়ে গেছে!</strong>
              <p className="mt-2">
                আরও রিপোর্ট করতে প্রিমিয়াম সাবস্ক্রিপশন নিন।
              </p>
              <Link to="/premium" className="btn btn-accent btn-sm mt-4">
                প্রিমিয়াম নিন (১০০০ টাকা)
              </Link>
            </div>
          </div>
        )}

        {/* Blocked Warning */}
        {user?.blocked && (
          <div className="alert alert-error shadow-lg mb-8">
            আপনার অ্যাকাউন্ট ব্লক করা হয়েছে। রিপোর্ট করতে পারবেন না।
          </div>
        )}

        {/* Form Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {preview && (
              <div className="text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 w-full object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            <input
              type="text"
              placeholder="সমস্যার শিরোনাম"
              className="input input-bordered input-lg w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="বিস্তারিত বর্ণনা দিন..."
              className="textarea textarea-bordered textarea-lg w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              className="select select-bordered select-lg w-full bg-white/10 border-white/20 text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="pothole">গর্ত (Pothole)</option>
              <option value="streetlight">স্ট্রিট লাইট নষ্ট</option>
              <option value="garbage">ময়লার স্তূপ</option>
              <option value="water-leakage">পানি লিকেজ</option>
              <option value="drainage">ড্রেনেজ সমস্যা</option>
              <option value="footpath">ফুটপাথ ভাঙা</option>
            </select>

            <input
              type="text"
              placeholder="সঠিক লোকেশন (যেমন: মিরপুর ১০, গোল চত্বর)"
              className="input input-bordered input-lg w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-lg w-full bg-white/10 border-white/20"
              onChange={handleImage}
            />

            <button
              type="submit"
              disabled={loading || !canReport || user?.blocked}
              className="btn btn-primary btn-lg w-full shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>অপেক্ষা করুন...</>
              ) : user?.blocked ? (
                "ব্লক করা অ্যাকাউন্ট"
              ) : !canReport ? (
                "লিমিট শেষ - প্রিমিয়াম নিন"
              ) : (
                "রিপোর্ট জমা দিন"
              )}
            </button>
          </form>

          {/* Premium Info */}
          {!isPremium && totalReports > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                আপনি এখনো পর্যন্ত{" "}
                <strong className="text-cyan-300">{totalReports}</strong>টি
                রিপোর্ট করেছেন। আর মাত্র{" "}
                <strong className="text-yellow-300">
                  {200 - totalReports}
                </strong>
                টি ফ্রি রিপোর্ট বাকি।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenReportIssue;
