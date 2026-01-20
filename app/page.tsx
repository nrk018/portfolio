"use client";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import { useEffect, useState } from "react";

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

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <Navigation />
      <Hero 
        name="nirmal rajkumar modaliyar"
        subtitle="ಬೆಂಗಳೂರು ಹುಡುಗ.

Currently studying at MIT Jaipur and interning at Insolare Pvt. Ltd.

Always building. Always curious."
        ctaText="View Projects →"
        ctaLink="/projects"
      />

      <BentoGrid />
    </>
  );
}
