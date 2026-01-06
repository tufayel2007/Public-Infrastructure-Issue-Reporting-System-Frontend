/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Demo Accounts
  const demoUsers = {
    admin: {
      email: "adminking@gmail.com",
      password: "123456",
    },
    staff: {
      email: "rasel@staff.com",
      password: "778899",
    },
    citizen: {
      email: "akabir3725@gmail.com",
      password: "123456",
    },
  };

  // 🔹 Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://issue-server-site.vercel.app/login", {
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

      login(data.user);
      localStorage.setItem("token", data.token);

      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "staff") navigate("/staff/dashboard");
      else navigate("/citizen/dashboard");
    } catch (error) {
      alert("Server Error");
    }

    setLoading(false);
  };

  // 🔹 Demo Login
  const handleDemoLogin = async (role) => {
    const demo = demoUsers[role];
    if (!demo) return;

    setEmail(demo.email);
    setPassword(demo.password);
    setLoading(true);

    try {
      const res = await fetch("https://issue-server-site.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demo),
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

      login(data.user);
      localStorage.setItem("token", data.token);

      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "staff") navigate("/staff/dashboard");
      else navigate("/citizen/dashboard");
    } catch {
      alert("Demo login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-80" />
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2s" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4s" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-center text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Login as Admin, Staff or Citizen
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              className="input input-bordered w-full bg-white/10 text-white"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="input input-bordered w-full bg-white/10 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:scale-105 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🔹 Demo Buttons */}
          <div className="mt-6">
            <p className="text-center text-gray-400 text-sm mb-3">
              🚀 Demo Login (For Reviewers)
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="flex-1 text-xs py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30"
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("staff")}
                className="flex-1 text-xs py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
              >
                Staff
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("citizen")}
                className="flex-1 text-xs py-2 rounded-xl bg-green-500/20 text-green-300 hover:bg-green-500/30"
              >
                Citizen
              </button>
            </div>
          </div>

          <div className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <Link to="/CitizenRegister" className="text-purple-400">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
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
        .animate-fade-in {
          animation: fade-in 1s ease-out;
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
      `}</style>
    </div>
  );
};

export default Login;
