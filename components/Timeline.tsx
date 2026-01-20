"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

interface TimelineEntry {
  year: string;
  title?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        padding: "8rem 3rem 6rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          stiffness: 120,
          damping: 25,
        }}
        style={{
          marginBottom: "4rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          Timeline
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            opacity: 0.8,
          }}
        >
          A chronological journey through my life and work from 2019 to 2025.
        </p>
      </motion.div>

      <div
        ref={timelineRef}
        style={{
          position: "relative",
          paddingLeft: "3rem",
        }}
      >
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: "1.5rem",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "currentColor",
            opacity: 0.2,
            transform: "translateX(-50%)",
          }}
        />

        {/* Animated progress line */}
        <motion.div
          style={{
            position: "absolute",
            left: "1.5rem",
            top: 0,
            width: "2px",
            backgroundColor: "currentColor",
            opacity: 0.6,
            transform: "translateX(-50%)",
            height: progressHeight,
            transformOrigin: "top",
          }}
        />

        {/* Timeline entries */}
        {entries.map((entry, index) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 120,
              damping: 25,
            }}
            style={{
              position: "relative",
              marginBottom: "4rem",
              paddingBottom: index === entries.length - 1 ? 0 : "2rem",
              willChange: "opacity, transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "-3rem",
                top: "0.5rem",
                width: "1rem",
                height: "1rem",
                borderRadius: "50%",
                backgroundColor: "var(--nav-bg, #fff)",
                border: "2px solid currentColor",
                borderColor: "currentColor",
                opacity: 0.6,
                transform: "translateX(-50%)",
                zIndex: 10,
              }}
            />

            {/* Year label */}
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  opacity: 0.7,
                  marginBottom: entry.title ? "0.5rem" : "1rem",
                }}
              >
                {entry.year}
              </h2>
              {entry.title && (
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    opacity: 0.9,
                    marginBottom: "1rem",
                  }}
                >
                  {entry.title}
                </h3>
              )}
            </div>

            {/* Content */}
            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              {entry.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

