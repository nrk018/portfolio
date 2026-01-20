"use client";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { 
  Twitter, 
  MessageCircle, 
  Linkedin, 
  MessageSquare, 
  Youtube, 
  Instagram,
  Code,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Textarea component matching Input style
function TextareaInput({
  label,
  className = "",
  value,
  rows = 6,
  ...props
}: {
  label: string;
  className?: string;
  value: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value.length > 0;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: {
      y: 0,
      color: "inherit",
    },
    animate: {
      y: "-120%",
      color: "var(--color-zinc-500)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute top-4 left-4 pointer-events-none text-zinc-900 dark:text-zinc-50"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
      >
        {label.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <textarea
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        {...props}
        className="outline-none border-none rounded-lg py-3 px-4 w-full text-base font-medium text-zinc-900 dark:text-zinc-50 placeholder-transparent resize-vertical"
        style={{
          backgroundColor: "rgba(161, 161, 170, 0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
    </div>
  );
}

// Helper hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function Contact() {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { name: "X (Twitter)", icon: Twitter, href: "https://x.com/yourusername" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/yournumber" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
    { name: "Discord", icon: MessageSquare, href: "https://discord.gg/yourserver" },
    { name: "Reddit", icon: MessageSquare, href: "https://reddit.com/user/yourusername" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@yourusername" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/yourusername" },
    { name: "LeetCode", icon: Code, href: "https://leetcode.com/yourusername" },
  ];

  return (
    <>
      <Navigation />
      <main style={{
        minHeight: "100vh",
        padding: isMobile ? "8rem 3rem 6rem" : "10rem 4rem 6rem",
        maxWidth: isMobile ? "700px" : "1000px",
        margin: "0 auto",
      }}>
        {/* Big Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            marginBottom: isMobile ? "4rem" : "6rem",
          }}
        >
          <h1 style={{
            fontSize: isMobile ? "3rem" : "5rem",
            fontWeight: 700,
            marginBottom: "2rem",
            lineHeight: 1.2,
          }}>
            Let's Connect
          </h1>
          <p style={{
            fontSize: isMobile ? "1.125rem" : "1.5rem",
            lineHeight: 1.7,
            opacity: 0.8,
            maxWidth: isMobile ? "100%" : "700px",
          }}>
            I'm always open to new opportunities, collaborations, and conversations. Reach out through any of these channels or send me a message below.
          </p>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            marginBottom: isMobile ? "4rem" : "6rem",
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
            fontWeight: 600,
            marginBottom: "2rem",
            opacity: 0.9,
          }}>
            Find Me Online
          </h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
          }}>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "48px" : "56px",
                    height: isMobile ? "48px" : "56px",
                    borderRadius: "50%",
                    border: "2px solid currentColor",
                    borderColor: "currentColor",
                    opacity: 0.7,
                    color: "inherit",
                    textDecoration: "none",
                    transition: "opacity 0.3s ease, transform 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  aria-label={social.name}
                >
                  <Icon size={isMobile ? 24 : 28} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            marginBottom: isMobile ? "4rem" : "6rem",
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
            fontWeight: 600,
            marginBottom: "1rem",
            opacity: 0.9,
          }}>
            Email Me
          </h2>
          <p style={{
            fontSize: isMobile ? "1rem" : "1.125rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
            opacity: 0.8,
          }}>
            Prefer email? You can reach me directly at{" "}
            <Link 
              href="mailto:your-email@example.com"
              style={{
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
                paddingBottom: "2px",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              your-email@example.com
            </Link>
            {" "}or use the form below.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onSubmit={handleSubmit}
          style={{
            marginTop: "2rem",
          }}
        >
          <div style={{
            marginBottom: isMobile ? "2rem" : "2.5rem",
            maxWidth: isMobile ? "100%" : "600px",
          }}>
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{
            marginBottom: isMobile ? "2rem" : "2.5rem",
            maxWidth: isMobile ? "100%" : "600px",
          }}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{
            marginBottom: isMobile ? "2rem" : "2.5rem",
            maxWidth: isMobile ? "100%" : "600px",
          }}>
            <TextareaInput
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.75rem 0",
              border: "none",
              borderBottom: "2px solid currentColor",
              background: "transparent",
              fontSize: isMobile ? "1rem" : "1.125rem",
              fontFamily: "inherit",
              cursor: "pointer",
              fontWeight: 500,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </main>
    </>
  );
}
