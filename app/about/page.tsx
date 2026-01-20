"use client";
import Navigation from "@/components/Navigation";
import { Card, CardTitle, CardDescription } from "@/components/ui/card-hover-effect";
import { techStackByCategory, TechStackItem, techStack } from "@/data/techStack";
import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DomainFilter = "all" | "webdev" | "ai" | "web3" | "other";

function DomainTab({
  label,
  isActive,
  onClick,
  isDark,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isDark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: isActive ? 600 : 400,
        border: "none",
        background: "transparent",
        color: isActive
          ? (isDark ? "#ffffff" : "#000000")
          : (isDark ? "#999999" : "#666666"),
        cursor: "pointer",
        borderBottom: isActive
          ? `2px solid ${isDark ? "#ffffff" : "#000000"}`
          : "2px solid transparent",
        transition: "all 0.2s ease",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = isDark ? "#cccccc" : "#333333";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = isDark ? "#999999" : "#666666";
        }
      }}
    >
      {label}
    </button>
  );
}

function TechStackGrid({ items, isDark }: { items: TechStackItem[]; isDark: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardItems = items.map((item) => ({
    title: item.title,
    description: item.description,
    link: "#",
    icon: item.icon,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {cardItems.map((item, idx) => {
        const isEmoji = item.icon.startsWith("http") === false;
        return (
          <a
            href={item.link}
            key={`${item.title}-${idx}`}
            className="relative group block p-2 h-full w-full"
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="relative z-50">
                {isEmoji ? (
                  <span style={{ fontSize: "1.5rem", lineHeight: 1, display: "block", marginBottom: "0.75rem" }}>{item.icon}</span>
                ) : (
                  <div style={{ width: "32px", height: "32px", position: "relative", marginBottom: "0.75rem" }}>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <CardTitle className="mt-0">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </Card>
          </a>
        );
      })}
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("all");

  const filteredItems =
    activeDomain === "all"
      ? techStack
      : techStack.filter((item) => item.category === activeDomain);

  return (
    <>
      <Navigation />
      <main style={{
        minHeight: "100vh",
        padding: "8rem 3rem 6rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "3rem",
          color: isDark ? "#ffffff" : "#000000",
        }}>
          About
        </h1>

        <section style={{
          marginBottom: "4rem",
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            color: isDark ? "#ffffff" : "#000000",
          }}>
            Story
          </h2>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
            color: isDark ? "#cccccc" : "#666666",
          }}>
            A brief narrative about who you are, where you come from, and what drives you. This should read like a quiet introduction — honest, measured, and clear.
          </p>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
            color: isDark ? "#cccccc" : "#666666",
          }}>
            Continue the story here, adding depth and context without excess. Each paragraph should breathe, with generous spacing between thoughts.
          </p>
        </section>

        <section style={{
          marginBottom: "4rem",
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            color: isDark ? "#ffffff" : "#000000",
          }}>
            Philosophy
          </h2>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
            color: isDark ? "#cccccc" : "#666666",
          }}>
            How you think and work. Your approach to design, development, or whatever your craft may be. This section should reflect your values and methods.
          </p>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
            color: isDark ? "#cccccc" : "#666666",
          }}>
            Add more detail about your process, your principles, and what matters to you in your work.
          </p>
        </section>

        <section>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            color: isDark ? "#ffffff" : "#000000",
          }}>
            Tech Stack & Skills
          </h2>

          {/* Submenu for domain filtering */}
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            paddingBottom: "1.5rem",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          }}>
            {[
              { key: "all" as DomainFilter, label: "All" },
              { key: "webdev" as DomainFilter, label: "Web Development" },
              { key: "ai" as DomainFilter, label: "AI/ML" },
              { key: "web3" as DomainFilter, label: "Web3" },
              { key: "other" as DomainFilter, label: "Other Skills" },
            ].map(({ key, label }) => (
              <DomainTab
                key={key}
                label={label}
                isActive={activeDomain === key}
                onClick={() => setActiveDomain(key)}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Tech Stack Cards with Hover Effect */}
          <TechStackGrid items={filteredItems} isDark={isDark} />
        </section>
      </main>
    </>
  );
}

