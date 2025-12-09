import React from "react";
import {
  AlertCircle,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <AlertCircle className="w-10 h-10" />,
      title: "Report Issues Instantly",
      description:
        "Report potholes, broken streetlights, garbage, water leakage — just take a photo and submit in seconds.",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Precise Location Tracking",
      description:
        "Auto-detect your location or drop a pin. Authorities will know exactly where to go.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Upvote & Boost Priority",
      description:
        "Community upvotes push important issues to the top. Boost your report to make it high-priority.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Real-Time Tracking",
      description:
        "Follow your report from 'Pending' → 'In Progress' → 'Resolved' with live updates.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Staff Assignment System",
      description:
        "Admins assign reports to field staff. Staff update progress directly from the ground.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "Verified Resolutions",
      description:
        "Only verified fixes are marked as resolved. Transparency at every step.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Admin Control Panel",
      description:
        "Full control: assign staff, reject fake reports, manage users, view analytics.",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Fast & Responsive",
      description:
        "Works perfectly on mobile & desktop. Report issues even while walking on the street!",
      gradient: "from-yellow-500 to-amber-600",
    },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to make city services faster, transparent, and
            accountable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div
                className={`relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 text-center">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 italic">
            Built for Citizens. Powered by Community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
