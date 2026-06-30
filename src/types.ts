export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  role: string;
  metrics?: string[];
  link?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface ResumeData {
  name: string;
  titles: string[];
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: EducationItem[];
  traits: string[];
  availability: {
    types: string[];
    scope: string;
  };
  languages: string[];
}
