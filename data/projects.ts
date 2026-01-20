// Project configurations for VS Code terminal interface
// Add your project structures here

export interface ProjectStructure {
  name: string;
  type: "folder" | "file";
  children?: ProjectStructure[];
  content?: string;
  techStack?: string[];
}

export interface ProjectConfig {
  title: string;
  description?: string;
  structure: ProjectStructure[];
  liveUrl?: string; // URL to the live application
  githubUrl?: string; // GitHub repository URL
  isPrivateRepo?: boolean; // Set to true if the repository is private
  type?: "project" | "individual"; // Group project or individual project
  domain?: "webdev" | "web3" | "ai/ml"; // Domain category
}

export const projectsConfig: Record<string, ProjectConfig> = {
  "002": {
    title: "Buildit for startups",
    description: "A comprehensive business roadmap platform that guides entrepreneurs through a proven 10-step process from initial idea to sustainable scaling. Built for entrepreneurs, by entrepreneurs.",
    liveUrl: "https://buildit-khaki.vercel.app/",
    githubUrl: "https://github.com/nrk018/buildit",
    isPrivateRepo: false,
    type: "individual",
    domain: "webdev",
    structure: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "pages",
            type: "file",
            content: `Next.js App Router Pages & Routes:

Home Page - Landing page with hero section, roadmap overview, and platform features
Pricing Page - Subscription plans and pricing information
Step Pages - Individual pages for each of the 10 roadmap steps:
  - Step 1: Idea - Define and validate business concept
  - Step 2: Market - Analyze target market and competition
  - Step 3: Business Model - Structure revenue and operations
  - Step 4: Team - Build and organize team structure
  - Step 5: MVP - Plan minimum viable product
  - Step 6: Legals - Handle legal requirements and compliance
  - Step 7: Funding - Secure investment and financial planning
  - Step 8: Strategy - Develop go-to-market strategy
  - Step 9: Scaling - Plan for growth and expansion
  - Step 10: Sustainability - Build sustainable business model

Architecture:
- Next.js App Router for file-based routing
- Dynamic routes for step-based navigation
- Server-side rendering for SEO optimization
- API routes for business logic and data processing
- Protected routes with authentication for premium features`,
            techStack: ["Next.js", "TypeScript", "React", "App Router", "SSR"],
          },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "ui",
            type: "file",
            content: `UI Components & Design System:

Reusable React components for the Buildit platform:
- Hero sections with CTA buttons
- Roadmap visualization components
- Step navigation cards and progress indicators
- Pricing cards and subscription UI
- Form components for business planning
- Progress tracking widgets
- Navigation and layout components
- Modal dialogs for user interactions

Component Features:
- TypeScript for type safety
- Responsive design for all screen sizes
- Accessible components with ARIA labels
- Smooth animations and transitions
- Theme-aware styling
- Modular, reusable component architecture`,
            techStack: ["React", "TypeScript", "CSS", "Tailwind CSS"],
          },
        ],
      },
      {
        name: "data",
        type: "folder",
        children: [
          {
            name: "roadmap",
            type: "file",
            content: `Roadmap Data & Business Logic:

Structured data for the 10-step business roadmap:
- Step definitions and descriptions
- Business planning templates
- Market analysis frameworks
- Financial planning structures
- Legal requirement checklists
- Team organization templates
- MVP planning guides
- Funding strategy templates
- Scaling frameworks
- Sustainability models

Data Structure:
- JSON-based configuration files
- Type-safe data schemas
- Modular step definitions
- Progress tracking data models
- User journey mapping
- Business validation logic`,
            techStack: ["TypeScript", "JSON", "Data Modeling"],
          },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          {
            name: "custom-hooks",
            type: "file",
            content: `Custom React Hooks:

Business logic and state management hooks:
- useRoadmap - Manages roadmap progress and navigation
- useBusinessPlan - Handles business planning data and validation
- useStepProgress - Tracks user progress through steps
- useAuth - Authentication and user session management
- usePricing - Subscription and pricing logic
- useFormValidation - Form validation for business inputs
- useAnalytics - Track user interactions and progress
- useLocalStorage - Persist user data and progress

Benefits:
- Reusable business logic
- Clean separation of concerns
- Easy testing and maintenance
- Type-safe hook interfaces`,
            techStack: ["React", "TypeScript", "Custom Hooks"],
          },
        ],
      },
      {
        name: "lib",
        type: "folder",
        children: [
          {
            name: "utilities",
            type: "file",
            content: `Utility Functions & Business Logic:

Core utilities and helper functions:
- Business validation algorithms
- Financial calculation utilities
- Market analysis helpers
- Progress tracking functions
- Data transformation utilities
- Form validation logic
- API client for backend communication
- Error handling and logging
- Local storage utilities
- Analytics helpers

Key Features:
- Type-safe utility functions
- Business logic encapsulation
- Reusable calculation methods
- Data sanitization and validation
- Error handling middleware`,
            techStack: ["TypeScript", "JavaScript", "Business Logic"],
          },
        ],
      },
      {
        name: "ai-integration",
        type: "folder",
        children: [
          {
            name: "cofounder",
            type: "file",
            content: `AI Cofounder Features:

AI-powered business assistance features:
- Problem identification using AI
- Business idea validation
- Market analysis suggestions
- Competitive analysis insights
- Business model recommendations
- Financial planning assistance
- Team structure recommendations
- Strategy development guidance

AI Capabilities:
- Gemini AI integration for business insights
- Natural language processing for user inputs
- Predictive analytics for business planning
- Automated market research
- Personalized recommendations
- Real-time business advice
- Context-aware suggestions`,
            techStack: ["Gemini AI", "NLP", "Machine Learning", "API Integration"],
          },
        ],
      },
      {
        name: "deployment",
        type: "folder",
        children: [
          {
            name: "vercel",
            type: "file",
            content: `Deployment & Infrastructure:

Vercel deployment configuration:
- Serverless functions for API routes
- Edge network for global CDN
- Automatic deployments from GitHub
- Environment variable management
- Performance monitoring and analytics
- SSL certificate management
- Preview deployments for testing

Deployment Features:
- Zero-downtime deployments
- Automatic scaling for traffic
- Preview deployments for PRs
- Production and staging environments
- CI/CD pipeline integration
- Performance optimization
- Error tracking and monitoring`,
            techStack: ["Vercel", "Serverless", "CDN", "CI/CD"],
          },
        ],
      },
    ],
  },
  "001": {
    title: "FLUXD",
    description: "A seamless lending platform that simplifies the entire loan process by allowing users to check eligibility, verify documents, get personalized offers, and receive instant loan sanctions securely — all in one place.",
    liveUrl: "https://fluxd-1vuw.vercel.app/",
    githubUrl: "https://github.com/nrk018/fluxd",
    isPrivateRepo: false,
    type: "project",
    domain: "webdev",
    structure: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "pages",
            type: "file",
            content: `Next.js App Router Pages:

Eligibility Check Page - Users can quickly check loan eligibility using minimal personal and financial info
Verification Page - AI-based document verification for PAN, Aadhaar, and income proof
Offers Page - Personalized loan plans based on credit score, income, and spending patterns
Tracker Page - Real-time application tracking from submission to approval
Dashboard Page - Secure interface for EMI schedules, payment history, and upcoming dues

Architecture:
- Next.js App Router for file-based routing
- Server-side rendering for better performance
- API routes for backend integration
- Protected routes with authentication`,
            techStack: ["Next.js", "TypeScript", "React", "App Router"],
          },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "ui",
            type: "file",
            content: `UI Components:

Reusable React components for the FLUXD platform including:
- Eligibility calculator forms
- Document upload components with drag-and-drop
- Loan offer cards and comparison views
- Application tracker with progress indicators
- Dashboard widgets for EMI and payment history
- Navigation and layout components

Component Architecture:
- TypeScript for type safety
- Modular, reusable component design
- Responsive design for mobile and desktop
- Accessibility-first approach`,
            techStack: ["React", "TypeScript", "CSS", "Tailwind CSS"],
          },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          {
            name: "custom-hooks",
            type: "file",
            content: `Custom React Hooks:

Custom hooks for state management and business logic:
- useEligibility - Hook for eligibility calculation logic
- useDocumentVerification - Handles document upload and verification
- useLoanOffers - Fetches and manages personalized loan offers
- useApplicationTracker - Tracks loan application status
- useAuth - Authentication and user session management
- useDashboard - Dashboard data fetching and management

Benefits:
- Reusable logic across components
- Separation of concerns
- Easier testing and maintenance`,
            techStack: ["React", "TypeScript", "Custom Hooks"],
          },
        ],
      },
      {
        name: "lib",
        type: "folder",
        children: [
          {
            name: "utilities",
            type: "file",
            content: `Utility Functions & Libraries:

Core utilities and helper functions:
- API client for backend communication
- Document processing utilities (OCR integration)
- Credit score calculation algorithms
- Loan amount calculation logic
- Date formatting and EMI calculations
- Validation utilities for forms and documents
- Error handling and logging

Key Features:
- Type-safe API calls
- Error handling middleware
- Data transformation utilities
- Security helpers for sensitive data`,
            techStack: ["TypeScript", "Node.js", "API Client"],
          },
        ],
      },
      {
        name: "database",
        type: "folder",
        children: [
          {
            name: "sql",
            type: "file",
            content: `Database Schema & Queries:

SQL schemas and database structure:
- User authentication and profile tables
- Loan application tracking tables
- Document verification records
- Loan offers and eligibility data
- Payment history and EMI schedules
- Transaction logs

Database Features:
- Optimized queries for performance
- Indexed fields for fast lookups
- Secure data storage practices
- Backup and recovery procedures`,
            techStack: ["SQL", "PostgreSQL", "Database Design"],
          },
        ],
      },
      {
        name: "ai-integration",
        type: "folder",
        children: [
          {
            name: "document-verification",
            type: "file",
            content: `AI-Based Document Verification:

OCR and AI-powered document processing:
- PAN card verification using OCR
- Aadhaar card validation and extraction
- Income proof document analysis
- Automated data extraction from documents
- Fraud detection and validation
- Real-time verification status

AI Features:
- Optical Character Recognition (OCR)
- Machine learning models for validation
- Pattern recognition for document authenticity
- Automated data extraction and mapping`,
            techStack: ["OCR", "AI/ML", "Document Processing", "Computer Vision"],
          },
        ],
      },
      {
        name: "security",
        type: "folder",
        children: [
          {
            name: "authentication",
            type: "file",
            content: `Security & Authentication:

Secure authentication and data protection:
- JWT-based authentication system
- Encrypted data storage for sensitive information
- Secure document upload and storage
- API security with rate limiting
- Session management
- HTTPS encryption for all communications

Security Measures:
- End-to-end encryption for sensitive data
- Secure password hashing
- OAuth integration for third-party auth
- CSRF protection
- XSS prevention`,
            techStack: ["JWT", "Encryption", "OAuth", "Security"],
          },
        ],
      },
      {
        name: "deployment",
        type: "folder",
        children: [
          {
            name: "vercel",
            type: "file",
            content: `Deployment & Infrastructure:

Vercel deployment configuration:
- Serverless functions for API routes
- Edge network for global CDN
- Automatic deployments from GitHub
- Environment variable management
- Performance monitoring and analytics
- SSL certificate management

Deployment Features:
- Zero-downtime deployments
- Automatic scaling
- Preview deployments for PRs
- Production and staging environments`,
            techStack: ["Vercel", "Serverless", "CDN", "CI/CD"],
          },
        ],
      },
    ],
  },
};

