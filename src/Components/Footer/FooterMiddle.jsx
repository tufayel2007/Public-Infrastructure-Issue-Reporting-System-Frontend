/* eslint-disable no-unused-vars */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FooterMiddle = ({
  footerLinks,
  openSection,
  setOpenSection,
  quickInfo,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8 py-12">
        {footerLinks.map((column, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
            className="col-span-1"
          >
            <div className="md:hidden">
              <button
                onClick={() => setOpenSection(openSection === i ? null : i)}
                className="flex justify-between items-center w-full text-left font-bold text-green-400 pb-2 border-b border-gray-700 dark:border-gray-600"
              >
                <span className="flex items-center gap-2">
                  {column.icon} {column.title}
                </span>
                {openSection === i ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <AnimatePresence>
                {openSection === i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="overflow-hidden mt-3"
                  >
                    {column.links.map((link, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                      >
                        <a
                          href={link.href}
                          className="flex items-center gap-2 py-2 text-sm text-gray-300 hover:text-green-400 transition-all"
                        >
                          {link.icon && <span>{link.icon}</span>}
                          {link.text}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <h4 className="text-lg font-bold text-green-400 border-b-2 border-green-500 pb-1 mb-4 inline-block flex items-center gap-2">
                {column.icon} {column.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {column.links.map((link, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 text-green-400">
                        →
                      </span>
                      {link.icon && (
                        <span className="text-green-500">{link.icon}</span>
                      )}
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-700 dark:border-gray-600"
      >
        {quickInfo.map((info, i) => {
          const Icon = info.icon;
          return (
            <motion.a
              key={i}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={
                info.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="flex items-center gap-3 text-sm group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="text-green-400" size={18} />
              </div>
              <div>
                <p className="text-gray-400">{info.label}</p>
                <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                  {info.text}
                </p>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </>
  );
};

export default FooterMiddle;
