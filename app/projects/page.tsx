"use client";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { projectsConfig, ProjectStructure } from "@/data/projects";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

// Helper function to extract all tech stacks from project structure recursively
function extractTechStacks(structure: ProjectStructure[]): string[] {
  const techStacks: string[] = [];
  
  function traverse(items: ProjectStructure[]) {
    items.forEach((item) => {
      if (item.techStack) {
        techStacks.push(...item.techStack);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  }
  
  traverse(structure);
  
  // Remove duplicates and return unique tech stacks
  return Array.from(new Set(techStacks));
}

// Convert projectsConfig to array format for display
function getProjectsList() {
  return Object.entries(projectsConfig).map(([slug, config]) => ({
    id: slug,
    title: config.title,
    description: config.description || "",
    tools: extractTechStacks(config.structure),
    link: `/projects/${slug}`,
    type: config.type || "individual",
    domain: config.domain || "webdev",
  }));
}

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [typeFilter, setTypeFilter] = useState<"all" | "project" | "individual">("all");
  const [domainFilter, setDomainFilter] = useState<"all" | "webdev" | "web3" | "ai/ml">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const allProjects = getProjectsList();
  
  // Filter projects based on selected filters and search query
  const filteredProjects = allProjects.filter((project) => {
    const matchesType = typeFilter === "all" || project.type === typeFilter;
    const matchesDomain = domainFilter === "all" || project.domain === domainFilter;
    
    // Search filter
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesDomain && matchesSearch;
  });
  return (
    <>
      <Navigation />
      <main style={{
        minHeight: "100vh",
        padding: "8rem 3rem 6rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "2rem",
          color: isDark ? "#ffffff" : "#000000",
        }}>
          Projects
        </h1>

        {/* Filters */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "3rem",
          paddingBottom: "2rem",
          borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: "block",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
              color: isDark ? "#cccccc" : "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}>
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, description, or tech stack..."
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                color: isDark ? "#fff" : "#000",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            {/* Type Filter */}
          <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
            <label style={{
              display: "block",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
              color: isDark ? "#cccccc" : "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}>
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "all" | "project" | "individual")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                color: isDark ? "#fff" : "#000",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4L6 8L10 4' stroke='${isDark ? 'white' : 'black'}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                paddingRight: "2.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
              }}
            >
              <option value="all">All</option>
              <option value="project">Project</option>
              <option value="individual">Individual</option>
            </select>
          </div>

          {/* Domain Filter */}
          <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
            <label style={{
              display: "block",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
              color: isDark ? "#cccccc" : "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}>
              Domain
            </label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value as "all" | "webdev" | "web3" | "ai/ml")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                color: isDark ? "#fff" : "#000",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4L6 8L10 4' stroke='${isDark ? 'white' : 'black'}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                paddingRight: "2.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
              }}
            >
              <option value="all">All</option>
              <option value="webdev">Webdev</option>
              <option value="web3">Web3</option>
              <option value="ai/ml">AI/ML</option>
            </select>
          </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5rem",
        }}>
          {filteredProjects.length === 0 ? (
            <div style={{
              padding: "3rem",
              textAlign: "center",
              color: isDark ? "#999999" : "#666666",
            }}>
              No projects found matching the selected filters.
            </div>
          ) : (
            filteredProjects.map((project) => (
            <div key={project.id} style={{
              marginBottom: "1rem",
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: isDark ? "#ffffff" : "#000000",
              }}>
                {project.title}
              </h2>
              <p style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "1rem",
                maxWidth: "600px",
                color: isDark ? "#cccccc" : "#666666",
              }}>
                {project.description}
              </p>
              {project.tools.length > 0 && (
                <ul style={{
                  listStyle: "none",
                  marginLeft: 0,
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                  lineHeight: 2,
                  padding: 0,
                }}>
                  {project.tools.slice(0, 8).map((tool, index) => (
                    <li key={index} style={{
                      display: "inline",
                      marginRight: "1.5rem",
                      color: isDark ? "#999999" : "#666666",
                    }}>
                      {tool}
                    </li>
                  ))}
                  {project.tools.length > 8 && (
                    <li style={{
                      display: "inline",
                      color: isDark ? "#666666" : "#999999",
                      fontStyle: "italic",
                    }}>
                      +{project.tools.length - 8} more
                    </li>
                  )}
                </ul>
              )}
              <Link href={project.link} style={{
                fontSize: "0.875rem",
                textDecoration: "none",
                borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"}`,
                paddingBottom: "2px",
                color: isDark ? "#cccccc" : "#333333",
                transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                Open Application →
              </Link>
            </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

