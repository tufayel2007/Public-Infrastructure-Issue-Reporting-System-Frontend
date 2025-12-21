import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { Eye, EyeOff } from "lucide-react";

const StaffChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch("/staff/change-password", form);
      alert("✅ Password changed successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to change password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

      <input
        type={show ? "text" : "password"}
        name="oldPassword"
        placeholder="Old Password"
        value={form.oldPassword}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <div className="relative mb-4">
        <input
          type={show ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="input input-bordered w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <button className="btn btn-primary w-full">Update Password</button>
    </form>
  );
};

export default StaffChangePassword;
