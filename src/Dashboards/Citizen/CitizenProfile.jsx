/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import saveAs from "file-saver";
import {
  Mail,
  User,
  AlertTriangle,
  MapPin,
  Link,
  Clock,
  ExternalLink,
  Trophy,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Palette,
  Download,
  Share2,
  Printer,
  QrCode,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  UserCheck,
  Shield,
  Sparkles,
} from "lucide-react";

// Safe Parse for localStorage
const safeParse = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

// Floating Input Component
const FloatingInput = ({
  label,
  type = "text",
  maxLength,
  showCount,
  disabled,
  ...props
}) => (
  <div className="relative z-0 w-full mb-6 group">
    {type === "textarea" ? (
      <textarea
        {...props}
        disabled={disabled}
        placeholder=" "
        rows={3}
        maxLength={maxLength}
        className={`block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-primary peer resize-none ${
          disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""
        }`}
      />
    ) : (
      <input
        {...props}
        type={type}
        disabled={disabled}
        placeholder=" "
        maxLength={maxLength}
        className={`block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-primary peer ${
          disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""
        }`}
      />
    )}
    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      {label}
    </label>
    {showCount && (
      <div className="absolute right-0 -bottom-5 text-xs text-gray-500">
        {props.value?.length || 0}/{maxLength}
      </div>
    )}
  </div>
);

// Main Component
const CitizenProfile = () => {
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [themeColor, setThemeColor] = useState(safeParse("themeColor", "blue"));
  const [showQR, setShowQR] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [autoSave, setAutoSave] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    photoURL: "",
    avatarURL: "",
    website: "",
    lastUpdated: null,
  });

  // Load user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // আপনার টোকেন যেখানে সেভ করা আছে
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.profile);
          setFormData({ ...data.profile });
          setPreviewCoverImage(data.profile.photoURL || "/default-cover.jpg");
        }
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const themeGradients = {
    blue: "from-blue-500 to-indigo-600",
    indigo: "from-indigo-500 to-purple-600",
    teal: "from-teal-500 to-cyan-600",
    emerald: "from-emerald-500 to-teal-600",
    rose: "from-rose-500 to-pink-600",
  };
  const currentGradient = themeGradients[themeColor] || themeGradients.blue;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewCoverImage(result);
        setFormData((prev) => ({ ...prev, photoURL: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    // সব ফিল্ড যোগ করুন
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });
    // যদি ফাইল থাকে

    const token = localStorage.getItem("token");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.profile);
      toast.success("Profile updated!");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const draft = safeParse("profileDraft", null);
    if (draft && window.confirm("Restore unsaved changes?")) {
      setFormData(draft);
      setPreviewCoverImage(draft.photoURL);
      toast.success("Draft restored");
      return;
    }
    setFormData({ ...user });
    setPreviewCoverImage(user?.photoURL);
    setIsEditing(false);
    localStorage.removeItem("profileDraft");
    toast("Changes cancelled");
  };

  const generateQR = async () => {
    try {
      const data = await QRCode.toDataURL(window.location.href);
      setQrCodeData(data);
      setShowQR(true);
    } catch {
      toast.error("Failed to generate QR code");
    }
  };

  const exportPDF = async () => {
    if (!profileRef.current) return;
    try {
      const canvas = await html2canvas(profileRef.current, { scale: 2 });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, width, height);
      pdf.save(`${user?.name || "Citizen"}_Profile.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Export failed");
    }
  };

  const downloadVCard = () => {
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${user?.name || ""}\nEMAIL:${
      user?.email || ""
    }\nURL:${formData.website || ""}\nEND:VCARD`;
    const blob = new Blob([vCard], { type: "text/vcard" });
    saveAs(blob, `${user?.name || "Citizen"}.vcf`);
    toast.success("vCard downloaded!");
  };

  const shareProfile = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${user?.name}'s Civic Profile`, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Profile link copied!");
    }
  };

  // Profile completion
  const fields = ["name", "email", "bio", "location", "phone"];
  const filled = fields.filter((f) => formData[f]?.trim());
  const completion = Math.round((filled.length / fields.length) * 100);

  const level = Math.floor(completion / 25) || 1;
  const badges = [];
  if (completion >= 50) badges.push("Active Reporter");
  if (completion >= 75) badges.push("Civic Contributor");
  if (completion === 100) badges.push("Civic Champion");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const DetailItem = ({ icon: Icon, title, value, href }) => {
    if (!value) return null;
    const content = href ? (
      <a
        href={href.startsWith("http") ? href : `https://${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline flex items-center gap-1"
      >
        {value} <ExternalLink size={14} />
      </a>
    ) : (
      value
    );

    return (
      <motion.div
        whileHover={{ x: 5 }}
        className="flex items-start gap-4 py-3 border-b border-base-200"
      >
        <Icon className="w-5 h-5 text-primary mt-1" />
        <div>
          <p className="text-sm text-base-content/60">{title}</p>
          <p className="font-medium">{content}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className={`min-h-screen bg-gradient-to-br ${currentGradient} p-4`}>
        <div
          ref={profileRef}
          className="max-w-4xl mx-auto bg-white/95 dark:bg-base-300/95 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Cover */}
          <div className="relative h-48 md:h-64">
            <img
              src={previewCoverImage || "/default-cover.jpg"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="cover"
                  className="absolute bottom-4 right-4 btn btn-circle btn-primary"
                >
                  <Camera size={20} />
                </label>
              </>
            )}
          </div>

          {/* Avatar */}
          <div className="relative -mt-16 flex justify-center px-6">
            <div className="relative">
              <img
                src={formData.avatarURL || "/default-avatar.jpg"}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-8 border-white shadow-xl object-cover"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition"
                  >
                    <Camera className="text-white" size={28} />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Header user data  */}
          <div className="text-center mt-4 px-6">
            <h1 className="text-3xl font-bold">{user?.name || "Citizen"}</h1>
            <p className="text-primary flex items-center justify-center gap-2 mt-2">
              <Mail size={18} /> {user?.email}
            </p>
            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              <span className="badge badge-primary">
                Level {level} Reporter
              </span>
              {badges.map((b) => (
                <span key={b} className="badge badge-outline badge-primary">
                  {b}
                </span>
              ))}
              {completion === 100 && (
                <span className="badge badge-success animate-pulse">
                  Profile Complete
                </span>
              )}
            </div>
          </div>

          {/* Progress and profile and update  */}
          <div className="px-6 mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Profile Completion</span>
              <span className="font-bold text-primary">{completion}%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={completion}
              max="100"
            ></progress>
          </div>

          {/* Content in profile date and update Issue  */}
          <div className="p-6 md:p-10">
            {!isEditing ? (
              <>
                <div className="space-y-2">
                  <DetailItem
                    icon={User}
                    title="Full Name"
                    value={user?.name}
                  />
                  <DetailItem
                    icon={AlertTriangle}
                    title="Bio"
                    value={formData.bio}
                  />
                  <DetailItem
                    icon={MapPin}
                    title="Location"
                    value={formData.location}
                  />
                  <DetailItem
                    icon={UserCheck}
                    title="Phone"
                    value={formData.phone}
                  />
                  <DetailItem
                    icon={Link}
                    title="Website"
                    value={formData.website}
                    href={formData.website}
                  />
                  <DetailItem
                    icon={Clock}
                    title="Last Updated"
                    value={
                      formData.lastUpdated
                        ? new Date(formData.lastUpdated).toLocaleDateString()
                        : "-"
                    }
                  />
                </div>

                {/* Social Links for facbook and instagram twitter Linkedin  */}
                {(formData.facebook ||
                  formData.instagram ||
                  formData.twitter ||
                  formData.linkedin) && (
                  <div className="flex justify-center gap-4 mt-8">
                    {formData.facebook && (
                      <a
                        href={formData.facebook}
                        target="_blank"
                        className="btn btn-circle btn-primary"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                    {formData.instagram && (
                      <a
                        href={formData.instagram}
                        target="_blank"
                        className="btn btn-circle btn-secondary"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {formData.twitter && (
                      <a
                        href={formData.twitter}
                        target="_blank"
                        className="btn btn-circle btn-info"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {formData.linkedin && (
                      <a
                        href={formData.linkedin}
                        target="_blank"
                        className="btn btn-circle btn-accent"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                )}

                {/* Actions for editing for profile and update issue  */}
                <div className="flex justify-center gap-4 mt-10">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary gap-2"
                  >
                    <Edit size={18} /> Edit Profile
                  </button>
                  <div className="dropdown dropdown-top">
                    <button tabIndex={0} className="btn btn-ghost btn-circle">
                      <Settings size={20} />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={() => setShowThemePicker(true)}>
                          <Palette size={16} /> Change Theme
                        </button>
                      </li>
                      <li>
                        <button onClick={generateQR}>
                          <QrCode size={16} /> Show QR Code
                        </button>
                      </li>
                      <li>
                        <button onClick={exportPDF}>
                          <Download size={16} /> Download PDF
                        </button>
                      </li>
                      <li>
                        <button onClick={downloadVCard}>
                          <User size={16} /> Download vCard
                        </button>
                      </li>
                      <li>
                        <button onClick={shareProfile}>
                          <Share2 size={16} /> Share Profile
                        </button>
                      </li>
                      <li>
                        <button onClick={() => window.print()}>
                          <Printer size={16} /> Print
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-6">
                <FloatingInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Full Name"
                />
                <FloatingInput
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                />
                <FloatingInput
                  name="bio"
                  type="textarea"
                  maxLength={300}
                  showCount
                  value={formData.bio}
                  onChange={handleChange}
                  label="Bio (Tell us about yourself)"
                />
                <FloatingInput
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  label="Location"
                />
                <FloatingInput
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  label="Phone Number"
                />
                <FloatingInput
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  label="Website (optional)"
                />

                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    label="Facebook URL"
                  />
                  <FloatingInput
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    label="Instagram URL"
                  />
                  <FloatingInput
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    label="Twitter URL"
                  />
                  {/* date inpute and update for linkedin */}
                  <FloatingInput
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    label="LinkedIn URL"
                  />
                </div>

                <div className="flex gap-4">
                  {/* button for all update and save and all data */}
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 gap-2"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost flex-1 gap-2"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
                {/* Draft and auto Saved issue data  */}
                {autoSave && (
                  <p className="text-success text-sm text-center">
                    Draft auto-saved!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Theme Picker Modal */}
        {/* animated  issue and update data  */}
        <AnimatePresence>
          {showThemePicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-base-100 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-center mb-6">
                  Choose Theme
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(themeGradients).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setThemeColor(key);
                        setShowThemePicker(false);
                      }}
                      className={`h-24 rounded-2xl bg-gradient-to-br ${
                        themeGradients[key]
                      } ${
                        themeColor === key
                          ? "ring-4 ring-primary ring-offset-4"
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setShowThemePicker(false)}
                  className="btn btn-ghost w-full mt-6"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR Modal  for proa and issue */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <h3 className="text-xl font-bold mb-4 text-center">
                  Scan to View Profile
                </h3>
                <img
                  src={qrCodeData}
                  alt="QR Code"
                  className="w-64 h-64 mx-auto rounded-xl shadow-lg"
                />
                <button
                  onClick={() => setShowQR(false)}
                  className="btn btn-primary w-full mt-6"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Celebration */}
        <AnimatePresence>
          {completion === 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white dark:bg-base-300 rounded-3xl p-10 text-center shadow-2xl max-w-md"
              >
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Civic Champion!</h2>
                <p className="mb-6">
                  You've completed your profile and are now a trusted voice in
                  the community.
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {badges.map((b) => (
                    <span key={b} className="badge badge-primary badge-lg">
                      {b}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary mt-8"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CitizenProfile;
