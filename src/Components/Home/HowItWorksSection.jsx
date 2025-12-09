import React from "react";
import { Camera, Eye, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Report the Issue",
      description:
        "Take a photo, add location & description — submit in under 30 seconds.",
      icon: <Camera className="w-10 h-10" />,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      number: "02",
      title: "Admin Reviews & Assigns",
      description:
        "Admin verifies the report and instantly assigns it to the nearest field staff.",
      icon: <Eye className="w-10 h-10" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      number: "03",
      title: "Staff Takes Action",
      description:
        "Assigned staff visits the spot, updates progress, and starts fixing the issue.",
      icon: <Wrench className="w-10 h-10" />,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      number: "04",
      title: "Issue Resolved!",
      description:
        "Once fixed, the report is marked Resolved. You get notified with before/after photos.",
      icon: <CheckCircle2 className="w-10 h-10" />,
      gradient: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-900 to-black">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From reporting to resolution — transparent, fast, and
            community-driven.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 -z-10"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Step Number */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-xl`}
                >
                  {step.number}
                </div>
              </div>

              {/* Connecting Arrow (except last) */}
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 italic">
            Your Report → Real Change in Days
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
