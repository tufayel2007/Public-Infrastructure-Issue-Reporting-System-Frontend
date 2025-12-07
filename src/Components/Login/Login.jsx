/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub, FaApple, FaLeaf } from "react-icons/fa6";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../FirebasseConfig";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("সব ফিল্ড পূরণ করুন!", { icon: "Warning" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await fetch("http://localhost:5000/api/LOGIN_USER/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || "N/A",
          photoURL: user.photoURL || "N/A",
        }),
      });

      toast.success("স্বাগতম!", {
        icon: <Sparkles className="text-yellow-400" />,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Firebase Login Error:", error.code, error.message);
      let msg = "লগইন ব্যর্থ! ক্রেডেনশিয়াল চেক করুন।";
      if (error.code === "auth/user-not-found") {
        msg = "একাউন্ট পাওয়া যায়নি। প্রথমে রেজিস্টার করুন।";
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        msg = "পাসওয়ার্ড ভুল বা ক্রেডেনশিয়াল অবৈধ।";
      }
      toast.error(msg, { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch("http://localhost:5000/api/LOGIN_USER/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || "N/A",
          photoURL: user.photoURL || "N/A",
        }),
      });

      toast.success("Google দিয়ে স্বাগতম!", { icon: <FcGoogle size={20} /> });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google Login Error:", error.code, error.message);
      toast.error("Google লগইন ব্যর্থ। আবার চেষ্টা করুন।", { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  const handleUnavailable = (name) => {
    toast.info(`${name} লগইন শীঘ্রই আসছে!`, {
      icon: <FaLeaf className="text-success" />,
      autoClose: 2500,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-success overflow-hidden relative">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-success/30 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-info/30 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl w-full max-w-md p-8 border border-base-300 z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-success rounded-full shadow-lg">
              <FaLeaf className="text-primary-content text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-base-content/70 mt-2 text-sm">
            Login to join amazing events
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="form-control">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/ForgotPassword" className="link link-primary text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full gap-2 ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <Sparkles size={20} />
                Login Now
              </>
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-base-300"></div>
          <span className="px-4 text-sm text-base-content/60">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline btn-square"
          >
            <FcGoogle size={28} />
          </button>
          <button
            onClick={() => handleUnavailable("GitHub")}
            className="btn btn-outline btn-square"
          >
            <FaSquareGithub size={28} />
          </button>
          <button
            onClick={() => handleUnavailable("Apple")}
            className="btn btn-outline btn-square"
          >
            <FaApple size={28} />
          </button>
        </div>

        {/* Register*/}
        <p className="text-center mt-8 text-base-content/70">
          New here?{" "}
          <Link to="/register" className="link link-primary font-bold">
            Create an account
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse {
          animation: pulse 4s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
