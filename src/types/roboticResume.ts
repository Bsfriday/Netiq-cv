import { ResumeData, CvTemplate, CvFont, CvFontSize } from './cv';

export type RoboticJobRole =
  | 'AI Data Annotator'
  | 'Data Labeling Specialist'
  | 'AI Trainer'
  | 'AI Response Evaluator'
  | 'AI Model Evaluator'
  | 'AI Quality Analyst'
  | 'Search Quality Rater'
  | 'Search Engine Evaluator'
  | 'Content Reviewer'
  | 'Content Moderator'
  | 'Data Analyst'
  | 'AI Research Assistant'
  | 'Prompt Specialist'
  | 'Prompt Engineer'
  | 'AI Operations Specialist'
  | 'AI Support Specialist'
  | 'Machine Learning Assistant'
  | 'Data Collection Specialist'
  | 'Transcription Specialist'
  | 'AI Safety Evaluator'
  | 'Trust & Safety Specialist'
  | 'Software Tester'
  | 'QA Tester'
  | 'Website Tester'
  | 'Application Tester'
  | 'UX Tester'
  | 'Cybersecurity Analyst'
  | 'IT Support Specialist'
  | 'Technical Support Specialist'
  | 'Remote Digital Specialist'
  | 'Virtual Assistant'
  | 'Customer Support Specialist'
  | 'Content Writer'
  | 'SEO Specialist'
  | 'Social Media Specialist'
  | 'Digital Marketing Specialist'
  | 'Graphic Designer'
  | 'Web Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'General Technology Professional'
  | string;

export type ExperienceLevel = 
  | 'Entry Level' 
  | 'Junior' 
  | 'Mid-Level' 
  | 'Senior' 
  | 'Expert' 
  | 'Career Changer';

export type WorkPreference = 
  | 'Remote' 
  | 'Hybrid' 
  | 'On-site' 
  | 'Flexible';

export type TargetIndustry =
  | 'Artificial Intelligence'
  | 'Technology'
  | 'Software'
  | 'Data'
  | 'Cybersecurity'
  | 'Digital Marketing'
  | 'E-commerce'
  | 'Finance'
  | 'Healthcare'
  | 'Education'
  | 'Media'
  | 'Customer Support'
  | 'Other';

export type SkillCategory =
  | 'Technical Skills'
  | 'AI Skills'
  | 'Data Skills'
  | 'Software Skills'
  | 'Soft Skills'
  | 'Industry Skills'
  | 'Tools & Platforms';

export interface RoboticSkill {
  id: string;
  name: string;
  category: SkillCategory | string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  isPrimary?: boolean;
}

export interface RoboticExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
  achievements?: string;
  toolsUsed?: string;
  enhancedBullets?: string[];
}

export interface RoboticEducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  graduationYear: string;
  location: string;
  current?: boolean;
  coursework?: string;
  achievements?: string;
}

export interface RoboticCertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface RoboticAdditionalInfo {
  languages?: { language: string; proficiency: string }[];
  projects?: { id: string; title: string; description: string; tech?: string; link?: string }[];
  volunteer?: { id: string; role: string; organization: string; description: string }[];
  awards?: { id: string; title: string; issuer: string; date: string }[];
  memberships?: { id: string; organization: string; role: string }[];
  interests?: string[];
}

export interface RoboticPersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  city?: string;
  region?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  website?: string;
}

export interface RoboticCareerTarget {
  targetRole: string;
  experienceLevel: ExperienceLevel;
  workPreference: WorkPreference;
  targetIndustry: TargetIndustry;
  customIndustry?: string;
}

export interface RoboticResumeDraft {
  id: string;
  versionName: string;
  personalInfo: RoboticPersonalInfo;
  careerTarget: RoboticCareerTarget;
  experience: RoboticExperienceItem[];
  skills: RoboticSkill[];
  education: RoboticEducationItem[];
  certifications: RoboticCertificationItem[];
  additionalInfo: RoboticAdditionalInfo;
  professionalSummary: string;
  selectedTemplate: CvTemplate;
  accentColor: string;
  selectedFont?: CvFont;
  fontSize?: CvFontSize;
  spacing?: 'compact' | 'normal' | 'spacious';
  wordingTone?: 'executive' | 'technical' | 'modern';
  targetJobDescription?: string;
  updatedAt: number;
}

export interface AtsScoreBreakdown {
  totalScore: number;
  status: 'Strong' | 'Moderate' | 'Needs Info';
  breakdown: {
    jobTitleMatch: number;
    keywordRelevance: number;
    summaryQuality: number;
    skillsAlignment: number;
    experienceQuality: number;
    formattingScore: number;
    completenessScore: number;
  };
  recommendations: string[];
}

export interface JobMatchResult {
  score: number;
  status: 'High Match' | 'Moderate Match' | 'Low Match';
  strongMatches: string[];
  potentialGaps: string[];
  extractedKeywords: string[];
  recommendations: string[];
}

export interface RoboticResumeVersion {
  id: string;
  name: string;
  targetRole: string;
  updatedAt: number;
  atsScore: number;
  resumeData: ResumeData;
  draftState: RoboticResumeDraft;
}
