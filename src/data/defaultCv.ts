import { ResumeData } from '../types/cv';

export const DEFAULT_BLANK_CV: ResumeData = {
  id: 'new-draft',
  title: 'My Professional Resume',
  industry: 'Technology',
  personalInfo: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Product Specialist',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.portfolio.example',
  },
  summary: 'Motivated and results-driven professional with 5+ years of experience delivering high-impact solutions, collaborating across cross-functional teams, and optimizing operational workflows. Recognized for strong analytical skills and clear stakeholder communication.',
  experience: [
    {
      id: 'exp-init-1',
      jobTitle: 'Senior Specialist',
      company: 'Acme Global Innovations',
      location: 'San Francisco, CA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: '• Spearheaded key initiatives improving team delivery timelines by 25%.\n• Managed communication across 4 internal stakeholders and client accounts.\n• Mentored 3 incoming team associates on operational best practices.',
    },
    {
      id: 'exp-init-2',
      jobTitle: 'Associate Specialist',
      company: 'Horizon Enterprises',
      location: 'Austin, TX',
      startDate: '2019-01',
      endDate: '2021-05',
      current: false,
      description: '• Supported cross-functional product rollout for enterprise client accounts.\n• Authored standard operating documentation and reduced customer onboarding time.',
    },
  ],
  education: [
    {
      id: 'edu-init-1',
      degree: 'B.A. in Business Administration',
      school: 'State University',
      location: 'Austin, TX',
      startDate: '2015-09',
      endDate: '2019-05',
      current: false,
      description: 'Dean\'s Honor Roll. Graduated with Honors.',
    },
  ],
  skills: [
    { id: 's-1', name: 'Strategic Planning', level: 'Expert' },
    { id: 's-2', name: 'Data Analysis', level: 'Advanced' },
    { id: 's-3', name: 'Project Management', level: 'Expert' },
    { id: 's-4', name: 'Cross-Functional Leadership', level: 'Expert' },
    { id: 's-5', name: 'Client Presentation', level: 'Advanced' },
  ],
  certifications: [
    { id: 'c-1', name: 'Project Management Professional (PMP)', issuer: 'PMI', date: '2022-05' },
  ],
  projects: [
    {
      id: 'p-1',
      title: 'Customer Onboarding Redesign',
      role: 'Project Lead',
      description: 'Streamlined multi-step customer kickoff workflow, increasing client satisfaction by 20%.',
    },
  ],
  themeConfig: {
    template: 'modern',
    accentColor: '#4f46e5',
    font: 'sans',
    spacing: 'normal',
  },
  updatedAt: Date.now(),
};
