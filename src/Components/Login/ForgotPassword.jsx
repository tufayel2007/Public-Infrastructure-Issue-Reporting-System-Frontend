/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useTheme } from "../context/ThemeContext";

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
      toast.error("ইমেইল লিখুন।");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("সঠিক ইমেইল লিখুন।");
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে!");
      setCountdown(60);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("এই ইমেইল দিয়ে কোনো একাউন্ট পাওয়া যায়নি।");
      } else if (err.code === "auth/invalid-email") {
        toast.error("ইমেইল অবৈধ।");
      } else {
        toast.error("কিছু ভুল হয়েছে। পরে আবার চেষ্টা করুন।");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="card bg-base-200 shadow-2xl w-full max-w-md p-8 border border-base-300 text-center">
        {!sent ? (
          <>
            <h2 className="text-3xl font-bold text-primary mb-2">
              পাসওয়ার্ড ভুলে গেছেন?
            </h2>
            <p className="text-base-content/70 mb-6">
              আপনার রেজিস্টার্ড ইমেইলে একটি পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।
            </p>

            <form onSubmit={handleReset} className="space-y-5">
              <div className="form-control relative">
                <label htmlFor="email" className="sr-only">
                  ইমেইল
                </label>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল লিখুন"
                  className="input input-bordered w-full pl-12"
                  disabled={loading || countdown > 0}
                />
              </div>

              <button
                type="submit"
                disabled={loading || countdown > 0}
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              >
                {loading
                  ? "পাঠানো হচ্ছে..."
                  : countdown > 0
                  ? `অপেক্ষা করুন ${countdown}সে`
                  : "রিসেট লিংক পাঠান"}
              </button>
            </form>

            <p className="text-sm mt-6 text-base-content/60">
              মনে পড়েছে?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                লগইন
              </Link>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="text-success w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-success">
              রিসেট লিংক পাঠানো হয়েছে!
            </h3>
            <p className="text-base-content/70 mt-2">
              আপনার ইমেইল চেক করুন এবং নির্দেশনা অনুসরণ করুন। লগইনে ফিরে
              যাচ্ছে...
            </p>

            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-success flex-1"
              >
                লগইনে ফিরুন
              </button>
              <Link to="/" className="btn btn-ghost flex-1">
                হোম
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
