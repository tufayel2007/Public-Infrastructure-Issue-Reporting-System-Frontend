import { useState } from "react";

const CitizenRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);

    const res = await fetch("http://localhost:5000/register/citizen", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
    } else {
      alert("Citizen Registered Successfully");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Gradient + Floating Blobs Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 opacity-70" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2s" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4s" />
      </div>

      {/* Glassmorphism Registration Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-center text-white mb-4 tracking-tight">
            Citizen Registration
          </h2>
          <p className="text-center text-gray-300 mb-10 text-lg">
            Join the community – report & boost issues!
          </p>

          <form onSubmit={handleRegister} className="space-y-7">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg py-6 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Create Password"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg py-6 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="file"
                className="file-input file-input-bordered w-full bg-white/10 border-white/20 text-white hover:border-purple-500 transition-all duration-300"
                onChange={(e) => setPhoto(e.target.files[0])}
                accept="image/*"
                required
              />
              <p className="text-gray-400 text-sm mt-2 text-center">
                Upload your profile photo
              </p>
            </div>

            <button
              className="btn btn-primary w-full text-xl font-bold py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/50 border-0"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account ✨"}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Animations (Tailwind + Inline) */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 25s infinite;
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CitizenRegister;
