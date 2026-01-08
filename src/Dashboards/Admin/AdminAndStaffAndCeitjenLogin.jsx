/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔹 New state for password visibility
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
              className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* 🔹 Password Field with Eye Icon */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400 pr-12"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:scale-105 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-6">
              <Link
                to="/forgotPassword"
                className="inline-flex items-center gap-2 px-5 py-2.5 
               rounded-full
               bg-gradient-to-r from-purple-600/20 to-indigo-600/20
               border border-purple-500/30
               text-purple-300 font-medium text-sm
               hover:from-purple-600/30 hover:to-indigo-600/30
               hover:text-purple-200
               hover:border-purple-400
               hover:shadow-xl hover:shadow-purple-500/25
               backdrop-blur-sm
               transition-all duration-500 ease-out
               group"
              >
                <svg
                  className="w-4 h-4 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Forgot Password?
              </Link>
            </div>
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
                className="flex-1 text-xs py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("staff")}
                className="flex-1 text-xs py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
              >
                Staff
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("citizen")}
                className="flex-1 text-xs py-2 rounded-xl bg-green-500/20 text-green-300 hover:bg-green-500/30 transition"
              >
                Citizen
              </button>
            </div>
          </div>

          <div className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <Link
              to="/CitizenRegister"
              className="text-purple-400 hover:underline"
            >
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
