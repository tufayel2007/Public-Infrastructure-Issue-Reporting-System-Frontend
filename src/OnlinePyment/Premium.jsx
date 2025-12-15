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
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-10">প্রিমিয়াম মেম্বারশিপ</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
          <p className="text-4xl mb-8">মাত্র ১০০০ টাকা (এককালীন)</p>
          <ul className="text-2xl space-y-6 mb-12 text-left max-w-2xl mx-auto">
            <li>✅ আনলিমিটেড ইস্যু রিপোর্ট</li>
            <li>✅ প্রায়োরিটি সাপোর্ট</li>
            <li>✅ বুস্ট খরচ ৫০% কম (ঐচ্ছিক)</li>
            <li>✅ প্রিমিয়াম ব্যাজ</li>
            <li>✅ বিশেষ ড্যাশবোর্ড স্ট্যাটস</li>
          </ul>
          <button onClick={handlePremium} className="btn btn-lg btn-accent">
            এখনই প্রিমিয়াম হোন
          </button>
        </div>
      </div>
    </div>
  );
};
export default Premium;
