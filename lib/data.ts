import type { Project, TimelineEntry, SkillCategory } from "@/types";

export const personalInfo = {
  name: "Madheeha Banu",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences that matter",
  bio: [
    "I'm a final-year BICT Honours student at University of Vavuniya, Sri Lanka, with a passion for building things that live on the internet.",
    "Currently working as a Full Stack Developer Intern, I spend my days crafting scalable web applications and my weekends diving into research.",
    "I believe in writing clean, efficient code and creating digital experiences that make a real difference. When I'm not coding, you'll find me exploring new technologies and pushing my creative boundaries.",
  ],
  email: "madheeha@email.com",
  github: "https://github.com/madheeha",
  linkedin: "https://linkedin.com/in/madheeha",
  location: "Sri Lanka",
  resumeUrl: "/resume.pdf",
};

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    name: "Wanderlust",
    description:
      "A premium adventure travel booking website with cinematic GSAP animations, interactive 3D globe, and immersive scroll experiences.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#6366f1",
  },
  {
    id: 2,
    number: "02",
    name: "ShopPulse",
    description:
      "A modern e-commerce product page with real-time cart management, dynamic filtering, and smooth micro-interactions.",
    stack: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Embla Carousel"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#06b6d4",
  },
  {
    id: 3,
    number: "03",
    name: "AdminCore",
    description:
      "An enterprise-grade admin dashboard with real-time data visualization, user management, and comprehensive analytics.",
    stack: ["Angular 17", "Angular Material", "NgRx", "ApexCharts", "SCSS"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#8b5cf6",
  },
  {
    id: 4,
    number: "04",
    name: "InkFlow",
    description:
      "A full-stack blog content management system with HTMX-powered interactions, markdown editing, and admin panel.",
    stack: ["FastAPI", "Python", "HTMX", "SQLAlchemy", "Jinja2"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#06b6d4",
  },
  {
    id: 5,
    number: "05",
    name: "Flavour House",
    description:
      "A sleek, animated restaurant landing page with smooth scroll animations, dark/light mode, and reservation system.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#6366f1",
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Tech Company",
    period: "2026 – Present",
    description: [
      "Building scalable web applications using modern frameworks",
      "Collaborating with cross-functional teams on product features",
      "Implementing responsive UI components and REST API integrations",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Git"],
  },
  {
    id: 2,
    role: "Academic Researcher",
    company: "University of Vavuniya",
    period: "2025 – Present",
    description: [
      "Conducting research in software engineering and web technologies",
      "Publishing findings and contributing to academic knowledge",
    ],
    tech: ["Python", "Data Analysis"],
  },
  {
    id: 3,
    role: "BICT (Hons) Student",
    company: "University of Vavuniya",
    period: "2022 – 2026",
    description: [
      "Specializing in software development and information technology",
      "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems",
    ],
    tech: ["Java", "C++", "SQL", "Web Dev"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    key: "frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Angular", level: 80 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    label: "Backend",
    key: "backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "FastAPI", level: 78 },
      { name: "REST API", level: 88 },
      { name: "GraphQL", level: 72 },
      { name: "PHP", level: 70 },
    ],
  },
  {
    label: "Database",
    key: "database",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 82 },
      { name: "SQLite", level: 85 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    label: "Languages",
    key: "languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "Java", level: 75 },
      { name: "C#", level: 70 },
    ],
  },
  {
    label: "Tools",
    key: "tools",
    skills: [
      { name: "Git", level: 88 },
      { name: "GSAP", level: 80 },
      { name: "Three.js", level: 72 },
      { name: "Framer Motion", level: 82 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export const terminalCode = `const madheeha = {
  frontend: ["React", "Next.js", "Angular", "TypeScript", "Tailwind"],
  backend:  ["Node.js", "FastAPI", "PHP", "GraphQL", "REST"],
  databases:["PostgreSQL", "MySQL", "SQLite"],
  languages:["JavaScript", "TypeScript", "Python", "Java", "C#", "C++"],
  tools:    ["Git", "GitHub", "VS Code", "GSAP", "Three.js"],
  passion:  "Crafting digital experiences that matter ✨",
};`;
