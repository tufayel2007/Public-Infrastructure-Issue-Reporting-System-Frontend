/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  FileText,
  Users,
  Wrench,
  Lightbulb,
} from "lucide-react";

import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated footer links - fully in English & relevant to civic issue reporting
  const footerLinks = [
    {
      title: "Platform",
      icon: <Lightbulb size={16} />,
      links: [
        { text: "Home", href: "/" },
        { text: "About Us", href: "/about" },
        { text: "How It Works", href: "/how-it-works" },
        { text: "FAQ", href: "/faq" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Report Issues",
      icon: <AlertTriangle size={16} />,
      links: [
        { text: "All Issues", href: "/all-issues" },
        { text: "Report New Issue", href: "/create-issue" },
        { text: "My Issues", href: "/citizen/my-issues" },
        { text: "Track Issue", href: "/track" },
      ],
    },
    {
      title: "Account",
      icon: <Users size={16} />,
      links: [
        { text: "Citizen Dashboard", href: "/citizen/dashboard" },
        { text: "Staff Dashboard", href: "/staff/dashboard" },
        { text: "Admin Login", href: "/admin/login" },
        { text: "Profile", href: "/profile" },
        { text: "Premium Subscription", href: "/premium" },
      ],
    },
    {
      title: "Resources",
      icon: <FileText size={16} />,
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Guidelines", href: "/guidelines" },
        { text: "Accessibility", href: "/accessibility" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/issuehub",
    },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/issuehub" },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/issuehub",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/company/issuehub",
    },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/issuehub" },
  ];

  const quickInfo = [
    { icon: Phone, text: "+880 96 1234 5678", href: "tel:+8809612345678" },
    {
      icon: Mail,
      text: "support@issuehub.gov.bd",
      href: "mailto:support@issuehub.gov.bd",
    },
    {
      icon: MapPin,
      text: "SylhetCity Corporation, Bangladesh",
      href: "https://maps.google.com",
    },
  ];

  const features = [
    { icon: Shield, text: "Secure & Transparent" },
    { icon: Clock, text: "Faster Resolution" },
    { icon: CheckCircle, text: "Real-time Tracking" },
    { icon: Wrench, text: "Direct Staff Assignment" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Subscribed successfully! Welcome ${email.split("@")[0]}`, {
      duration: 4000,
    });
    setEmail("");
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Toaster position="top-center" />

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-2xl"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-20 right-6 z-50 btn btn-success btn-circle shadow-2xl"
        aria-label="Live chat support"
      >
        <MessageCircle size={24} />
      </motion.button>

      <footer className="bg-base-300 text-base-content pt-16 pb-8" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="alert alert-info rounded-2xl mb-12 shadow-lg text-center"
          >
            <span className="font-bold text-lg">
              Report Public Issues Instantly • Track Progress • Get Faster
              Resolutions
            </span>
          </motion.div>

          <FooterTop
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            isSubmitting={isSubmitting}
            socialLinks={socialLinks}
            features={features}
          />

          <FooterMiddle
            footerLinks={footerLinks}
            openSection={openSection}
            setOpenSection={setOpenSection}
            quickInfo={quickInfo}
          />

          <FooterBottom currentYear={currentYear} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
