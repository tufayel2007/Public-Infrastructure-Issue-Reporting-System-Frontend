// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("সব তথ্য পূরণ করুন");

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // টোকেন + ইউজার সেভ করো
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(`স্বাগতম, ${data.user.name || "নাগরিক"}!`);

        // রোল অনুযায়ী রিডাইরেক্ট
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (data.user.role === "staff") {
          navigate("/staff/dashboard");
        } else {
          navigate("/citizen/dashboard");
        }
      } else {
        toast.error(data.message || "লগইন ব্যর্থ");
      }
    } catch (err) {
      toast.error("সার্ভারে সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="card w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            লগইন করুন
          </h1>
          <p className="mt-4 text-gray-300">আপনার শহরের উন্নয়নে যোগ দিন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="ইমেইল"
            className="input input-bordered input-lg w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            className="input input-bordered input-lg w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full shadow-lg hover:scale-105 transition-all"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-bold hover:underline"
            >
              রেজিস্টার করুন
            </Link>
          </p>
        </div>

        {/* Admin Quick Login (ডেভেলপমেন্টে সুবিধার জন্য) */}
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400 mb-3">Quick Login (Test)</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setEmail("admin@dhakafix.com");
                setPassword("123456");
              }}
              className="btn btn-xs btn-outline text-cyan-300"
            >
              Admin
            </button>
            <button
              onClick={() => {
                setEmail("staff@dhakafix.com");
                setPassword("123456");
              }}
              className="btn btn-xs btn-outline text-yellow-300"
            >
              Staff
            </button>
            <button
              onClick={() => {
                setEmail("citizen@gmail.com");
                setPassword("123456");
              }}
              className="btn btn-xs btn-outline text-green-300"
            >
              Citizen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
