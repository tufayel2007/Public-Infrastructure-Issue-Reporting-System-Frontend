import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { useAuth } from "../context/AuthContext";

const PremiumSuccess = () => {
  const { user, login } = useAuth();
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) {
        toast.error("No payment session found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/payment/premium/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await res.json();

        if (data.success) {
          toast.success("Premium activated successfully!");

          // 🔥 update AuthContext dynamically
          login({
            ...user,
            subscription: "premium",
          });

          setShowCard(true);
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Something went wrong during verification");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [login, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-white text-2xl animate-pulse">
          Verifying your premium membership...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Confetti Celebration */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={400}
        gravity={0.1}
        colors={[
          "#f0abfc",
          "#c084fc",
          "#a78bfa",
          "#fbbf24",
          "#f87171",
          "#34d399",
        ]}
      />

      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${6 + Math.random() * 12}s`,
            }}
          >
            <div className="w-5 h-5 bg-white/20 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Glowing Crown */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 animate-pulse">
        <div className="text-9xl drop-shadow-2xl">👑</div>
        <div className="absolute inset-0 text-9xl blur-3xl text-yellow-400 animate-ping opacity-70">
          👑
        </div>
      </div>

      {/* Main Success Card */}
      {showCard && (
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 border border-white/20 animate-fade-in-scale z-10">
          {/* Premium Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black font-bold px-10 py-4 rounded-full shadow-2xl text-xl animate-bounce">
              PREMIUM MEMBER
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl text-center">
            🎉 Congratulations!
          </h1>

          <p className="text-2xl text-white mb-8 font-medium leading-relaxed text-center">
            You are now a{" "}
            <span className="text-yellow-300 font-bold">Premium Member</span>!
            <br />
            Enjoy unlimited reports, priority support, and exclusive perks.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-10 text-left">
            {[
              { icon: "∞", text: "Unlimited Issue Reports" },
              { icon: "⚡", text: "Priority Support & Faster Resolution" },
              { icon: "🔥", text: "50% Discount on Issue Boosts" },
              { icon: "🏆", text: "Premium Badge & Exclusive Dashboard" },
              { icon: "✨", text: "Special Themes & Animations" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-lg text-white">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => (window.location.href = "/citizen/dashboard")}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-5 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden group w-full max-w-xs mx-auto block"
          >
            <span className="relative z-10">Go to Dashboard 🚀</span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          <p className="mt-8 text-white/70 text-sm text-center">
            Thank you for supporting us. Together, let's make the city better!
            ❤️
          </p>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumSuccess;
