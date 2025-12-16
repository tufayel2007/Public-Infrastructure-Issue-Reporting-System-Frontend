import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const FooterBottom = ({ currentYear }) => {
  const policyLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Guidelines",
    "Accessibility",
    "Contact Us",
  ];

  return (
    <div className="border-t border-base-200 pt-8 mt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center text-sm text-base-content/70 gap-6">
        <p className="text-center lg:text-left">
          © {currentYear}{" "}
          <span className="font-bold text-primary">IssueHub</span>. All rights
          reserved.
          <br className="lg:hidden" />
          <span className="hidden lg:inline"> • </span>A Public Infrastructure
          Reporting Platform for Better Cities.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {policyLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-primary transition"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-8 text-primary font-medium"
      >
        Report • Track • Resolve — Together We Improve Our City
      </motion.p>
      <div className="mt-10 text-center">
        <p className="text-sm md:text-base text-gray-400">
          Made & Developed by{" "}
          <Link
            to="https://my-protflio-web.vercel.app/"
            target="_blank"
            className="font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                 bg-clip-text text-transparent hover:opacity-80 transition duration-300
                 animate-gradient"
          >
            👉🏼 Tufayel
          </Link>{" "}
          — Web Experts
        </p>

        {/* Gradient Animation */}
        <style jsx>{`
          @keyframes gradient-move {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-move 4s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FooterBottom;
