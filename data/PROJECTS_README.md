This guide explains how to add or update project configurations for the VS Code terminal interface.

All project configurations are stored in `/data/projects.ts`

## Project Structure

Each project needs a unique slug (URL identifier) that matches the project's route. For example:
- URL: `/projects/my-awesome-project` → Slug: `"my-awesome-project"`

## Adding a New Project

1. Open `/data/projects.ts`
2. Add a new entry to the `projectsConfig` object:

```typescript
export const projectsConfig: Record<string, ProjectConfig> = {
  // ... existing projects ...
  
  "your-project-slug": {
    title: "Your Project Title",
    description: "A brief description of your project",
    structure: [
      // Your folder/file structure here
    ],
  },
};
```

## Project Configuration Structure

### Basic Structure

```typescript
{
  title: string;              // Display name of the project
  description?: string;       // Optional project description
  structure: ProjectStructure[];  // Array of folders/files
  liveUrl?: string;           // Optional: URL to the live application (for iframe embed)
  githubUrl?: string;         // Optional: GitHub repository URL
  isPrivateRepo?: boolean;    // Optional: Set to true if the repository is private
}
```

### Folder/File Structure

Each item in the `structure` array can be either a **folder** or a **file**:

#### Folder Example

```typescript
{
  name: "frontend",           // Folder name
  type: "folder",
  children: [                 // Array of files/folders inside
    {
      name: "components",
      type: "file",
      content: "Your explanation here...",
      techStack: ["React", "TypeScript", "Next.js"]
    }
  ]
}
```

#### File Example

```typescript
{
  name: "api.ts",             // File name
  type: "file",
  content: `Detailed explanation of this file/component:

  - What it does
  - Technologies used
  - Key features
  - Architecture decisions`,
  techStack: ["Node.js", "Express", "TypeScript"]
}
```

## Complete Example

```typescript
"e-commerce-platform": {
  title: "E-Commerce Platform",
  description: "A full-stack e-commerce solution with React frontend and Node.js backend",
  liveUrl: "https://my-ecommerce-app.vercel.app", // Live application URL
  githubUrl: "https://github.com/username/ecommerce-platform", // GitHub repo URL
  isPrivateRepo: false, // Set to true if private
  structure: [
    {
      name: "frontend",
      type: "folder",
      children: [
        {
          name: "components",
          type: "file",
          content: `Frontend Components:

Built with React and TypeScript for type safety.
- Reusable UI components
- State management with Redux
- Responsive design with Tailwind CSS`,
          techStack: ["React", "TypeScript", "Redux", "Tailwind CSS"]
        },
        {
          name: "pages",
          type: "file",
          content: `Page Components:
- Home page
- Product listing
- Cart and checkout
- User dashboard`,
          techStack: ["React", "Next.js"]
        }
      ]
    },
    {
      name: "backend",
      type: "folder",
      children: [
        {
          name: "api",
          type: "file",
          content: `RESTful API Endpoints:

- User authentication
- Product CRUD operations
- Order processing
- Payment integration`,
          techStack: ["Node.js", "Express", "MongoDB"]
        }
      ]
    }
  ]
}
```

## Content Guidelines

### Content Field
- Use markdown-style formatting (though it renders as plain text)
- Explain what the section does
- List key technologies and why they were chosen
- Include architecture decisions if relevant
- Keep it concise but informative

### Tech Stack Field
- Array of technology names (strings)
- Use common names (e.g., "React", not "reactjs")
- Capitalize appropriately
- List 3-8 technologies per file

## Updating Existing Projects

Simply find the project by its slug in `projectsConfig` and modify:
- `title` - Change the display name
- `description` - Update the project description
- `structure` - Add/remove/modify folders and files
- `content` - Update explanations for any file
- `techStack` - Update technology lists
- `liveUrl` - Update the live application URL (shown in iframe)
- `githubUrl` - Update the GitHub repository URL
- `isPrivateRepo` - Set to `true` if the repository is private (will show "Private Repo" message)

## Live Preview & Links

### Live Application Embed
- Add `liveUrl` to embed your live application in an iframe
- The iframe will appear in the right panel below the tech stack
- If no `liveUrl` is provided, a placeholder message will be shown

### Action Buttons
- **Visit Project** button (left): Opens the live application in a new tab (only shown if `liveUrl` is provided)
- **Visit Repo** button (right): Opens the GitHub repository in a new tab
  - If `isPrivateRepo: true`, clicking will show a "Private Repo" message instead
  - The button text will automatically change to "Private Repo" when `isPrivateRepo` is true

## Tips

1. **Naming**: Use kebab-case for slugs (e.g., `"my-project"` not `"myProject"`)
2. **Organization**: Group related files into folders
3. **Consistency**: Keep a similar structure across projects for easy navigation
4. **Content**: Write explanations that help visitors understand your tech choices
5. **Tech Stack**: Only include technologies actually used in that specific section
6. **Live URLs**: Ensure your live application allows embedding (check X-Frame-Options headers)
7. **Private Repos**: Set `isPrivateRepo: true` to prevent users from clicking the repo button

## Default Fallback

If a project slug doesn't exist in `projectsConfig`, the system will:
- Generate a title from the slug
- Show a default structure with instructions
- Display a message prompting you to add the project configuration

