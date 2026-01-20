"use client";
import * as React from "react";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface HandwrittenTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  fontFamily?: string;
}

const HandwrittenText: React.FC<HandwrittenTextProps> = ({
  text,
  className = "",
  fontSize = "3rem",
  fontFamily = '"Architects Daughter", cursive',
}) => {
  const words = text.split(" ");
  const isFirstLoad = typeof window !== "undefined" && !sessionStorage.getItem("hasAnimated");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate variable delay for more natural handwriting feel
  const getLetterDelay = (index: number, char: string): number => {
    let delay = 0;
    
    // Spaces are faster
    if (char === ' ') {
      return 0.02;
    }
    
    // Vowels appear quicker
    if ('aeiou'.includes(char.toLowerCase())) {
      delay = 0.05 + Math.random() * 0.03;
    }
    // Complex letters take longer
    else if ('mrwxyz'.includes(char.toLowerCase())) {
      delay = 0.12 + Math.random() * 0.05;
    }
    // Other letters
    else {
      delay = 0.08 + Math.random() * 0.04;
    }
    
    // Occasional pauses (like pen lifting)
    if (index > 0 && index % 5 === 0) {
      delay += 0.1 + Math.random() * 0.05;
    }
    
    return delay;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      style={{
        fontSize,
        fontFamily,
        fontWeight: 700,
        marginBottom: "1.5rem",
        minHeight: "4rem",
        position: "relative",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        flexWrap: isMobile ? "nowrap" : "wrap",
        alignItems: "flex-start",
        letterSpacing: "0.02em",
        lineHeight: 1.2,
        gap: isMobile ? "0" : "0.5rem",
      }}
      variants={containerVariants}
      initial={isFirstLoad ? "hidden" : "visible"}
      animate="visible"
    >
      {words.map((word, wordIndex) => {
        const letters = word.split("");
        let letterIndexOffset = 0;
        // Calculate offset for letter index (sum of previous words' lengths)
        for (let i = 0; i < wordIndex; i++) {
          letterIndexOffset += words[i].length + 1; // +1 for space
        }

        return (
          <motion.span
            key={`word-${wordIndex}`}
            style={{
              display: isMobile ? "block" : "inline-block",
              marginBottom: isMobile && wordIndex < words.length - 1 ? "0.5rem" : "0",
              marginRight: !isMobile && wordIndex < words.length - 1 ? "0.5rem" : "0",
            }}
          >
            {letters.map((char, charIndex) => {
              const globalIndex = letterIndexOffset + charIndex;
              return (
                <motion.span
                  key={`${char}-${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  style={{
                    display: "inline-block",
                    transformOrigin: "center",
                  }}
                  transition={{
                    delay: isFirstLoad ? getLetterDelay(globalIndex, char) : 0,
                    type: "spring",
                    stiffness: 300 + Math.random() * 100,
                    damping: 20 + Math.random() * 10,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

export default HandwrittenText;

