import { useState, useEffect, useRef } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Info,
  Loader2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // --- Logic Remains Exactly Same ---
  useEffect(() => {
    let cancelled = false;
    axiosSecure
      .get("/api/profile")
      .then((res) => {
        if (!cancelled) setProfile(res.data || {});
      })
      .catch((err) => {
        console.error(err);
        setMessage({ type: "error", text: "Failed to load profile." });
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!profile.name || profile.name.trim().length < 2) {
      err.name = "Name must be at least 2 characters.";
    }
    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) {
      err.email = "Enter a valid email address.";
    }
    if (
      profile.age &&
      (Number(profile.age) <= 0 || Number(profile.age) > 120)
    ) {
      err.age = "Enter a valid age.";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage(null);
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Please use an image smaller than 5MB.",
      });
      return;
    }
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const preset =
      process.env.REACT_APP_CLOUDINARY_PRESET || "YOUR_CLOUDINARY_PRESET";
    const cloudName =
      process.env.REACT_APP_CLOUDINARY_NAME || "YOUR_CLOUDINARY_NAME";
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data?.secure_url) {
        setProfile((prev) => ({ ...prev, avatarUrl: data.secure_url }));
        setMessage({ type: "success", text: "Image uploaded successfully." });
      } else {
        setMessage({ type: "error", text: "Image upload failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Image upload failed." });
    } finally {
      setImageUploading(false);
    }
  };

  const handleClearAvatar = () => {
    setProfile((prev) => ({ ...prev, avatarUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage({ type: "info", text: "Avatar removed." });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) {
      setMessage({ type: "error", text: "Please fix validation errors." });
      return;
    }
    setUpdating(true);
    const payload = { ...profile };
    delete payload._id;

    axiosSecure
      .put("/api/profile", payload)
      .then((res) => {
        setProfile(res.data?.user || payload);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      })
      .catch(() => setMessage({ type: "error", text: "Update failed!" }))
      .finally(() => setUpdating(false));
  };

  const handleCancel = () => {
    setLoading(true);
    axiosSecure
      .get("/api/profile")
      .then((res) => setProfile(res.data || {}))
      .finally(() => setLoading(false));
  };

  // --- Render Sections ---

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 space-y-8 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-3xl w-full" />
        <div className="flex gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-2xl" />
          <div className="flex-1 space-y-4 py-2">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Toast Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 shadow-sm border ${
                message.type === "error"
                  ? "bg-red-50 border-red-100 text-red-600"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle2 size={20} />
              )}
              <span className="font-medium text-sm">{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-auto">
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-[0.03]" />

            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-slate-50 border-4 border-white shadow-xl">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-500 font-bold text-4xl bg-blue-50">
                      {(profile.name || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  {imageUploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="animate-spin text-blue-600" />
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-2 -right-2 flex gap-2">
                  <label className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg cursor-pointer hover:bg-blue-700 transition-all hover:scale-110 active:scale-95">
                    <Camera size={18} />
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={imageUploading || updating}
                    />
                  </label>
                  {profile.avatarUrl && (
                    <button
                      type="button"
                      onClick={handleClearAvatar}
                      className="p-2.5 bg-white text-gray-400 rounded-xl shadow-lg border border-gray-100 hover:text-red-500 transition-all hover:scale-110"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name || "Set Your Name"}
                </h1>
                <p className="text-slate-400 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Briefcase size={16} />{" "}
                  {profile.profession || "No profession set"}
                </p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-3">
              <User className="text-blue-600" size={20} /> Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <InputField
                label="Full Name"
                name="name"
                icon={<User size={18} />}
                value={profile.name}
                onChange={handleChange}
                error={errors.name}
                required
                updating={updating}
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                icon={<Mail size={18} />}
                value={profile.email}
                onChange={handleChange}
                error={errors.email}
                updating={updating}
              />
              <InputField
                label="Phone Number"
                name="phone"
                icon={<Phone size={18} />}
                value={profile.phone}
                onChange={handleChange}
                updating={updating}
              />
              <InputField
                label="Living Address"
                name="address"
                icon={<MapPin size={18} />}
                value={profile.address}
                onChange={handleChange}
                updating={updating}
              />
              <InputField
                label="Profession"
                name="profession"
                icon={<Briefcase size={18} />}
                value={profile.profession}
                onChange={handleChange}
                updating={updating}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  value={profile.age}
                  onChange={handleChange}
                  error={errors.age}
                  updating={updating}
                />
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profile.gender || ""}
                    onChange={handleChange}
                    disabled={updating}
                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all appearance-none text-slate-700 font-medium"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Info size={16} /> Bio Description
              </label>
              <textarea
                name="bio"
                rows="4"
                value={profile.bio || ""}
                onChange={handleChange}
                disabled={updating}
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={imageUploading || updating}
              className="flex-1 bg-slate-900 text-white py-4 px-8 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
            >
              {updating ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {updating ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={updating || imageUploading}
              className="px-10 py-4 bg-white text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Helper Input Component
const InputField = ({
  label,
  name,
  icon,
  value,
  onChange,
  error,
  type = "text",
  required,
  updating,
}) => (
  <div className="space-y-2">
    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={updating}
        className={`w-full ${
          icon ? "pl-12" : "px-5"
        } pr-5 py-3.5 bg-slate-50/50 border ${
          error ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
        } rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300`}
      />
    </div>
    {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
  </div>
);

export default Profile;
