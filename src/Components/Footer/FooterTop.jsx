/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const FooterTop = ({
  email,
  setEmail,
  handleSubscribe,
  isSubmitting,
  socialLinks,
  features,
}) => {
  return (
    <div className="pb-10 border-b border-base-200 flex flex-col lg:flex-row justify-between items-start gap-12">
      {/* Logo & Title */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 lg:w-1/3"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl"
        >
          IH
        </motion.div>
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            IssueHub
          </h1>
          <p className="text-sm text-base-content/70">
            Public Infrastructure Reporting System
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 lg:w-1/3"
      >
        <h4 className="text-lg font-bold text-primary">Follow Us</h4>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
                aria-label={item.label}
                whileHover={{ scale: 1.15, y: -5 }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="lg:w-1/3 w-full"
      >
        <h4 className="text-lg font-bold text-primary mb-3">
          Get Updates on Civic Progress
        </h4>
        <p className="text-sm text-base-content/70 mb-4">
          Subscribe to receive updates on resolved issues, new features, and
          city improvements.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-base-content/50 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-base-200 border border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>Subscribing...</>
            ) : (
              <>
                Subscribe Now <Send size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="flex flex-wrap gap-3 mt-6">
          {(features || []).map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className="flex items-center gap-2 text-sm bg-base-200 px-4 py-2 rounded-full border border-base-300"
              >
                <Icon size={16} className="text-primary" />
                <span>{feat.text}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FooterTop;
