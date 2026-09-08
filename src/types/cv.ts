export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  country?: string;
  city?: string;
  region?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  description: string;
  technologies?: string;
  link?: string;
  githubUrl?: string;
}

export type CvTemplate = 
  | 'modern' 
  | 'classic' 
  | 'minimal' 
  | 'professional' 
  | 'executive' 
  | 'creative' 
  | 'compact'
  | 'technical';

export type CvFont = 'sans' | 'serif' | 'mono' | 'grotesk' | 'classic' | 'modern';

export type CvFontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ThemeConfig {
  template: CvTemplate;
  accentColor: string;
  font: CvFont;
  fontSize?: CvFontSize;
  spacing: 'compact' | 'normal' | 'spacious';
}

export interface DocumentAttachment {
  id: string;
  name: string;
  type?: string;
  dataUrl: string;
  fileSize?: string;
  uploadedAt: number;
}

export interface ResumeData {
  id: string;
  title: string;
  industry?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  documentImages?: DocumentAttachment[];
  themeConfig: ThemeConfig;
  updatedAt: number;
}

export type IndustryCategory = 
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Marketing'
  | 'Sales'
  | 'Design'
  | 'Project Management'
  | 'Cybersecurity'
  | 'Customer Support';
