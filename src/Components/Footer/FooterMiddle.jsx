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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
        {footerLinks.map((column, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="md:hidden">
              <button
                onClick={() => setOpenSection(openSection === i ? null : i)}
                className="flex justify-between items-center w-full text-left font-semibold text-primary pb-3 border-b border-base-200"
              >
                <span className="flex items-center gap-2">
                  {column.icon} {column.title}
                </span>
                {openSection === i ? <ChevronUp /> : <ChevronDown />}
              </button>
              <AnimatePresence>
                {openSection === i && (
                  <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden mt-4 space-y-2"
                  >
                    {column.links.map((link, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <a
                          href={link.href}
                          className="text-base-content/70 hover:text-primary transition"
                        >
                          {link.text}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                {column.icon} {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 8 }}
                    className="text-base-content/70 hover:text-primary transition-all"
                  >
                    <a href={link.href} className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-base-200">
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
              className="flex items-center gap-4 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition">
                <Icon className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Contact</p>
                <p className="font-medium group-hover:text-primary transition">
                  {info.text}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </>
  );
};

export default FooterMiddle;
