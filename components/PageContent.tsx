"use client";
import { useEffect, useState, useRef, ReactNode, Children } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useNavigation } from "./NavigationProvider";

interface PageContentProps {
  children: ReactNode;
  staggerDelay?: number;
}

export default function PageContent({ children, staggerDelay = 0.08 }: PageContentProps) {
  const { hasJustLoaded, isLoading } = useNavigation();
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasAnimatedRef = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    // Reset when pathname changes
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      hasAnimatedRef.current = false;
      setShouldAnimate(false);
    }

    // Start animation when page has just loaded (after loader completes)
    if (hasJustLoaded && !hasAnimatedRef.current && !isLoading) {
      hasAnimatedRef.current = true;
      // Small delay to ensure content is rendered and loader is gone
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      }, 150);

      return () => clearTimeout(timer);
    } else if (isLoading) {
      // Reset animation state when new page starts loading
      hasAnimatedRef.current = false;
      setShouldAnimate(false);
    }
  }, [hasJustLoaded, isLoading, pathname]);

  // Convert children to array and filter out null/undefined
  const childrenArray = Children.toArray(children).filter(Boolean);

  return (
    <>
      {childrenArray.map((child, index) => {
        // For first render without loader, show immediately
        const shouldShow = shouldAnimate || (!hasJustLoaded && !isLoading);

        return (
          <motion.div
            key={`content-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: shouldShow ? index * staggerDelay : 0,
              ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth 164Hz
              type: "spring",
              stiffness: 120,
              damping: 25,
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
    </>
  );
}

