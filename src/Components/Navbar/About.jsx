import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2s" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4s" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* 1. Hero Section */}
        <section className="text-center pt-20 animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            This is a digital platform where citizens can report real-life
            public infrastructure issues such as broken streetlights, potholes,
            water leakage, garbage overflow, damaged sidewalks, and more.
          </p>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            Admins and government staff can quickly manage, verify, assign, and
            resolve citizen reports. This system reduces delays, inefficiency,
            and tracking issues commonly faced in municipal services.
          </p>
        </section>

        {/* 2. Mission */}
        <section className="grid md:grid-cols-2 gap-12 animate-fade-in">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-4xl font-bold text-purple-300 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300">
              To bridge the gap between citizens and government by providing
              fast, transparent, and effective public services.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-4xl font-bold text-pink-300 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-300">
              A smart, clean, and safe city where every issue is resolved
              quickly and easily.
            </p>
          </div>
        </section>

        {/* 3. Benefits Section */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Increased Transparency",
              "Faster Service Delivery",
              "Easy Data Analysis",
              "More Effective City Services",
            ].map((benefit, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition transform shadow-xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                  ✨
                </div>
                <p className="text-xl font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            How It Works
          </h2>
          <div className="space-y-12">
            {[
              "Citizens report issues (with photos + location)",
              "Admin reviews and assigns to staff",
              "Staff verifies and updates status",
              "Pending → In-Progress → Resolved → Closed",
              "Citizens track progress in real-time",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl">
                  {i + 1}
                </div>
                <p className="text-xl text-gray-300 flex-1 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Impact Statistics */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "500+ Issues Reported",
              "80% Resolved in 7 Days",
              "10,000+ Active Citizens",
              "50+ Partner Municipalities",
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center shadow-xl"
              >
                <p className="text-5xl font-extrabold text-purple-400">
                  {stat.split(" ")[0]}
                </p>
                <p className="text-xl text-gray-300 mt-4">
                  {stat.split(" ").slice(1).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. User Testimonials */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            What Citizens Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Amazing platform! My pothole was fixed in 3 days.",
              "Finally, a way to track my reports!",
              "Boost feature is game-changer.",
            ].map((quote, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl"
              >
                <p className="text-lg italic text-gray-300">"{quote}"</p>
                <p className="mt-6 text-purple-300 font-semibold">
                  - Citizen User
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Our Team */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "John Doe - Founder",
              "Jane Smith - Lead Developer",
              "Alex Lee - UI/UX Designer",
              "Sarah Kim - Community Manager",
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4" />
                <p className="text-xl font-semibold">{member}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              "How do I report an issue?",
              "Can I track my report?",
              "What is Boost Priority?",
              "Is my data safe?",
            ].map((q, i) => (
              <details
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl"
              >
                <summary className="text-xl font-semibold cursor-pointer">
                  {q}
                </summary>
                <p className="mt-4 text-gray-300">
                  Detailed answer placeholder for FAQ item {i + 1}.
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 9-25: Placeholder for remaining sections (to reach 25 total) */}
        {/* You can expand these similarly */}
        {/* Key Features Spotlight */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Key Features Spotlight
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Report Issues with Photos & Location",
              "Real-time Tracking",
              "Priority Boost Payment",
              "Upvote System",
              "Staff Assignment",
              "Detailed Timeline",
            ].map((feature, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:shadow-purple-500/50 transition transform"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  {feature}
                </h3>
                <p className="text-gray-300 text-center">
                  Powerful tool to enhance user experience and efficiency.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem vs Solution */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Problem vs Solution
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="backdrop-blur-xl bg-red-900/20 border border-red-500/30 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-red-300 mb-6 text-center">
                The Problem
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li>Delayed municipal services</li>
                <li>Lack of transparency</li>
                <li>Hard to track reports</li>
                <li>Inefficient assignment</li>
              </ul>
            </div>
            <div className="backdrop-blur-xl bg-green-900/20 border border-green-500/30 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-green-300 mb-6 text-center">
                Our Solution
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li>Instant reporting & tracking</li>
                <li>Full transparency</li>
                <li>Real-time updates</li>
                <li>Smart staff assignment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Partners & Collaborations */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Partners & Collaborations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center hover:scale-110 transition"
                >
                  <div className="w-24 h-24 bg-gray-700 rounded-lg" />{" "}
                  {/* Placeholder Logo */}
                </div>
              ))}
          </div>
        </section>

        {/* Mobile App Preview */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Mobile App Preview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-800" /> {/* Mockup Placeholder */}
              <p className="p-6 text-center text-xl">Home Screen</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-800" />
              <p className="p-6 text-center text-xl">Report Issue</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-800" />
              <p className="p-6 text-center text-xl">Tracking Dashboard</p>
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Security & Privacy
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Encrypted Data",
              "Secure Payments",
              "Anonymous Reporting",
              "GDPR Compliant",
            ].map((item, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center shadow-xl"
              >
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Roadmap
          </h2>
          <div className="space-y-8 relative before:absolute before:left-1/2 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-purple-600 before:to-pink-600">
            {[
              "Q1 2026: AI-Powered Issue Detection",
              "Q2 2026: Mobile App Launch",
              "Q3 2026: Multi-City Support",
              "Q4 2026: Community Rewards",
            ].map((milestone, i) => (
              <div key={i} className="flex items-center gap-8 relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full z-10" />
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex-1 shadow-xl">
                  <p className="text-xl font-bold">{milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="h-64 bg-gray-700" /> {/* Case Image */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Pothole Fixed in 48 Hours
                  </h3>
                  <p className="text-gray-300">
                    A citizen report led to rapid resolution in downtown area.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Community Guidelines
          </h2>
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
            <ul className="space-y-6 text-lg text-gray-300">
              <li>• Report genuine issues only</li>
              <li>• No spam or fake reports</li>
              <li>• Respect privacy of others</li>
              <li>• Use appropriate language</li>
              <li>• Follow local laws</li>
            </ul>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Media Coverage
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-8">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center hover:scale-110 transition"
                >
                  <div className="text-4xl font-bold text-gray-500">NEWS</div>
                </div>
              ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Stay Updated - Newsletter
          </h2>
          <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
            <p className="text-center text-xl mb-8 text-gray-300">
              Get latest updates on city improvements
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Video Explainer */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Video Explainer
          </h2>
          <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <p className="text-4xl text-gray-500">Video Embed Placeholder</p>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl"
                />
                <textarea
                  rows="6"
                  placeholder="Message"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl"
                ></textarea>
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:scale-105 transition">
                  Send Message
                </button>
              </form>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-700 flex items-center justify-center">
                <p className="text-2xl text-gray-500">Map Placeholder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Latest Updates
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition"
              >
                <div className="h-48 bg-gray-700" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    New Feature: AI Issue Detection
                  </h3>
                  <p className="text-gray-300">Released on Dec 10, 2025</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="animate-fade-in py-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-purple-300">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 flex items-center justify-center shadow-xl hover:scale-110 transition"
                >
                  <div className="text-6xl">🏆</div>
                </div>
              ))}
          </div>
        </section>

        {/* 25. Final CTA */}
        <section className="text-center animate-fade-in py-20">
          <h2 className="text-5xl sm:text-7xl font-extrabold mb-8">
            Join Us Today & Make Your City Better!
          </h2>
          <button className="px-16 py-8 text-2xl font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-110 transition shadow-2xl">
            Report an Issue Now ✨
          </button>
        </section>
      </div>

      {/* Custom Animations (same as before) */}
      <style jsx>{`
        /* ... (keep your existing keyframes) */
      `}</style>
    </div>
  );
};

export default About;
