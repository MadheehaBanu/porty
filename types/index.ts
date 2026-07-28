export interface Project {
  id: number;
  number: string;
  name: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

export interface TimelineEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface SkillCategory {
  label: string;
  key: string;
  skills: { name: string; level: number }[];
}
