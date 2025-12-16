// src/components/FAQSection.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is this app actually effective?",
      a: "Yes! Hundreds of reported issues have already been fixed through NagorSeba. Every report goes directly to admins and field staff for quick action.",
    },
    {
      q: "How many issues can I report?",
      a: "Free users can report up to 3 issues per month. Premium members get unlimited reporting + priority support.",
    },
    {
      q: "What does Boost do?",
      a: "Boosting makes your issue High Priority — it appears at the top of all lists and gets resolved faster. Cost: Only ৳100.",
    },
    {
      q: "How do I track my report?",
      a: "Go to 'My Issues' in your dashboard to see live status updates. You’ll also get notifications when your issue is resolved.",
    },
    {
      q: "My report was rejected. What now?",
      a: "If you believe it was rejected unfairly, contact support. We’ll review it again and get back to you.",
    },
    {
      q: "How much is Premium?",
      a: "Just ৳1,000 — unlock unlimited reports, priority support, premium badge, and faster resolution.",
    },
    {
      q: "Can I become a Staff member?",
      a: "Yes! City corporation or government employees can be added as Staff by the Admin.",
    },
    {
      q: "Is it only for Dhaka?",
      a: "Currently available for SylhetCity Corporation areas. Coming soon to Chittagong, Khulna, Rajshahi, and more!",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 text-cyan-400 mb-4">
            <HelpCircle className="w-10 h-10" />
            <h2 className="text-5xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-400">
            Got questions? We’ve got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/15 shadow-lg"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white pr-6 leading-tight">
                  {faq.q}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-8 pb-8 animate-in slide-in-from-top-2">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6 text-lg">Still have questions?</p>
          <a
            href="mailto:support@nagorseba.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-full hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
