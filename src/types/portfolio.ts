export interface PersonalInfo {
  name: string;
  title: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // null for current position
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  endDate?: string;
}

export interface Skill {
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  name: string;
  proficiency: 'Elementary' | 'Limited working' | 'Professional working' | 'Full professional' | 'Native or bilingual';
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  lastUpdated: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: PortfolioData;
  error?: string;
} 