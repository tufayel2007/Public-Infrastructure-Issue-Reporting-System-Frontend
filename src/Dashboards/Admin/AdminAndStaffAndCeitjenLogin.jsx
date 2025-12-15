import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      if (data.user.blocked) {
        alert("You are blocked by admin!");
        setLoading(false);
        return;
      }

      // Save login in context
      login(data.user);

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect user based on role
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "staff") navigate("/staff/dashboard");
      else navigate("/citizen/dashboard");
    } catch (error) {
      alert(error.message || "Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-80" />
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2s" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4s" />
      </div>

      {/* Glassmorphism Login Card - Centered */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-center text-gray-300 mb-10 text-lg">
            Login as Admin, Staff or Citizen
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-lg font-bold py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-gray-300 mt-6">
              Don't have an account?{" "}
              <Link
                to="/CitizenRegister"
                className="text-purple-400 font-semibold hover:text-purple-300 transition"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Keyframes (Tailwind extend করো tailwind.config.js এ) */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2s {
          animation-delay: 2s;
        }
        .animation-delay-4s {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
