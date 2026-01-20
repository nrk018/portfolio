"use client";
import { useEffect, useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface StaggeredFadeInProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
}

export default function StaggeredFadeIn({ 
  children, 
  delay = 0,
  staggerDelay = 0.08 
}: StaggeredFadeInProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start animation after delay
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Extract direct children and map them
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={containerRef}>
      {childrenArray.map((child, index) => {
        if (!child || typeof child === 'string' || typeof child === 'number') {
          return child;
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: index * staggerDelay,
              ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth 164Hz
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            style={{
              willChange: "opacity, transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

