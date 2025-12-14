import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BoostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Safety check: location.search must exist
    if (!location?.search) {
      toast.error("Invalid payment request!");
      return navigate("/allIssues");
    }

    const params = new URLSearchParams(location.search);

    const session_id = params.get("session_id");
    const issueId = params.get("issueId");

    // Validate required params
    if (!session_id || !issueId) {
      toast.error("Missing payment parameters!");
      return navigate("/allIssues");
    }

    const verify = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You are not logged in!");
          return navigate("/login");
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/payment/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              sessionId: session_id,
              issueId: issueId,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        toast.success("Boost successful!");

        // navigate(`/issue/${issueId}`);
      } catch (err) {
        console.error("BOOST VERIFY ERROR >", err);
        toast.error(err.message || "Boost verification failed");
        navigate(`/issue/${issueId}`);
      }
    };

    verify();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Lights */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Neon Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-3xl p-10 flex flex-col items-center max-w-md w-full">
        {/* Animated Neon Rings */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-blue-500 animate-spin"></div>
          <div className="w-40 h-40 rounded-full border-4 border-purple-500 animate-[spin_6s_linear_infinite_reverse] absolute top-[-16px] left-[-16px]"></div>
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
          Verifying Payment
        </h2>

        <p className="text-gray-300 mt-3 text-lg tracking-wide">
          Your boost request is being confirmed...
        </p>

        {/* Glowing Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 px-10 py-3 text-lg font-semibold rounded-full 
                 bg-gradient-to-r from-blue-600 to-purple-600 
                 text-white shadow-[0_0_20px_rgba(0,0,255,0.5)] 
                 hover:shadow-[0_0_30px_rgba(120,0,255,0.8)]
                 hover:scale-105 transition-all duration-300"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"></div>
    </div>
  );
};

export default BoostSuccess;
