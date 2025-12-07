/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  Award,
  Truck,
  RefreshCw,
} from "lucide-react";

const FooterTop = ({
  email,
  setEmail,
  handleSubscribe,
  isSubmitting,
  socialLinks,
  certifications,
}) => {
  return (
    <div className="pb-10 border-b border-gray-700 dark:border-gray-600 flex flex-col lg:flex-row justify-between items-start gap-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center gap-3 lg:w-1/4"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl"
        >
          SD
        </motion.div>
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Social Development
          </h1>
          <p className="text-xs text-green-300">Your Indoor Oasis</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 lg:w-1/3"
      >
        <h4 className="text-lg font-bold text-green-400">Stay Connected</h4>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-12 h-12 flex items-center justify-center rounded-full ${item.color} transition-all hover:scale-110 hover:rotate-12 shadow-xl`}
                aria-label={item.label}
                whileHover={{ y: -4 }}
              >
                <Icon className="w-6 h-6 text-white" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.4 }}
        className="lg:w-1/3 w-full"
      >
        <h4 className="text-lg font-bold text-green-400 border-b-2 border-green-500 pb-1 mb-4 inline-block">
          SDEP Newsletter
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          Get exclusive plant care tips, new arrivals, and{" "}
          <strong className="text-green-300">10% off</strong> your first order!
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-gray-500 w-5 h-5 group-focus-within:text-green-400 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
              aria-label="Email for newsletter"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <motion.div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing...
              </motion.div>
            ) : (
              <>
                <span>Join the SDEP</span>
                <Send size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="flex flex-wrap gap-3 mt-6">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-xs text-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1.5 rounded-full border border-gray-700"
              >
                <Icon size={14} className="text-green-400" />
                <span>{cert.text}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FooterTop;
