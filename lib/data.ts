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
  email: "madheehabanu786@gmail.com",
  github: "https://github.com/MadheehaBanu",
  linkedin: "https://www.linkedin.com/in/madheeha-banu/",
  location: "Sri Lanka",
  phone: "+94 76 365 9302",
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
    name: "Video Summarizer",
    description:
      "A web app for uploading/downloading and generating AI summaries of videos — React + Vite frontend with a TypeScript codebase and an Express/Mongo backend that performs video processing and calls OpenAI.",
    stack: ["Vite + React", "TypeScript", "Tailwind CSS", "Radix UI", "Express", "MongoDB", "OpenAI API", "FFmpeg", "AWS S3"],
    liveUrl: "#",
    githubUrl: "https://github.com/MadheehaBanu/video_summarizer",
    color: "#06b6d4",
    image: "/images/video_sum.png",
  },
  {
    id: 3,
    number: "03",
    name: "DevBlog",
    description:
      "A complete, modern blog CMS built with FastAPI, HTMX, Alpine.js and Tailwind CSS — featuring async SQLite, JWT auth, Jinja2 templating, and zero JS-framework dynamic interactions.",
    stack: ["FastAPI", "HTMX", "Alpine.js", "Tailwind CSS", "SQLAlchemy", "Jinja2", "Pydantic v2", "Alembic", "JWT"],
    liveUrl: "#",
    githubUrl: "https://github.com/MadheehaBanu/DevBlog",
    color: "#8b5cf6",
  },
  {
    id: 4,
    number: "04",
    name: "Invoice Management System",
    description:
      "A fully functional admin-only invoice management web app built with PHP & MySQL — featuring secure login, full CRUD invoices, auto-calculation of subtotal/tax/total, PDF download, and auto invoice numbering (INV-001, INV-002…).",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/MadheehaBanu/Invoice-Management-System",
    color: "#f59e0b",
  },
  {
    id: 5,
    number: "05",
    name: "AdminCore",
    description:
      "An enterprise-grade admin dashboard with real-time data visualization, user management, and comprehensive analytics.",
    stack: ["Angular 17", "Angular Material", "NgRx", "ApexCharts", "SCSS"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#8b5cf6",
  },
  {
    id: 6,
    number: "06",
    name: "InkFlow",
    description:
      "A full-stack blog content management system with HTMX-powered interactions, markdown editing, and admin panel.",
    stack: ["FastAPI", "Python", "HTMX", "SQLAlchemy", "Jinja2"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#06b6d4",
  },
  {
    id: 7,
    number: "07",
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
    location: "Remote",
    icon: "briefcase",
    description: [
      "Building scalable web applications using modern frameworks",
      "Collaborating with cross-functional teams on product features",
      "Implementing responsive UI components and REST API integrations",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Git"],
  },
  {
    id: 2,
    role: "Full Stack Developer – Intern",
    company: "ONCODETECHSOLUTION (PVT) LTD",
    period: "Jun 2025 – Dec 2025",
    location: "Remote",
    icon: "briefcase",
    description: [
      "Designed and developed responsive full-stack web applications using React.js, HTML, CSS, JavaScript, and PHP, integrating Node.js backend services with SQL and Firebase for secure authentication and efficient data management.",
      "Participated in end-to-end development lifecycle including feature implementation, backend integration, and manual testing to ensure system reliability and performance.",
    ],
    tech: ["React.js", "HTML", "CSS", "JavaScript", "PHP", "Node.js", "SQL", "Firebase"],
  },
  {
    id: 3,
    role: "BICT (Hons) Student",
    company: "University of Vavuniya",
    period: "2022 – 2026",
    location: "On-site",
    icon: "book",
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
      { name: "React.js", level: 88 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Next.js", level: 82 },
    ],
  },
  {
    label: "Backend",
    key: "backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "PHP", level: 78 },
      { name: "FastAPI", level: 75 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    label: "Database",
    key: "database",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Firebase", level: 75 },
      { name: "SQLite", level: 80 },
    ],
  },
  {
    label: "Languages",
    key: "languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Java", level: 82 },
      { name: "C++", level: 78 },
      { name: "C", level: 75 },
      { name: "C#", level: 72 },
      { name: "PHP", level: 78 },
    ],
  },
  {
    label: "Tools",
    key: "tools",
    skills: [
      { name: "Git", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Visual Studio", level: 80 },
      { name: "GitHub", level: 85 },
    ],
  },
];

export const terminalCode = `const madheeha = {
  frontend: ["React.js", "HTML", "CSS", "JavaScript", "Next.js"],
  backend:  ["Node.js", "PHP", "FastAPI", "REST API"],
  databases:["MySQL", "PostgreSQL", "Firebase", "SQLite"],
  languages:["JavaScript", "Java", "C++", "C", "C#", "PHP"],
  tools:    ["Git", "GitHub", "VS Code", "Visual Studio"],
  passion:  "Crafting digital experiences that matter ✨",
};`;
