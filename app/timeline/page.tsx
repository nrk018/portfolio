"use client";
import Navigation from "@/components/Navigation";
import Timeline from "@/components/Timeline";

export default function TimelinePage() {
  const timelineEntries = [
    {
      year: "2019",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Started my journey in technology, exploring the fundamentals of web development and design.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Worked on initial projects that laid the foundation for my understanding of user experience and interface design.
          </p>
        </>
      ),
    },
    {
      year: "2020",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Deepened my skills in frontend development, focusing on React and modern JavaScript frameworks.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Collaborated on several projects that helped refine my approach to building scalable and maintainable applications.
          </p>
        </>
      ),
    },
    {
      year: "2021",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Expanded my expertise into full-stack development, working with Node.js and various backend technologies.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Began contributing to open-source projects and sharing knowledge through technical writing.
          </p>
        </>
      ),
    },
    {
      year: "2022",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Focused on building production-ready applications with emphasis on performance and accessibility.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Worked on complex projects that required advanced state management and API integration.
          </p>
        </>
      ),
    },
    {
      year: "2023",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Explored advanced animation techniques and began incorporating motion design into my projects.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Started working with Next.js and modern React patterns, focusing on server-side rendering and optimization.
          </p>
        </>
      ),
    },
    {
      year: "2024",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Continued to refine my skills in modern web development, working with TypeScript and advanced React patterns.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Explored new design systems and component libraries, focusing on creating reusable and maintainable code.
          </p>
        </>
      ),
    },
    {
      year: "2025",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Working on cutting-edge projects that push the boundaries of web development and user experience.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Continuously learning and adapting to new technologies, with a focus on building beautiful, performant, and accessible web experiences.
          </p>
          <p style={{ marginBottom: "1rem", opacity: 0.8 }}>
            (Through November 2025)
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh" }}>
        <Timeline entries={timelineEntries} />
      </main>
    </>
  );
}

