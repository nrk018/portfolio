"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// All images in the me folder
const meImages = [
  "/me/hero.png",
  "/me/me.png",
  "/me/me2.png",
  "/me/Gemini_Generated_Image_ai3qigai3qigai3q.png",
  "/me/Gemini_Generated_Image_as8lr0as8lr0as8l.png",
  "/me/Gemini_Generated_Image_b8ezeub8ezeub8ez.png",
  "/me/Gemini_Generated_Image_ku47zzku47zzku47.png",
  "/me/Gemini_Generated_Image_mhlyz4mhlyz4mhly.png",
  "/me/Gemini_Generated_Image_nrcopnnrcopnnrco.png",
  "/me/Gemini_Generated_Image_s5d83ws5d83ws5d8.png",
  "/me/Gemini_Generated_Image_wc9diawc9diawc9d.png",
];

function DownloadResumeButton() {
  return (
    <motion.div
      className="relative inline-block"
      style={{
        padding: "2px",
        borderRadius: "0.375rem",
        background: "transparent",
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-md"
        style={{
          background: "linear-gradient(90deg, #ffffff, #93c5fd, #60a5fa, #93c5fd, #ffffff)",
          backgroundSize: "200% 100%",
          opacity: 0,
          borderRadius: "0.375rem",
          transition: "opacity 0.3s ease",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "200% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{
          opacity: 1,
        }}
      />
      <button
        style={{
          position: "relative",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          background: "var(--nav-bg, #fff)",
          border: "1px solid",
          borderColor: "currentColor",
          borderRadius: "0.375rem",
          cursor: "pointer",
          color: "inherit",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        Download Resume
      </button>
    </motion.div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const hasAnimatedRef = useRef(false);
  const isFirstLoad = typeof window !== "undefined" && !sessionStorage.getItem("hasAnimated");
  const [isVisible, setIsVisible] = useState(!isHomePage || !isFirstLoad); // Visible immediately on non-home pages or if already animated
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = currentImageIndex;
  }, [currentImageIndex]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Only delay fade-in on home page and first load
    if (isHomePage && isFirstLoad && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      // Reduced delay - navbar appears faster, overlapping with name animation
      // Name animation: ~(name.length * 80ms) = ~2240ms for "nirmal rajkumar modaliyar" (28 chars)
      // Navbar appears much earlier, overlapping with animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Reduced from 5000ms to 1500ms

      return () => clearTimeout(timer);
    } else {
      // On other pages or subsequent loads, show immediately
      setIsVisible(true);
    }
  }, [isHomePage, isFirstLoad]);

  useEffect(() => {
    if (isHovering) {
      // Start cycling through images on hover
      intervalRef.current = setInterval(() => {
        const next = (currentIndexRef.current + 1) % meImages.length;
        setNextImageIndex(next);
        // After transition completes, update current to match next
        setTimeout(() => {
          setCurrentImageIndex(next);
          currentIndexRef.current = next;
        }, 500);
      }, 800); // Change image every 800ms
    } else {
      // Reset to first image when not hovering
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Only reset if not already at index 0
      if (currentIndexRef.current !== 0) {
        setNextImageIndex(0);
        setTimeout(() => {
          setCurrentImageIndex(0);
          currentIndexRef.current = 0;
        }, 500);
      } else {
        setNextImageIndex(0);
        setCurrentImageIndex(0);
        currentIndexRef.current = 0;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/garden", label: "2nd BRAIN" },
    { href: "/timeline", label: "Timeline" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav 
        className="nav-theme"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: isMobile ? "1.5rem 1.5rem" : "2rem 3rem",
          zIndex: 1000,
          opacity: isVisible ? 1 : 0,
          transition: isVisible 
            ? "opacity 0.5s ease-in, background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)" 
            : "none",
          willChange: "background-color, color, opacity",
        }}
      >
        <div style={{
          display: "flex",
          gap: isMobile ? "1rem" : "2rem",
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}>
          <div style={{
            display: "flex",
            gap: isMobile ? "0.75rem" : "2rem",
            alignItems: "center",
          }}>
            <Link 
              href="/" 
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                gap: "0.75rem",
              }}
              onMouseEnter={() => !isMobile && setIsHovering(true)}
              onMouseLeave={() => !isMobile && setIsHovering(false)}
            >
              <div style={{
                position: "relative",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                flexShrink: 0,
              }}>
                {/* Current image - fading out */}
                <Image
                  src={meImages[currentImageIndex]}
                  alt="Home"
                  fill
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    opacity: currentImageIndex === nextImageIndex ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    zIndex: currentImageIndex === nextImageIndex ? 2 : 1,
                  }}
                  priority={currentImageIndex === 0}
                />
                {/* Next image - fading in */}
                {currentImageIndex !== nextImageIndex && (
                  <Image
                    src={meImages[nextImageIndex]}
                    alt="Home"
                    fill
                    style={{
                      objectFit: "cover",
                      position: "absolute",
                      opacity: 1,
                      transition: "opacity 0.5s ease-in-out",
                      zIndex: 2,
                    }}
                  />
                )}
              </div>
              {isMobile && (
                <span style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}>
                  NRK
                </span>
              )}
            </Link>
            {/* Desktop navigation links */}
            {!isMobile && navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}>
            {!isMobile && <DownloadResumeButton />}
            {!isMobile && <AnimatedThemeToggle />}
            {isMobile && (
              <>
                <AnimatedThemeToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "fixed",
              top: "4.5rem",
              left: 0,
              right: 0,
              backgroundColor: "var(--nav-bg, #fff)",
              color: "var(--nav-color, #000)",
              zIndex: 99,
              padding: "1.5rem",
              borderTop: "1px solid",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="nav-theme mobile-menu"
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    padding: "0.5rem 0",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid",
                  borderTopColor: "currentColor",
                  opacity: 0.2,
                }}
              >
                <DownloadResumeButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
