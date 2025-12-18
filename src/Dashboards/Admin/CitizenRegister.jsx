/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate যোগ করলাম রিডাইরেক্টের জন্য
import toast from "react-hot-toast";

const CitizenRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(""); // Cloudinary URL সেভ করবো
  const [preview, setPreview] = useState(""); // লোকাল প্রিভিউ
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ছবি সিলেক্ট করলেই Cloudinary-তে আপলোড
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // লোকাল প্রিভিউ দেখানো
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setPhotoUrl(""); // পুরানো URL রিসেট

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // .env-এ রাখো

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
        setPhotoUrl(data.secure_url);
        toast.success("প্রোফাইল ছবি সফলভাবে আপলোড হয়েছে! ✓");
      } else {
        throw new Error(data.error?.message || "আপলোড ফেইল");
      }
    } catch (err) {
      console.error(err);
      toast.error("ছবি আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setPreview("");
      setPhotoUrl("");
      e.target.value = ""; // ইনপুট ক্লিয়ার
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("নাম, ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    if (!photoUrl) {
      toast.error("প্রোফাইল ছবি আপলোড করুন।");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/register/citizen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            photoUrl, // Cloudinary secure URL পাঠাচ্ছি
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! 🎉");
        // অটো লগইন বা লগইন পেজে রিডাইরেক্ট
        navigate("/adminLogin"); // তোমার লগইন পেজের রুট দাও
      } else {
        toast.error(data.message || "রেজিস্ট্রেশন ফেইল হয়েছে।");
      }
    } catch (err) {
      toast.error("সার্ভারে সমস্যা। পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-extrabold text-center text-white mb-4 tracking-tight">
            Citizen Registration
          </h2>
          <p className="text-center text-gray-300 mb-10 text-lg">
            Join the community – report & boost issues!
          </p>

          <form onSubmit={handleRegister} className="space-y-7">
            {/* Name */}
            <input
              type="text"
              placeholder="Enter your Name"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg py-6 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your Email"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg py-6 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Create Password"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg py-6 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Photo Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full bg-white/10 border-white/20 text-white hover:border-purple-500 transition-all duration-300"
                onChange={handlePhoto}
                disabled={uploading}
                required
              />
              <p className="text-gray-400 text-sm mt-2 text-center">
                Upload your profile photo (will be uploaded to Cloudinary)
              </p>
            </div>

            {/* Preview + Upload Status */}
            {preview && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-purple-500/30">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center">
                      <span className="loading loading-spinner loading-lg text-purple-400"></span>
                      <p className="text-white mt-4">আপলোড হচ্ছে...</p>
                    </div>
                  </div>
                )}
                {!uploading && photoUrl && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ✓ আপলোড সম্পন্ন
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || uploading || !photoUrl}
              className="btn btn-primary w-full text-xl font-bold py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50 border-0 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account ✨"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login">
              <button className="btn btn-outline btn-secondary w-full text-lg">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenRegister;
