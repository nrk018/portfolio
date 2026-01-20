"use client";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import VSCodeLayout from "@/components/VSCodeLayout";
import { useEffect, useState, use } from "react";
import { projectsConfig, ProjectStructure } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";
import { Folder, FileCode } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

// Helper function to render project structure recursively for mobile
function renderMobileStructure(structure: ProjectStructure[], isDark: boolean, level: number = 0) {
  return structure.map((item, index) => {
    const isFolder = item.type === "folder";
    const indent = level * 1.5;
    
    return (
      <div key={index} style={{ marginBottom: "2rem" }}>
        {/* Folder/File Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
          paddingLeft: `${indent}rem`,
        }}>
          {isFolder ? (
            <Folder size={18} color={isDark ? "#569cd6" : "#0078d4"} />
          ) : (
            <FileCode size={18} color={isDark ? "#4ec9b0" : "#267f99"} />
          )}
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            textTransform: "capitalize",
            color: isDark ? "#cccccc" : "#333333",
            margin: 0,
          }}>
            {item.name}
          </h3>
        </div>

        {/* Content */}
        {item.content && (
          <div style={{
            paddingLeft: `${indent + 1.5}rem`,
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
            borderRadius: "4px",
            borderLeft: `3px solid ${isDark ? "#569cd6" : "#0078d4"}`,
          }}>
            <pre style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: isDark ? "#cccccc" : "#333333",
              whiteSpace: "pre-wrap",
              fontFamily: "'Consolas', 'Monaco', monospace",
              margin: 0,
            }}>
              {item.content}
            </pre>
          </div>
        )}

        {/* Tech Stack */}
        {item.techStack && item.techStack.length > 0 && (
          <div style={{
            paddingLeft: `${indent + 1.5}rem`,
            marginBottom: "1rem",
          }}>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}>
              {item.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  style={{
                    padding: "0.375rem 0.75rem",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    color: isDark ? "#cccccc" : "#333333",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recursively render children */}
        {isFolder && item.children && item.children.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            {renderMobileStructure(item.children, isDark, level + 1)}
          </div>
        )}
      </div>
    );
  });
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = use(params);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Get project config or use defaults
  const projectConfig = projectsConfig[slug] || {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: "Project description",
    structure: [
      {
        name: "frontend",
        type: "folder" as const,
        children: [
          {
            name: "components",
            type: "file" as const,
            content: `Project structure for ${slug}.

Add your project structure in data/projects.ts file.

This is a default structure. To customize:
1. Open data/projects.ts
2. Add your project configuration with slug: "${slug}"
3. Define your folder/file structure with content and tech stack`,
            techStack: ["Add", "Your", "Tech", "Stack"],
          },
        ],
      },
    ],
  };

  const title = projectConfig.title;
  const projectStructure = projectConfig.structure;

  if (isMobile) {
    // Mobile view with project content
    return (
      <>
        <Navigation />
        <main style={{
          minHeight: "100vh",
          padding: "6rem 1.5rem 4rem",
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          color: isDark ? "#cccccc" : "#333333",
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <Link href="/projects" style={{
            fontSize: "0.875rem",
            textDecoration: "none",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"}`,
            paddingBottom: "2px",
            marginBottom: "2rem",
            display: "inline-block",
            color: isDark ? "#cccccc" : "#333333",
            transition: "color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            ← Back to Projects
          </Link>
          
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: isDark ? "#ffffff" : "#000000",
          }}>
            {title}
          </h1>

          {projectConfig.description && (
            <p style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              opacity: 0.8,
              marginBottom: "3rem",
              color: isDark ? "#cccccc" : "#666666",
            }}>
              {projectConfig.description}
            </p>
          )}

          <div style={{
            marginTop: "2rem",
          }}>
            {renderMobileStructure(projectStructure, isDark)}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <VSCodeLayout
        projectName={title}
        structure={projectStructure}
        projectDescription={projectConfig.description}
        liveUrl={projectConfig.liveUrl}
        githubUrl={projectConfig.githubUrl}
        isPrivateRepo={projectConfig.isPrivateRepo}
        defaultContent={`Welcome to ${title} project explorer.

${projectConfig.description || "Click on any folder or file in the explorer to view its details and tech stack."}`}
      />
    </>
  );
}
