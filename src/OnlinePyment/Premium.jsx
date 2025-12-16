import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Premium = () => {
  const handlePremium = async () => {
    const stripe = await stripePromise;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/payment/premium/create-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-400 text-black font-bold tracking-wide">
            PREMIUM MEMBERSHIP
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock unlimited issue reporting and priority support to help
            improve your city faster.
          </p>
        </div>

        {/* Premium Card */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">
              What You Get
            </h2>
            <ul className="space-y-4 text-lg">
              <li>✅ Unlimited issue reporting</li>
              <li>✅ Default high-priority issues</li>
              <li>✅ Faster resolution workflow</li>
              <li>✅ Premium user badge</li>
              <li>✅ Exclusive dashboard insights</li>
              <li>✅ Optional boost at discounted cost</li>
            </ul>
          </div>

          {/* Right Pricing Card */}
          <div className="bg-black/60 rounded-2xl p-8 text-center border border-yellow-400/30">
            <h3 className="text-3xl font-bold mb-4">One-Time Payment</h3>
            <p className="text-5xl font-extrabold text-yellow-400 mb-6">
              ৳1000
            </p>
            <p className="text-gray-300 mb-8">
              Pay once and enjoy premium features forever.
            </p>

            <button
              onClick={handlePremium}
              className="btn btn-lg w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-all duration-300"
            >
              Upgrade Now
            </button>

            <p className="text-xs text-gray-400 mt-4">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
