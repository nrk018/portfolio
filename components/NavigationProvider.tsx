"use client";
import { useEffect, useState, useRef, ReactNode, createContext, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Component } from "@/components/ui/luma-spin";
import { useTheme } from "@/components/ThemeProvider";

interface NavigationContextType {
  isLoading: boolean;
  hasJustLoaded: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  hasJustLoaded: false,
});

export const useNavigation = () => useContext(NavigationContext);

export default function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [hasJustLoaded, setHasJustLoaded] = useState(false);
  const previousPathnameRef = useRef(pathname);
  const previousSearchParamsRef = useRef(searchParams.toString());
  const isLoadingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    // Intercept all Link clicks (including Next.js Link components)
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link) {
        const href = link.getAttribute('href');
        // Check if it's an internal link (starts with /) and not current page
        if (href && href.startsWith('/') && href !== pathname && !isLoadingRef.current) {
          // Show loader immediately on click
          isLoadingRef.current = true;
          setIsLoading(true);
        }
      }
    };

    // Add click listener to document (capture phase to catch early)
    document.addEventListener('click', handleLinkClick, true);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [pathname]);

  useEffect(() => {
    // Check if pathname or searchParams changed
    const pathChanged = previousPathnameRef.current !== pathname;
    const searchChanged = previousSearchParamsRef.current !== searchParams.toString();
    
    if (pathChanged || searchChanged) {
      if (isLoadingRef.current) {
        // Pathname changed after showing loader, hide it after a delay
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Use requestAnimationFrame for smooth 164Hz transitions
        requestAnimationFrame(() => {
          timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            isLoadingRef.current = false;
            setHasJustLoaded(true);
            previousPathnameRef.current = pathname;
            previousSearchParamsRef.current = searchParams.toString();
            
            // Reset hasJustLoaded after animation completes
            setTimeout(() => {
              setHasJustLoaded(false);
            }, 2000);
          }, 400);
        });
      } else {
        // Pathname changed but loader wasn't shown (e.g., direct navigation or browser back/forward)
        previousPathnameRef.current = pathname;
        previousSearchParamsRef.current = searchParams.toString();
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  return (
    <NavigationContext.Provider value={{ isLoading, hasJustLoaded }}>
      {children}
      {isLoading && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.98)" : "rgba(255, 255, 255, 0.98)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            pointerEvents: "auto",
            willChange: "opacity, transform, background-color",
            opacity: 1,
            transform: "translateZ(0)",
            transition: "opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }}
        >
          <div
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0) scale(1)",
              backfaceVisibility: "hidden",
              perspective: "1000px",
              isolation: "isolate",
            }}
          >
            <Component />
          </div>
        </div>
      )}
    </NavigationContext.Provider>
  );
}

