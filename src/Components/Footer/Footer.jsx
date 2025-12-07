/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  RefreshCw,
  ArrowUp,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Leaf,
  Heart,
  Sparkles,
  Zap,
  Coffee,
  Award,
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

  const footerLinks = [
    {
      title: "কোম্পানি",
      icon: <Sparkles size={16} />,
      links: [
        { text: "হোম", icon: <Leaf size={14} />, href: "/" },
        { text: "আমাদের সম্পর্কে", icon: <Heart size={14} /> },
        { text: "যোগাযোগ", href: "/helpDesk", icon: <Mail size={14} /> },
        { text: "ক্যারিয়ার", icon: <Zap size={14} /> },
        { text: "ব্লগ", icon: <Coffee size={14} /> },
      ],
    },
    {
      title: "সার্ভিস",
      icon: <Award size={16} />,
      links: [
        { text: "গাছের যত্ন" },
        { text: "ইন্টেরিয়র ডিজাইন" },
        { text: "কর্পোরেট গিফটিং" },
        { text: "ওয়ার্কশপ" },
        { text: "পরামর্শ" },
      ],
    },
    {
      title: "একাউন্ট",
      icon: <Shield size={16} />,
      links: [
        { text: "আমার প্রোফাইল" },
        { text: "অর্ডার হিস্ট্রি" },
        { text: "উইশলিস্ট" },
        { text: "ঠিকানা" },
        { text: "সাপোর্ট" },
      ],
    },
    {
      title: "শিখুন",
      icon: <Mail size={16} />,
      links: [
        { text: "গাছের গাইড" },
        { text: "যত্ন টিপস" },
        { text: "সাসটেইনেবিলিটি" },
        { text: "FAQ" },
        { text: "ভিডিও টিউটোরিয়াল" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Youtube, label: "YouTube" },
  ];

  const quickInfo = [
    { icon: Phone, text: "+880 123 456 789", href: "tel:+880123456789" },
    {
      icon: Mail,
      text: "hello@greennest.com",
      href: "mailto:hello@greennest.com",
    },
    {
      icon: MapPin,
      text: "Dhaka, Bangladesh",
      href: "https://maps.google.com",
    },
  ];

  const certifications = [
    { icon: Shield, text: "100% Organic" },
    { icon: Award, text: "Eco Certified" },
    { icon: Truck, text: "Free Delivery" },
    { icon: RefreshCw, text: "Easy Returns" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("সঠিক ইমেইল লিখুন।", { icon: <AlertCircle /> });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`স্বাগতম, ${email.split("@")[0]}!`, {
      icon: <CheckCircle className="text-success" />,
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
      <Toaster
        position="top-center"
        toastOptions={{ className: "font-medium" }}
      />

      {/* Back to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-2xl"
            aria-label="উপরে যান"
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
        aria-label="লাইভ চ্যাট"
      >
        <MessageCircle size={24} />
      </motion.button>

      <footer className="bg-base-300 text-base-content pt-16 pb-8" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="alert alert-success rounded-2xl mb-12 shadow-lg text-center"
          >
            <span className="font-bold">
              🌟✨ Social Development
              <span className="text-warning">Events Platform: "Ekota"</span>!
              (ঐক্য) 🤝
              <kbd className="kbd kbd-sm">SDEP</kbd>
            </span>
          </motion.div>

          <FooterTop
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            isSubmitting={isSubmitting}
            socialLinks={socialLinks}
            certifications={certifications}
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
