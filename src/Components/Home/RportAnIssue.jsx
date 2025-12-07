import { useState } from "react";
import toast from "react-hot-toast";

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("pothole");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !location)
      return toast.error("All fields required");

    try {
      setLoading(true);
      let body;
      let headers = { authorization: "Bearer demo-token" };

      if (image) {
        // Image present → FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("image", image);
        body = formData;
      } else {
        // No image → JSON
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          title,
          description,
          category,
          location,
          date: new Date(),
        });
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
        method: "POST",
        headers,
        body,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Issue reported!");
        setTitle("");
        setDescription("");
        setLocation("");
        setImage(null);
        setPreview("");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Report New Issue</h1>
      <form
        onSubmit={handleSubmit}
        className="card bg-white p-6 shadow space-y-4"
      >
        {preview && <img src={preview} className="h-40 rounded object-cover" />}
        <input
          className="input input-bordered w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="pothole">Pothole</option>
          <option value="streetlight">Street Light</option>
          <option value="garbage">Garbage</option>
          <option value="water-leakage">Water Leakage</option>
        </select>
        <input
          className="input input-bordered w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="file"
          className="file-input w-full"
          onChange={handleImage}
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
