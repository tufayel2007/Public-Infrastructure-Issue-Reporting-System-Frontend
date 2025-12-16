import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CitizenProfile = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.avatarUrl || null);
  const [loading, setLoading] = useState(false);

  // Photo preview
  useEffect(() => {
    if (!photo) return;
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        login({
          ...user,
          name: data.user.name,
          avatarUrl: data.user.avatarUrl || user.avatarUrl,
        });
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-xl rounded-3xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
        />

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          className="file-input file-input-bordered w-full bg-white/20 text-white"
        />

        {preview && (
          <img
            src={
              preview.startsWith("http")
                ? preview
                : `${import.meta.env.VITE_API_URL}${preview}`
            }
            alt="preview"
            className="w-24 h-24 rounded-full mx-auto mt-2 border-2 border-yellow-400 object-cover"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-accent w-full mt-4"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default CitizenProfile;
