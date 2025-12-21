import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { Eye, EyeOff } from "lucide-react"; // 👁️‍🗨️ চোখ আইকন

const AddStaff = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/admin/staff", form);
      alert("✅ Staff added successfully");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to add staff");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-2xl rounded-2xl max-w-md mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">
        Add New Staff
      </h2>

      <div className="mb-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="mb-4">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="mb-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500 transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="mb-4">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <button className="btn btn-primary w-full py-2 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all text-white font-bold text-lg">
        Add Staff
      </button>
    </form>
  );
};

export default AddStaff;
