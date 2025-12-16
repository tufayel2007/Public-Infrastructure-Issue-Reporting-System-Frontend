/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub, FaApple } from "react-icons/fa6";
import { Eye, EyeOff, Sparkles, User, Mail, Lock, Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../FirebasseConfig";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  });
  const [passwordErrors, setPasswordErrors] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("কমপক্ষে ৬ অক্ষর হতে হবে।");
    if (!/[A-Z]/.test(password)) errors.push("কমপক্ষে একটি বড় হাতের অক্ষর।");
    if (!/[a-z]/.test(password)) errors.push("কমপক্ষে একটি ছোট হাতের অক্ষর।");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, photoURL } = formData;

    if (passwordErrors.length > 0) {
      toast.error("পাসওয়ার্ডের সমস্যা ঠিক করুন!", { icon: "Warning" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!", { icon: "Warning" });
      return;
    }
    if (!fullName || !email) {
      toast.error("নাম ও ইমেইল আবশ্যক!", { icon: "Warning" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fullName,
        photoURL:
          photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
          )}&background=0D8ABC&color=fff`,
      });

      toast.success("একাউন্ট তৈরি হয়েছে!", {
        icon: <Sparkles className="text-yellow-400" />,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const msg =
        error.code === "auth/email-already-in-use"
          ? "এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট আছে!"
          : "রেজিস্ট্রেশন ব্যর্থ। আবার চেষ্টা করুন।";
      toast.error(msg, { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google দিয়ে স্বাগতম!", { icon: <FcGoogle size={20} /> });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Google রেজিস্ট্রেশন ব্যর্থ!", { icon: "Warning" });
    } finally {
      setLoading(false);
    }
  };

  const handleUnavailable = (name) => {
    toast.info(`${name} শীঘ্রই আসছে!`, { icon: "Leaf", autoClose: 2500 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-success overflow-hidden relative">
      <ToastContainer position="top-center" />

      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-success/30 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-info/30 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl w-full max-w-md p-8 border border-base-300 z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-success rounded-full shadow-lg">
              <User className="text-primary-content text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-base-content/70 mt-2 text-sm">
            Join us and explore events
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              placeholder="fuull name "
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full pl-12"
              required
            />
          </div>
          <div className="form-control relative">
            <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type="url"
              name="photoURL"
              placeholder="img url"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full pl-12"
            />
          </div>
          <div className="form-control relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="email aedress"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full pl-12"
              required
            />
          </div>
          <div className="form-control relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full pl-12 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData.password && (
            <div className="text-xs space-y-1 pl-2">
              {passwordErrors.map((err, i) => (
                <div key={i} className="text-error flex items-center gap-1">
                  <span className="w-1 h-1 bg-error rounded-full"></span> {err}
                </div>
              ))}
              {passwordErrors.length === 0 && (
                <div className="text-success font-medium flex items-center gap-1">
                  <Sparkles size={14} /> Strong Pasword!
                </div>
              )}
            </div>
          )}
          {/************************************ *Confirm Password ****************************/}
          <div className="form-control relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="mske sure password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full pl-12 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData.confirmPassword && (
            <p
              className={`text-sm font-medium flex items-center gap-1 ${
                formData.password === formData.confirmPassword
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {formData.password === formData.confirmPassword ? (
                <>Password is match</>
              ) : (
                <>Password did not match</>
              )}
            </p>
          )}
          {/************************************ * submit ****************************/}
          {/* Submit */}{" "}
          <button
            type="submit"
            disabled={
              loading ||
              passwordErrors.length > 0 ||
              formData.password !== formData.confirmPassword
            }
            className={`btn btn-primary w-full gap-2 ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? (
              "তৈরি হচ্ছে..."
            ) : (
              <>
                <Sparkles size={20} />
                Registation
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
            onClick={handleGoogleRegister}
            disabled={loading}
            className="btn btn-outline btn-square"
            title="Google দিয়ে রেজিস্টার"
          >
            <FcGoogle size={24} />
          </button>
          <button
            onClick={() => handleUnavailable("GitHub")}
            className="btn btn-outline btn-square"
            disabled
          >
            <FaSquareGithub size={24} />
          </button>
          <button
            onClick={() => handleUnavailable("Apple")}
            className="btn btn-outline btn-square"
            disabled
          >
            <FaApple size={24} />
          </button>
        </div>
        {/************************************ * login Link ****************************/}

        <p className="text-center mt-8 text-base-content/70">
          Have a Account
          <Link to="/login" className="link link-primary font-bold">
            Login Now !
          </Link>
        </p>
      </div>

      {/************************************ * Animation ****************************/}
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

export default Register;
