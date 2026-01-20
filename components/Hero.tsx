"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HandwrittenText from "./HandwrittenText";

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

interface HeroProps {
  name: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero({ name, subtitle, ctaText, ctaLink }: HeroProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const hasAnimatedRef = useRef(false);
  const isFirstLoad = typeof window !== "undefined" && !sessionStorage.getItem("hasAnimated");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only animate on first load
    if (!isFirstLoad || hasAnimatedRef.current) {
      setShowSubtitle(true);
      setShowCTA(true);
      return;
    }

    // Mark as animated
    hasAnimatedRef.current = true;
    sessionStorage.setItem("hasAnimated", "true");

    // Calculate approximate animation duration based on name length
    // Each letter takes ~0.08-0.12s with staggered delays
    const animationDuration = name.length * 0.08 + 0.5; // Reduced estimate

    let ctaTimer: NodeJS.Timeout;

    // Show subtitle faster after name animation starts (not waits for it to complete)
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
      
      // Show CTA faster after subtitle appears
      ctaTimer = setTimeout(() => {
        setShowCTA(true);
      }, 200); // Reduced from 500ms
    }, animationDuration * 1000); // Reduced timing

    return () => {
      clearTimeout(subtitleTimer);
      if (ctaTimer) {
        clearTimeout(ctaTimer);
      }
    };
  }, [name, isFirstLoad]);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "6rem 3rem" : "8rem 4rem",
      maxWidth: isMobile ? "800px" : "1200px",
      margin: "0 auto",
    }}>
      <div style={{
        textAlign: "left",
        width: "100%",
      }}>
        <HandwrittenText 
          text={name} 
          fontSize={isMobile ? "3rem" : "5rem"}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 20 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          style={{
            fontSize: isMobile ? "1.125rem" : "1.5rem",
            lineHeight: 1.8,
            marginBottom: isMobile ? "3rem" : "4rem",
            maxWidth: isMobile ? "600px" : "800px",
          }}
        >
          {subtitle.split('\n').filter(line => line.trim() !== '').map((line, index, array) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: index < array.length - 1 ? '1rem' : '0',
                lineHeight: 1.6,
              }}
            >
              {line.trim()}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <Link 
            href={ctaLink} 
            className="hero-cta-link"
            style={{
              fontSize: isMobile ? "1rem" : "1.25rem",
              textDecoration: "none",
              paddingBottom: "2px",
              display: "inline-block",
            }}
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

