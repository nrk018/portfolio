"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronDown, 
  FileCode, 
  Folder,
  Terminal,
  Code2,
  Github,
  ExternalLink
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ProjectStructure {
  name: string;
  type: "folder" | "file";
  children?: ProjectStructure[];
  content?: string;
  techStack?: string[];
}

interface VSCodeLayoutProps {
  projectName: string;
  structure: ProjectStructure[];
  defaultContent?: string;
  projectDescription?: string;
  liveUrl?: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
}

export default function VSCodeLayout({ projectName, structure, defaultContent, projectDescription, liveUrl, githubUrl, isPrivateRepo }: VSCodeLayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [terminalContent, setTerminalContent] = useState<string>("");
  const [showPrivateRepoMessage, setShowPrivateRepoMessage] = useState(false);
  
  // Resizable panel states
  const [leftPanelWidth, setLeftPanelWidth] = useState(250);
  const [rightPanelWidth, setRightPanelWidth] = useState(550);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  // Auto-expand first level folders
  useEffect(() => {
    const firstLevelFolders = structure
      .filter(item => item.type === "folder")
      .map(item => item.name);
    setExpandedFolders(new Set(firstLevelFolders));
  }, [structure]);

  const handleSectionClick = (section: ProjectStructure) => {
    if (section.type === "folder") {
      // Toggle folder expansion
      const newExpanded = new Set(expandedFolders);
      if (newExpanded.has(section.name)) {
        newExpanded.delete(section.name);
      } else {
        newExpanded.add(section.name);
      }
      setExpandedFolders(newExpanded);
    } else {
      // Select file/section
      setSelectedSection(section.name);
      setTerminalContent(section.content || `Stack explanation for ${section.name}...`);
    }
  };

  const getSelectedSection = (): ProjectStructure | null => {
    const findSection = (items: ProjectStructure[]): ProjectStructure | null => {
      for (const item of items) {
        if (item.name === selectedSection) return item;
        if (item.children) {
          const found = findSection(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findSection(structure);
  };

  const selectedSectionData = getSelectedSection();

  const renderStructure = (items: ProjectStructure[], level: number = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <div
          onClick={() => handleSectionClick(item)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 0.75rem",
            paddingLeft: `${0.75 + level * 1.5}rem`,
            cursor: "pointer",
            backgroundColor: selectedSection === item.name 
              ? (isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")
              : "transparent",
            borderLeft: selectedSection === item.name ? "2px solid currentColor" : "2px solid transparent",
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            fontSize: "0.875rem",
          }}
          onMouseEnter={(e) => {
            if (selectedSection !== item.name) {
              e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedSection !== item.name) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          {item.type === "folder" ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown size={16} style={{ marginRight: "0.5rem", flexShrink: 0 }} />
              ) : (
                <ChevronRight size={16} style={{ marginRight: "0.5rem", flexShrink: 0 }} />
              )}
              <Folder size={16} style={{ marginRight: "0.5rem", flexShrink: 0 }} />
            </>
          ) : (
            <FileCode size={16} style={{ marginRight: "1.5rem", flexShrink: 0, marginLeft: "0.5rem" }} />
          )}
          <span style={{ userSelect: "none" }}>{item.name}</span>
        </div>
        {item.type === "folder" && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderStructure(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const calculateNavbarHeight = () => {
      const nav = document.querySelector('nav.nav-theme');
      if (nav) {
        setNavbarHeight(nav.getBoundingClientRect().height);
      } else {
        setNavbarHeight(window.innerWidth < 768 ? 72 : 80);
      }
    };
    calculateNavbarHeight();
    window.addEventListener("resize", calculateNavbarHeight);
    return () => window.removeEventListener("resize", calculateNavbarHeight);
  }, []);

  // Resize handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 400) {
          setLeftPanelWidth(newWidth);
        }
      }
      if (isResizingRight) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 300 && newWidth <= 800) {
          setRightPanelWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizingLeft, isResizingRight]);

  return (
    <div style={{
      display: "flex",
      width: "100%",
      height: "calc(100vh)",
      paddingTop: `${navbarHeight}px`,
      backgroundColor: isDark ? "#000" : "#fff",
      color: isDark ? "#fff" : "#000",
      fontFamily: "var(--vscode-font, 'Consolas', 'Monaco', monospace)",
      overflow: "hidden",
      transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding-top 0.3s ease",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderTop: `2px solid ${isDark ? "#fff" : "#000"}`,
      boxShadow: isDark ? "0 -2px 4px rgba(255, 255, 255, 0.1)" : "0 -2px 4px rgba(0, 0, 0, 0.1)",
    }}>
      {/* Left Sidebar - File Explorer */}
      <div style={{
        width: `${leftPanelWidth}px`,
        height: "100%",
        backgroundColor: isDark ? "#000" : "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: isResizingLeft ? "none" : "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
      }}>
        <div style={{
          padding: "0.75rem 1rem",
          borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          borderRight: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600,
          opacity: 0.7,
        }}>
          EXPLORER
        </div>
        <div style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "0.5rem",
        }}>
          {renderStructure(structure)}
        </div>
      </div>

      {/* Resize Handle - Left */}
      <div
        onMouseDown={() => setIsResizingLeft(true)}
        style={{
          width: "4px",
          height: "100%",
          cursor: "col-resize",
          backgroundColor: "transparent",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          if (!isResizingLeft) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      />

      {/* Main Content Area */}
      <div style={{
        flex: "1 1 auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: "350px",
      }}>
        {/* Tabs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isDark ? "#000" : "#fff",
          borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          overflowX: "auto",
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "0 1rem",
        }}>
          <div style={{
            padding: "0.75rem 1rem",
            borderRight: `1px solid ${isDark ? "var(--vscode-border, #3e3e42)" : "var(--vscode-border, #d4d4d4)"}`,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            flexShrink: 0,
          }}>
            <Folder size={14} />
            {projectName}
          </div>
          {selectedSection && (
            <div style={{
              padding: "0.75rem 1rem",
              backgroundColor: isDark ? "#000" : "#fff",
              borderRight: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              flexShrink: 0,
            }}>
              <FileCode size={14} />
              {selectedSection}
            </div>
          )}
        </div>

        {/* Terminal Area */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDark ? "#000" : "#fff",
          padding: "1rem",
          overflow: "auto",
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.75rem",
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}>
            <Terminal size={16} />
            <span>TERMINAL</span>
          </div>
          <div style={{
            fontFamily: "var(--vscode-font, 'Consolas', 'Monaco', monospace)",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            color: isDark ? "#fff" : "#000",
          }}>
            {terminalContent || defaultContent || "Select a section from the explorer to view stack details..."}
          </div>
        </div>
      </div>

      {/* Resize Handle - Right */}
      <div
        onMouseDown={() => setIsResizingRight(true)}
        style={{
          width: "4px",
          height: "100%",
          cursor: "col-resize",
          backgroundColor: "transparent",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          if (!isResizingRight) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      />

      {/* Right Panel */}
      <div style={{
        width: `${rightPanelWidth}px`,
        height: "100%",
        backgroundColor: isDark ? "#000" : "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "0.75rem",
        overflowY: "auto",
        transition: isResizingRight ? "none" : "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
      }}>
        {/* Tech Stack Box */}
        <div style={{
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          borderRadius: "4px",
          padding: "0.75rem",
          backgroundColor: isDark ? "#000" : "#fff",
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            opacity: 0.9,
          }}>
            <Code2 size={16} />
            <span>Tech Stack</span>
          </div>
          {selectedSectionData && selectedSectionData.techStack ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}>
              {selectedSectionData.techStack.map((tech, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.5rem 0.75rem",
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "2px",
                    fontSize: "0.8125rem",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                    transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              fontSize: "0.8125rem",
              opacity: 0.5,
              fontStyle: "italic",
            }}>
              Select a section to view tech stack
            </div>
          )}
        </div>

        {/* Live Preview Box */}
        <div style={{
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          borderRadius: "4px",
          backgroundColor: isDark ? "#000" : "#fff",
          flex: "1 1 auto",
          minHeight: "450px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {liveUrl ? (
            <iframe
              src={liveUrl}
              style={{
                width: "100%",
                flex: 1,
                border: "none",
                borderRadius: "4px 4px 0 0",
                backgroundColor: "#ffffff",
              }}
              title={`Live preview of ${projectName}`}
              allow="fullscreen"
              loading="lazy"
            />
          ) : (
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}>
              <div style={{
                fontSize: "0.8125rem",
                opacity: 0.3,
                fontStyle: "italic",
                textAlign: "center",
              }}>
                No live preview available
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          gap: "0.75rem",
          flexDirection: "row",
          flexShrink: 0,
        }}>
          {/* Visit Project Button - Left */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                borderRadius: "4px",
                fontSize: "0.8125rem",
                color: isDark ? "#fff" : "#000",
                textDecoration: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
                fontWeight: 500,
                flex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
              }}
            >
              <ExternalLink size={16} />
              <span>Visit Project</span>
            </a>
          )}

          {/* Visit Repo Button - Right */}
          <button
            onClick={() => {
              if (isPrivateRepo) {
                setShowPrivateRepoMessage(true);
                setTimeout(() => setShowPrivateRepoMessage(false), 3000);
              } else if (githubUrl) {
                window.open(githubUrl, "_blank", "noopener,noreferrer");
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: isDark ? "var(--vscode-input-bg, #3c3c3c)" : "var(--vscode-input-bg, #e8e8e8)",
              border: `1px solid ${isDark ? "var(--vscode-border, #3e3e42)" : "var(--vscode-border, #d4d4d4)"}`,
              borderRadius: "4px",
              fontSize: "0.8125rem",
              color: isDark ? "var(--vscode-fg, #cccccc)" : "var(--vscode-fg, #333333)",
              cursor: "pointer",
              transition: "background-color 0.2s ease, border-color 0.2s ease",
              fontWeight: 500,
              fontFamily: "inherit",
              position: "relative",
              flex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "var(--vscode-list-hoverBackground, #2a2d2e)" : "var(--vscode-list-hoverBackground, #e0e0e0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "var(--vscode-input-bg, #3c3c3c)" : "var(--vscode-input-bg, #e8e8e8)";
            }}
          >
            <Github size={16} />
            <span>{isPrivateRepo ? "Private Repo" : "Visit Repo"}</span>
            {showPrivateRepoMessage && (
              <div style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: "0.5rem",
                padding: "0.5rem 0.75rem",
                backgroundColor: isDark ? "#000" : "#fff",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                borderRadius: "4px",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                animation: "fadeInOut 3s ease-in-out",
              }}>
                This repository is private
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

