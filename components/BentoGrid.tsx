"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface BentoCardProps {
  href: string;
  title: string;
  description: string;
  tags?: string[];
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
}

function BentoCard({ href, title, description, tags, colSpan = 1, rowSpan = 1, delay = 0 }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <Link
        href={href}
        style={{
          display: "block",
          height: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ 
            y: -8,
            transition: { 
              type: "spring", 
              stiffness: 400, 
              damping: 17 
            }
          }}
          style={{
            height: "100%",
            padding: isMobile ? "1.5rem" : "1.75rem",
            border: "1px solid currentColor",
            borderColor: "currentColor",
            opacity: 0.3,
            borderRadius: "0",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "border-color 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0.3,
            borderColor: isHovered ? "currentColor" : "currentColor",
          }}
        >
          <div>
            <h3 style={{
              fontSize: isMobile ? "1.25rem" : "1.375rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              {title}
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </h3>
            <p style={{
              fontSize: isMobile ? "0.875rem" : "0.9375rem",
              lineHeight: 1.5,
              opacity: 0.8,
            }}>
              {description}
            </p>
          </div>
          {tags && tags.length > 0 && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1rem",
            }}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "0.6875rem",
                    padding: "0.2rem 0.6rem",
                    border: "1px solid currentColor",
                    borderColor: "currentColor",
                    opacity: 0.4,
                    borderRadius: "0",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function BentoGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bentoCards = [
    {
      href: "/about",
      title: "About",
      description: "Learn about my journey, philosophy, and the tools I use to create meaningful experiences.",
      tags: ["Story", "Philosophy", "Skills"],
      colSpan: isMobile ? 1 : 2,
      rowSpan: isMobile ? 1 : 1,
      delay: 0,
    },
    {
      href: "/garden",
      title: "2nd BRAIN",
      description: "A collection of thoughts, ideas, and reflections on design, development, and creativity.",
      tags: ["Thoughts", "Ideas"],
      colSpan: isMobile ? 1 : 1,
      rowSpan: isMobile ? 1 : 1,
      delay: 0.1,
    },
    {
      href: "/timeline",
      title: "Timeline",
      description: "A chronological journey through my life and work from 2019 to 2025, marking key milestones.",
      tags: ["Journey", "Milestones"],
      colSpan: isMobile ? 1 : 1,
      rowSpan: isMobile ? 1 : 1,
      delay: 0.2,
    },
    {
      href: "/contact",
      title: "Contact",
      description: "Let's connect! Reach out through email or find me on various social platforms.",
      tags: ["Email", "Social", "Connect"],
      colSpan: isMobile ? 1 : 2,
      rowSpan: isMobile ? 1 : 1,
      delay: 0.3,
    },
  ];

  return (
    <section style={{
      padding: isMobile ? "4rem 3rem" : "6rem 4rem",
      maxWidth: isMobile ? "100%" : "1400px",
      margin: "0 auto",
      width: "100%",
      minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          marginBottom: isMobile ? "2rem" : "2rem",
        }}
      >
        <h2 style={{
          fontSize: isMobile ? "2rem" : "2.5rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
        }}>
          Explore
        </h2>
        <p style={{
          fontSize: isMobile ? "1rem" : "1.125rem",
          lineHeight: 1.6,
          opacity: 0.8,
          maxWidth: isMobile ? "100%" : "600px",
        }}>
          Navigate through different sections of my portfolio and discover more about my work and journey.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
        gap: isMobile ? "1rem" : "1rem",
        gridAutoRows: isMobile ? "auto" : "minmax(220px, 1fr)",
        flex: 1,
        width: "100%",
        margin: "0 auto",
      }}>
        {bentoCards.map((card, index) => (
          <BentoCard
            key={card.href}
            href={card.href}
            title={card.title}
            description={card.description}
            tags={card.tags}
            colSpan={card.colSpan}
            rowSpan={card.rowSpan}
            delay={card.delay}
          />
        ))}
      </div>
    </section>
  );
}

