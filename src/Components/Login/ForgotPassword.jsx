/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Password reset link sent!");
      setCountdown(60);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    let redirectTimer;
    if (sent) {
      redirectTimer = setTimeout(() => navigate("/login"), 5000);
    }
    return () => clearTimeout(redirectTimer);
  }, [sent, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black p-4">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2s" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4s" />
      </div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
          {!sent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-white mb-3">
                  Forgot Password?
                </h2>
                <p className="text-gray-300 text-sm max-w-xs mx-auto">
                  No worries! Enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleReset} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input input-bordered w-full pl-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
                    disabled={loading || countdown > 0}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || countdown > 0}
                  className="btn w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold border-none hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Sending Link..."
                    : countdown > 0
                    ? `Resend in ${countdown}s`
                    : "Send Reset Link"}
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-8">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-purple-400 font-medium transition-all hover:gap-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-bold text-white mb-3">
                Check Your Email!
              </h3>
              <p className="text-gray-300 mb-8 max-w-sm mx-auto">
                We've sent a password reset link to{" "}
                <span className="text-purple-300 font-medium">{email}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-success flex-1 py-3 rounded-2xl font-bold hover:scale-105 transition"
                >
                  Go to Login
                </button>
                <Link
                  to="/"
                  className="btn btn-ghost flex-1 py-3 rounded-2xl text-gray-300 border-white/20 hover:bg-white/10 transition"
                >
                  Back to Home
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Redirecting in 5 seconds...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
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
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
