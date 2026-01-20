export interface TechStackItem {
  title: string;
  description: string;
  icon: string; // URL to icon or emoji/simple representation
  category: "webdev" | "ai" | "web3" | "other";
}

export const techStack: TechStackItem[] = [
  // Web Development
  {
    title: "React",
    description: "Building interactive user interfaces with component-based architecture",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    category: "webdev",
  },
  {
    title: "Next.js",
    description: "Full-stack React framework for production-ready applications",
    icon: "https://cdn.simpleicons.org/nextdotjs/000000",
    category: "webdev",
  },
  {
    title: "TypeScript",
    description: "Type-safe JavaScript for scalable and maintainable code",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    category: "webdev",
  },
  {
    title: "Node.js",
    description: "Server-side JavaScript runtime for building scalable applications",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
    category: "webdev",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    category: "webdev",
  },
  {
    title: "MongoDB",
    description: "NoSQL database for flexible and scalable data storage",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
    category: "webdev",
  },
  {
    title: "PostgreSQL",
    description: "Advanced open-source relational database system",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
    category: "webdev",
  },
  {
    title: "Express",
    description: "Minimal and flexible Node.js web application framework",
    icon: "https://cdn.simpleicons.org/express/000000",
    category: "webdev",
  },
  {
    title: "Framer Motion",
    description: "Production-ready motion library for React animations",
    icon: "https://cdn.simpleicons.org/framer/0055FF",
    category: "webdev",
  },
  {
    title: "Vercel",
    description: "Cloud platform for frontend developers and deployment",
    icon: "https://cdn.simpleicons.org/vercel/000000",
    category: "webdev",
  },
  {
    title: "Git",
    description: "Distributed version control system for tracking code changes",
    icon: "https://cdn.simpleicons.org/git/F05032",
    category: "webdev",
  },
  {
    title: "JavaScript",
    description: "Versatile programming language for web development",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    category: "webdev",
  },

  // AI/ML
  {
    title: "Python",
    description: "Programming language for AI, machine learning, and data science",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    category: "ai",
  },
  {
    title: "TensorFlow",
    description: "Open-source machine learning framework for building AI models",
    icon: "https://cdn.simpleicons.org/tensorflow/FF6F00",
    category: "ai",
  },
  {
    title: "PyTorch",
    description: "Deep learning framework for research and production",
    icon: "https://cdn.simpleicons.org/pytorch/EE4C2C",
    category: "ai",
  },
  {
    title: "OpenAI",
    description: "Working with GPT models and AI APIs for intelligent applications",
    icon: "https://cdn.simpleicons.org/openai/412991",
    category: "ai",
  },

  // Web3
  {
    title: "Solidity",
    description: "Programming language for writing smart contracts on Ethereum",
    icon: "https://cdn.simpleicons.org/solidity/363636",
    category: "web3",
  },
  {
    title: "Ethereum",
    description: "Blockchain platform for decentralized applications",
    icon: "https://cdn.simpleicons.org/ethereum/3C3C3D",
    category: "web3",
  },
  {
    title: "Web3.js",
    description: "JavaScript library for interacting with Ethereum blockchain",
    icon: "https://cdn.simpleicons.org/web3dotjs/F16822",
    category: "web3",
  },
  {
    title: "Hardhat",
    description: "Development environment for Ethereum software development",
    icon: "https://cdn.simpleicons.org/hardhat/FFF100",
    category: "web3",
  },

  // Other Skills
  {
    title: "Communication",
    description: "Effective verbal and written communication for collaboration",
    icon: "💬",
    category: "other",
  },
  {
    title: "Problem Solving",
    description: "Analytical thinking and creative solutions to complex challenges",
    icon: "🧩",
    category: "other",
  },
  {
    title: "Team Leadership",
    description: "Guiding and motivating teams to achieve project goals",
    icon: "👥",
    category: "other",
  },
  {
    title: "Project Management",
    description: "Planning, organizing, and executing projects efficiently",
    icon: "📋",
    category: "other",
  },
  {
    title: "Agile Methodology",
    description: "Iterative development approach for flexible project delivery",
    icon: "🔄",
    category: "other",
  },
];

export const techStackByCategory = {
  webdev: techStack.filter((item) => item.category === "webdev"),
  ai: techStack.filter((item) => item.category === "ai"),
  web3: techStack.filter((item) => item.category === "web3"),
  other: techStack.filter((item) => item.category === "other"),
};

