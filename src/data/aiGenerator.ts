import { ResumeData, CvTemplate, SkillItem, ExperienceItem, EducationItem, ProjectItem, CertificationItem } from '../types/cv';
import { findCountryByName, getRandomCountry, ALL_COUNTRIES } from './countriesData';

export interface CountryOption {
  code: string;
  name: string;
  phonePrefix: string;
  cities: string[];
  universities: string[];
  companies: string[];
}

export const COUNTRIES: CountryOption[] = [
  {
    code: 'US',
    name: 'United States',
    phonePrefix: '+1 (555)',
    cities: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA'],
    universities: ['Stanford University', 'University of California, Berkeley', 'MIT', 'Columbia University', 'University of Texas at Austin', 'University of Washington'],
    companies: ['Apex Dynamics Inc.', 'Beacon Tech Solutions', 'Horizon Global', 'Pinnacle Systems', 'Vanguard Innovations']
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    phonePrefix: '+44 7700',
    cities: ['London', 'Manchester', 'Edinburgh', 'Bristol', 'Cambridge', 'Birmingham'],
    universities: ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'University of Manchester', 'University of Edinburgh'],
    companies: ['Albion Digital Ltd.', 'Crown & Sterling Partners', 'Thames Capital Group', 'Meridian Innovations UK', 'Vanguard British Enterprise']
  },
  {
    code: 'CA',
    name: 'Canada',
    phonePrefix: '+1 (416)',
    cities: ['Toronto, ON', 'Vancouver, BC', 'Montreal, QC', 'Ottawa, ON', 'Calgary, AB'],
    universities: ['University of Toronto', 'UBC (University of British Columbia)', 'McGill University', 'University of Waterloo', 'McMaster University'],
    companies: ['Maple Ridge Technologies', 'Nordic Horizon Capital', 'Frontier Digital Canada', 'St. Lawrence Solutions', 'Great Lakes Systems']
  },
  {
    code: 'AU',
    name: 'Australia',
    phonePrefix: '+61 4',
    cities: ['Sydney, NSW', 'Melbourne, VIC', 'Brisbane, QLD', 'Perth, WA', 'Canberra, ACT'],
    universities: ['University of Melbourne', 'University of Sydney', 'UNSW Sydney', 'Australian National University', 'Monash University'],
    companies: ['Southern Cross Innovations', 'Pacific Crest Operations', 'Harbour City Tech', 'Outback Systems Pty Ltd', 'Oasis Solutions Group']
  },
  {
    code: 'DE',
    name: 'Germany',
    phonePrefix: '+49 151',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Stuttgart', 'Cologne'],
    universities: ['Technical University of Munich (TUM)', 'LMU Munich', 'Heidelberg University', 'RWTH Aachen University', 'Humboldt University of Berlin'],
    companies: ['Bavaria Tech Group GmbH', 'Rheinland Dynamics', 'Hanseatic Solutions', 'Alpen Software AG', 'Vanguard Deutschland GmbH']
  },
  {
    code: 'FR',
    name: 'France',
    phonePrefix: '+33 6',
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nantes', 'Bordeaux'],
    universities: ['Sorbonne University', 'École Polytechnique', 'HEC Paris', 'Sciences Po', 'Université Paris-Saclay'],
    companies: ['Lumière Technologies SA', 'Hexagone Innovations', 'Seine Digital Partners', 'Rhône Capital Solutions', 'Azur Ventures Paris']
  },
  {
    code: 'IN',
    name: 'India',
    phonePrefix: '+91 98',
    cities: ['Bengaluru, Karnataka', 'Hyderabad, Telangana', 'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Delhi NCR', 'Chennai, Tamil Nadu'],
    universities: ['Indian Institute of Technology (IIT) Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'Indian Institute of Science (IISc)'],
    companies: ['Apex InfoTech Solutions', 'Paramount Digital Systems', 'Vertex Global Tech', 'Indus Wave Innovations', 'Zenith Enterprise Labs']
  },
  {
    code: 'SG',
    name: 'Singapore',
    phonePrefix: '+65 91',
    cities: ['Singapore City', 'Central Area, Singapore', 'Marina Bay, Singapore'],
    universities: ['National University of Singapore (NUS)', 'Nanyang Technological University (NTU)', 'Singapore Management University (SMU)'],
    companies: ['Marina Bay Global Tech', 'Lion City Innovations', 'Equatorial Digital Pte Ltd', 'Merlion Capital & Tech', 'Sentosa Solutions']
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    phonePrefix: '+971 50',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    universities: ['United Arab Emirates University', 'American University of Sharjah', 'Khalifa University', 'New York University Abu Dhabi'],
    companies: ['Emirates Apex Global', 'Gulf Horizon Ventures', 'Burj Digital Solutions', 'Falcon Tech Capital', 'Oasis Prime International']
  },
  {
    code: 'NL',
    name: 'Netherlands',
    phonePrefix: '+31 6',
    cities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'The Hague'],
    universities: ['Delft University of Technology (TU Delft)', 'University of Amsterdam', 'Utrecht University', 'Erasmus University Rotterdam'],
    companies: ['Oranje Dynamics BV', 'Amstel Digital Labs', 'Randstad Horizon Tech', 'Zuiderzee Solutions', 'Nordic Tulip Group']
  },
  {
    code: 'BR',
    name: 'Brazil',
    phonePrefix: '+55 11 9',
    cities: ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Florianópolis, SC'],
    universities: ['Universidade de São Paulo (USP)', 'Unicamp', 'UFRJ', 'PUC-SP', 'UFMG'],
    companies: ['Paulista Digital Tech', 'Carioca Solutions Ltda', 'Horizonte Brasil Ventures', 'Atlantica Software', 'Sul Inovações']
  },
  {
    code: 'ZA',
    name: 'South Africa',
    phonePrefix: '+27 82',
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
    universities: ['University of Cape Town', 'University of the Witwatersrand', 'Stellenbosch University', 'University of Pretoria'],
    companies: ['Table Mountain Tech', 'Savannah Digital Group', 'Protea Solutions Ltd', 'Cape Point Innovations', 'Highveld Systems']
  },
  {
    code: 'JP',
    name: 'Japan',
    phonePrefix: '+81 90',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Fukuoka'],
    universities: ['University of Tokyo', 'Kyoto University', 'Tokyo Institute of Technology', 'Waseda University', 'Keio University'],
    companies: ['Sunrise Digital Systems', 'Nippon Tech Dynamics', 'Fuji Horizon Corp', 'Sakura Enterprise Solutions', 'Kanto Global Labs']
  }
];

export interface AgeGroupOption {
  id: string;
  label: string;
  experienceYears: string;
  levelDesc: string;
}

export const AGE_GROUPS: AgeGroupOption[] = [
  {
    id: '18-22',
    label: '18 – 22 years (Entry Level / College & Early)',
    experienceYears: '0–2 years',
    levelDesc: 'Early career / foundational stage with emphasis on coursework, internships, and rapid adaptability.'
  },
  {
    id: '23-29',
    label: '23 – 29 years (Early-to-Mid Career Professional)',
    experienceYears: '2–6 years',
    levelDesc: 'Active professional with established hands-on execution skills and track record of delivering projects.'
  },
  {
    id: '30-39',
    label: '30 – 39 years (Mid-to-Senior Specialist / Lead)',
    experienceYears: '7–15 years',
    levelDesc: 'Proven senior practitioner with domain mastery, cross-functional leadership, and measurable business impact.'
  },
  {
    id: '40-49',
    label: '40 – 49 years (Senior Lead / Department Head / Manager)',
    experienceYears: '16–22 years',
    levelDesc: 'Seasoned leader driving strategic initiatives, team development, operational efficiency, and large budgets.'
  },
  {
    id: '50+',
    label: '50+ years (Executive / Director / Veteran Advisor)',
    experienceYears: '23+ years',
    levelDesc: 'Executive-level authority specializing in organizational transformation, governance, C-suite advisement, and industry impact.'
  }
];

export interface EmploymentStatusOption {
  id: string;
  label: string;
  description: string;
}

export const EMPLOYMENT_STATUSES: EmploymentStatusOption[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Currently enrolled in academic programs; highlights projects, coursework, leadership & campus achievements.'
  },
  {
    id: 'employed',
    label: 'Employed (Active Professional)',
    description: 'Currently working in the industry; highlights ongoing contributions, promotions, and organizational impact.'
  },
  {
    id: 'unemployed',
    label: 'Unemployed (Seeking New Opportunity / Career Break)',
    description: 'Actively transitioning or returning to workforce; emphasizes transferable skills, past achievements & upskilling.'
  },
  {
    id: 'recent_grad',
    label: 'Recent Graduate',
    description: 'Graduated within the last 1-2 years; highlights capstone projects, academic honors, and foundational mastery.'
  },
  {
    id: 'freelancer',
    label: 'Freelancer / Independent Consultant',
    description: 'Self-employed or contract-based; showcases client deliverables, versatile execution, and project ownership.'
  },
  {
    id: 'career_changer',
    label: 'Career Changer / Transitioning Field',
    description: 'Pivoting from another industry; highlights cross-disciplinary problem solving and recent re-skilling certifications.'
  }
];

export interface OccupationOption {
  id: string;
  title: string;
  category: string;
  defaultTemplate: CvTemplate;
  defaultAccent: string;
  skills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; category: string }[];
  certifications: { name: string; issuer: string }[];
  tools: string[];
}

export const POPULAR_OCCUPATIONS: OccupationOption[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#2563eb',
    skills: [
      { name: 'TypeScript & JavaScript', level: 'Expert', category: 'Programming' },
      { name: 'React / Next.js', level: 'Expert', category: 'Frontend' },
      { name: 'Node.js & Python', level: 'Advanced', category: 'Backend' },
      { name: 'REST & GraphQL APIs', level: 'Advanced', category: 'Architecture' },
      { name: 'PostgreSQL & Redis', level: 'Advanced', category: 'Databases' },
      { name: 'Docker & Kubernetes', level: 'Intermediate', category: 'DevOps' },
      { name: 'CI/CD & Git Workflow', level: 'Expert', category: 'Tools' },
      { name: 'System Design', level: 'Advanced', category: 'Architecture' }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
      { name: 'CKAD: Certified Kubernetes Application Developer', issuer: 'Cloud Native Computing Foundation' }
    ],
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Jest']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & AI Specialist',
    category: 'Technology',
    defaultTemplate: 'executive',
    defaultAccent: '#0f766e',
    skills: [
      { name: 'Python (NumPy, Pandas, PyTorch)', level: 'Expert', category: 'Data Science' },
      { name: 'Machine Learning & LLMs', level: 'Advanced', category: 'AI' },
      { name: 'SQL & Data Warehousing (BigQuery)', level: 'Expert', category: 'Databases' },
      { name: 'Statistical Modeling & A/B Testing', level: 'Expert', category: 'Analytics' },
      { name: 'Data Visualization (Tableau/D3)', level: 'Advanced', category: 'BI' },
      { name: 'Scikit-Learn & TensorFlow', level: 'Advanced', category: 'AI' },
      { name: 'Data Pipelines & Airflow', level: 'Intermediate', category: 'Data Eng' }
    ],
    certifications: [
      { name: 'Google Professional Data Engineer', issuer: 'Google Cloud' },
      { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI' }
    ],
    tools: ['Python', 'SQL', 'PyTorch', 'BigQuery', 'Tableau', 'Docker', 'Jupyter']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product & Business',
    defaultTemplate: 'professional',
    defaultAccent: '#1d4ed8',
    skills: [
      { name: 'Product Strategy & Roadmapping', level: 'Expert', category: 'Management' },
      { name: 'User Research & Personas', level: 'Advanced', category: 'Research' },
      { name: 'Agile / Scrum Methodologies', level: 'Expert', category: 'Agile' },
      { name: 'Data Analytics (Mixpanel, Amplitude)', level: 'Advanced', category: 'Analytics' },
      { name: 'Stakeholder Alignment', level: 'Expert', category: 'Communication' },
      { name: 'Go-To-Market (GTM) Strategy', level: 'Advanced', category: 'Strategy' },
      { name: 'A/B Testing & Conversion Rate Opt.', level: 'Advanced', category: 'Growth' }
    ],
    certifications: [
      { name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance' },
      { name: 'Product Management Certificate', issuer: 'Product School' }
    ],
    tools: ['Jira', 'Figma', 'Amplitude', 'Mixpanel', 'Notion', 'Confluence', 'SQL']
  },
  {
    id: 'nurse-healthcare',
    title: 'Registered Nurse / Healthcare Specialist',
    category: 'Healthcare',
    defaultTemplate: 'classic',
    defaultAccent: '#059669',
    skills: [
      { name: 'Clinical Patient Assessment', level: 'Expert', category: 'Clinical' },
      { name: 'Medication Administration', level: 'Expert', category: 'Clinical' },
      { name: 'Emergency & Acute Care Protocols', level: 'Advanced', category: 'Emergency' },
      { name: 'Electronic Health Records (Epic, Cerner)', level: 'Expert', category: 'Systems' },
      { name: 'Patient Advocacy & Family Education', level: 'Expert', category: 'Care' },
      { name: 'Infection Control & Safety Standards', level: 'Expert', category: 'Compliance' },
      { name: 'Interdisciplinary Team Collaboration', level: 'Expert', category: 'Communication' }
    ],
    certifications: [
      { name: 'Registered Nurse (RN) Licensure', issuer: 'State Board of Nursing' },
      { name: 'BLS & ACLS Certification', issuer: 'American Heart Association' }
    ],
    tools: ['Epic Systems', 'Cerner', 'Pyxis MedStation', 'Telemetry Monitors', 'Wound Care Suites']
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'Finance',
    defaultTemplate: 'classic',
    defaultAccent: '#0f172a',
    skills: [
      { name: 'Financial Modeling & DCF Valuation', level: 'Expert', category: 'Modeling' },
      { name: 'Variance Analysis & Budget Forecasting', level: 'Expert', category: 'Analysis' },
      { name: 'Advanced Excel & VBA Macros', level: 'Expert', category: 'Tools' },
      { name: 'Financial Statement Analysis (GAAP/IFRS)', level: 'Advanced', category: 'Accounting' },
      { name: 'Bloomberg Terminal & FactSet', level: 'Advanced', category: 'Platforms' },
      { name: 'Capital Allocation & ROI Analysis', level: 'Advanced', category: 'Strategy' },
      { name: 'Power BI & Executive Reporting', level: 'Intermediate', category: 'BI' }
    ],
    certifications: [
      { name: 'Chartered Financial Analyst (CFA) Candidate', issuer: 'CFA Institute' },
      { name: 'Financial Modeling & Valuation Analyst (FMVA)', issuer: 'CFI' }
    ],
    tools: ['Excel', 'Bloomberg Terminal', 'Power BI', 'QuickBooks', 'FactSet', 'SAP ERP']
  },
  {
    id: 'ux-ui-designer',
    title: 'UX / UI Product Designer',
    category: 'Design & Creative',
    defaultTemplate: 'creative',
    defaultAccent: '#7c3aed',
    skills: [
      { name: 'Design Systems & Component Libraries', level: 'Expert', category: 'Design' },
      { name: 'Figma & High-Fidelity Prototyping', level: 'Expert', category: 'Tools' },
      { name: 'User Journey Mapping & Wireframing', level: 'Expert', category: 'UX' },
      { name: 'Usability Testing & User Interviews', level: 'Advanced', category: 'Research' },
      { name: 'Interaction Design & Micro-animations', level: 'Advanced', category: 'Design' },
      { name: 'WCAG Accessibility Standards', level: 'Advanced', category: 'Accessibility' },
      { name: 'HTML/CSS Understanding', level: 'Intermediate', category: 'Technical' }
    ],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera' },
      { name: 'Nielsen Norman Group (NN/g) UX Master Certified', issuer: 'NN/g' }
    ],
    tools: ['Figma', 'Adobe Creative Cloud', 'Miro', 'Principle', 'Maze', 'Lottie']
  },
  {
    id: 'marketing-manager',
    title: 'Digital Marketing Strategist',
    category: 'Marketing',
    defaultTemplate: 'modern',
    defaultAccent: '#db2777',
    skills: [
      { name: 'Multi-Channel Campaign Strategy', level: 'Expert', category: 'Marketing' },
      { name: 'Paid Acquisition (Google Ads, Meta)', level: 'Expert', category: 'Paid Media' },
      { name: 'SEO & Content Marketing Strategy', level: 'Advanced', category: 'Organic' },
      { name: 'Marketing Automation (HubSpot, Marketo)', level: 'Advanced', category: 'Automation' },
      { name: 'Google Analytics 4 (GA4) & Tracking', level: 'Expert', category: 'Analytics' },
      { name: 'Budget Optimization & CAC/LTV Management', level: 'Advanced', category: 'Financials' },
      { name: 'Email Marketing & Retention Funnels', level: 'Expert', category: 'Lifecycle' }
    ],
    certifications: [
      { name: 'Google Ads & GA4 Certified Professional', issuer: 'Google Skillshop' },
      { name: 'HubSpot Inbound Marketing Certified', issuer: 'HubSpot Academy' }
    ],
    tools: ['HubSpot', 'Google Analytics 4', 'Meta Ads Manager', 'Semrush', 'Klaviyo', 'Canva']
  },
  {
    id: 'project-manager',
    title: 'Technical Project Manager',
    category: 'Management',
    defaultTemplate: 'professional',
    defaultAccent: '#0284c7',
    skills: [
      { name: 'Agile, Scrum & Kanban Frameworks', level: 'Expert', category: 'Methodology' },
      { name: 'Resource Allocation & Capacity Planning', level: 'Expert', category: 'Planning' },
      { name: 'Risk Management & Mitigation Strategy', level: 'Advanced', category: 'Risk' },
      { name: 'Budget Oversight ($1M+ projects)', level: 'Advanced', category: 'Financial' },
      { name: 'Cross-functional Team Leadership', level: 'Expert', category: 'Leadership' },
      { name: 'Sprint Planning & Backlog Grooming', level: 'Expert', category: 'Execution' },
      { name: 'Executive Status Reporting', level: 'Advanced', category: 'Communication' }
    ],
    certifications: [
      { name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute' },
      { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance' }
    ],
    tools: ['Jira', 'Asana', 'Monday.com', 'MS Project', 'Slack', 'Confluence', 'Smartsheet']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    defaultTemplate: 'compact',
    defaultAccent: '#1e3a8a',
    skills: [
      { name: 'SOC Incident Monitoring & Response', level: 'Expert', category: 'Security Ops' },
      { name: 'SIEM Tools (Splunk, Sentinel)', level: 'Expert', category: 'Tools' },
      { name: 'Vulnerability Scanning (Nessus, Qualys)', level: 'Advanced', category: 'Assessment' },
      { name: 'Network Security Protocols & Firewalls', level: 'Advanced', category: 'Network' },
      { name: 'Threat Hunting & IOC Analysis', level: 'Advanced', category: 'Threat Intel' },
      { name: 'NIST & ISO 27001 Compliance', level: 'Intermediate', category: 'Compliance' },
      { name: 'Penetration Testing Fundamentals', level: 'Intermediate', category: 'Security' }
    ],
    certifications: [
      { name: 'CompTIA Security+ / CySA+', issuer: 'CompTIA' },
      { name: 'Certified Information Systems Security Professional (CISSP)', issuer: '(ISC)²' }
    ],
    tools: ['Splunk', 'Wireshark', 'Nessus', 'Microsoft Sentinel', 'CrowdStrike', 'Burp Suite']
  },
  {
    id: 'civil-engineer',
    title: 'Civil & Structural Engineer',
    category: 'Engineering',
    defaultTemplate: 'minimal',
    defaultAccent: '#475569',
    skills: [
      { name: 'AutoCAD & Civil 3D', level: 'Expert', category: 'Drafting' },
      { name: 'Structural Analysis & Load Calculations', level: 'Advanced', category: 'Engineering' },
      { name: 'Site Inspection & Quality Assurance', level: 'Expert', category: 'Field' },
      { name: 'Building Codes & Municipal Permitting', level: 'Advanced', category: 'Compliance' },
      { name: 'BIM Modeling (Revit)', level: 'Intermediate', category: 'BIM' },
      { name: 'Subcontractor & Contractor Coordination', level: 'Advanced', category: 'Management' },
      { name: 'Environmental Impact Compliance', level: 'Intermediate', category: 'Compliance' }
    ],
    certifications: [
      { name: 'Professional Engineer (PE) Licensure', issuer: 'State Licensing Board' },
      { name: 'LEED Green Associate', issuer: 'U.S. Green Building Council' }
    ],
    tools: ['AutoCAD', 'Revit', 'Civil 3D', 'STAAD.Pro', 'Bluebeam Revu', 'Primavera P6']
  },
  {
    id: 'accountant',
    title: 'Certified Public Accountant (CPA)',
    category: 'Finance',
    defaultTemplate: 'classic',
    defaultAccent: '#334155',
    skills: [
      { name: 'General Ledger & Month-End Close', level: 'Expert', category: 'Accounting' },
      { name: 'Corporate & Individual Tax Preparation', level: 'Expert', category: 'Tax' },
      { name: 'GAAP Compliance & Internal Controls', level: 'Expert', category: 'Compliance' },
      { name: 'Financial Audit & Reconciliation', level: 'Advanced', category: 'Audit' },
      { name: 'ERP Software (NetSuite, SAP)', level: 'Advanced', category: 'Systems' },
      { name: 'Payroll & Accounts Payable/Receivable', level: 'Expert', category: 'Operations' },
      { name: 'Cost Reduction Analysis', level: 'Advanced', category: 'Analysis' }
    ],
    certifications: [
      { name: 'Certified Public Accountant (CPA)', issuer: 'AICPA / State Board' },
      { name: 'Certified Management Accountant (CMA)', issuer: 'IMA' }
    ],
    tools: ['NetSuite', 'QuickBooks Enterprise', 'Excel', 'SAP', 'Xero', 'Sage Intacct']
  },
  {
    id: 'teacher-educator',
    title: 'Lead High School / College Educator',
    category: 'Education',
    defaultTemplate: 'modern',
    defaultAccent: '#ea580c',
    skills: [
      { name: 'Curriculum Development & Lesson Design', level: 'Expert', category: 'Pedagogy' },
      { name: 'Differentiated Instruction', level: 'Expert', category: 'Classroom' },
      { name: 'Learning Management Systems (Canvas, Google)', level: 'Expert', category: 'Technology' },
      { name: 'Student Assessment & Growth Analytics', level: 'Advanced', category: 'Assessment' },
      { name: 'Parent & Community Engagement', level: 'Expert', category: 'Communication' },
      { name: 'Special Education / IEP Accommodations', level: 'Advanced', category: 'Inclusion' },
      { name: 'STEM / Humanities Project-Based Learning', level: 'Expert', category: 'Curriculum' }
    ],
    certifications: [
      { name: 'State Certified Teaching Credential', issuer: 'Department of Education' },
      { name: 'Google for Education Certified Educator', issuer: 'Google for Education' }
    ],
    tools: ['Canvas LMS', 'Google Classroom', 'Kahoot!', 'Nearpod', 'PowerSchool', 'Edpuzzle']
  }
];

export interface AiGeneratorInput {
  country: string;
  ageGroup: string;
  occupation: string;
  employmentStatus: string;
  customOccupation?: string;
}

// Sample first and last names for realistic generation
const FIRST_NAMES = ['Alex', 'Morgan', 'Taylor', 'Jordan', 'Sam', 'Casey', 'Riley', 'Avery', 'Jamie', 'Cameron', 'Dakota', 'Logan'];
const LAST_NAMES = ['Vance', 'Sterling', 'Mercer', 'Chen', 'Patel', 'Dubois', 'Kowalski', 'Novak', 'Silva', 'Tanaka', 'O\'Connor', 'Schneider'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Intelligent AI Resume Generator engine that constructs a tailored, realistic,
 * country-localized, employment-status-adapted, and age-calibrated professional resume.
 */
export function generateTailoredAiResume(input: AiGeneratorInput): ResumeData {
  // Support all 250+ countries and territories
  const fullInfo = findCountryByName(input.country);
  const countryName = fullInfo ? fullInfo.name : input.country;
  const phonePrefix = fullInfo?.phonePrefix || '+1';
  const cities = fullInfo?.majorCities && fullInfo.majorCities.length > 0
    ? fullInfo.majorCities
    : (fullInfo?.capital ? [fullInfo.capital] : ['Central District', 'Capital City']);
  const universities = fullInfo?.universities && fullInfo.universities.length > 0
    ? fullInfo.universities
    : [`National University of ${countryName}`, `Institute of Technology (${countryName})`];
  const companies = fullInfo?.companies && fullInfo.companies.length > 0
    ? fullInfo.companies
    : [`${countryName} Premier Enterprise`, 'Apex Global Solutions', 'Vanguard Systems'];

  const countryData = {
    code: fullInfo?.alpha2 || 'US',
    name: countryName,
    phonePrefix,
    cities,
    universities,
    companies
  };
  const ageGroupData = AGE_GROUPS.find(a => a.id === input.ageGroup) || AGE_GROUPS[1];
  const employmentStatusData = EMPLOYMENT_STATUSES.find(e => e.id === input.employmentStatus) || EMPLOYMENT_STATUSES[1];

  const customTitle = input.customOccupation?.trim();
  const matchedOccupation = POPULAR_OCCUPATIONS.find(o => o.title.toLowerCase() === input.occupation.toLowerCase()) 
    || POPULAR_OCCUPATIONS.find(o => o.id === input.occupation)
    || POPULAR_OCCUPATIONS[0];

  const actualJobTitle = customTitle || matchedOccupation.title;
  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const cleanNameForEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  
  const city = getRandomItem(countryData.cities);
  const university = getRandomItem(countryData.universities);
  const primaryCompany = getRandomItem(countryData.companies);
  const secondaryCompany = countryData.companies.find(c => c !== primaryCompany) || 'Horizon Enterprises';
  const tertiaryCompany = countryData.companies.find(c => c !== primaryCompany && c !== secondaryCompany) || 'Global Innovations Inc.';

  const isStudent = input.employmentStatus === 'student';
  const isRecentGrad = input.employmentStatus === 'recent_grad';
  const isUnemployed = input.employmentStatus === 'unemployed';
  const isFreelancer = input.employmentStatus === 'freelancer';
  const isCareerChanger = input.employmentStatus === 'career_changer';
  
  const isYoungAge = input.ageGroup === '18-22';
  const isMidCareer = input.ageGroup === '30-39';
  const isSeniorAge = input.ageGroup === '40-49' || input.ageGroup === '50+';

  // 1. Synthesize Professional Summary based on exact combination
  let summary = '';
  if (isStudent) {
    summary = `Motivated and high-achieving ${actualJobTitle} student at ${university} with demonstrated coursework in industry fundamentals, collaborative project execution, and practical research. Seeking to leverage proven technical acumen, rapid learning agility, and analytical problem-solving skills to drive measurable value and support team objectives in ${city}.`;
  } else if (isRecentGrad) {
    summary = `Energetic, top-tier ${actualJobTitle} graduate from ${university} equipped with hands-on capstone project experience, strong foundational training, and proficiency with modern industry toolsets. Proven ability to bridge theoretical principles with real-world project deliverables, maintain rigorous attention to detail, and collaborate cross-functionally to achieve strategic goals.`;
  } else if (isUnemployed) {
    summary = `Results-oriented ${actualJobTitle} based in ${city} with ${ageGroupData.experienceYears} of proven expertise in optimizing operational workflows, delivering high-impact solutions, and driving cross-functional project success. Currently leveraging career transition to enhance core technical capabilities, actively seeking a high-leverage opportunity to apply extensive transferable problem-solving strengths and team leadership.`;
  } else if (isFreelancer) {
    summary = `Independent, client-focused ${actualJobTitle} consultant with ${ageGroupData.experienceYears} of experience delivering customized end-to-end solutions for high-growth enterprises and international clients. Expert in full lifecycle execution, rapid stakeholder alignment, proactive scope management, and high-quality deliverables that drive business growth and operational velocity.`;
  } else if (isCareerChanger) {
    summary = `Dynamic and adaptable professional transitioning into ${actualJobTitle}, bringing ${ageGroupData.experienceYears} of multifaceted expertise in strategic problem-solving, stakeholder communication, and analytical execution. Successfully completed intensive professional specialization; primed to deliver immediate cross-disciplinary value and innovative perspectives to collaborative teams in ${city}.`;
  } else {
    // Employed / Standard professional
    if (isSeniorAge) {
      summary = `Accomplished and visionary ${actualJobTitle} with ${ageGroupData.experienceYears} of progressive leadership in ${city} and international markets. Proven track record of steering cross-functional departments, architecting scalable systems, optimizing multi-million budget allocations, and cultivating top-performing teams to surpass corporate objectives.`;
    } else if (isMidCareer) {
      summary = `Versatile, outcome-driven ${actualJobTitle} with ${ageGroupData.experienceYears} of industry expertise spearheading impactful initiatives at ${primaryCompany}. Recognized for combining analytical rigor with strategic vision to improve team throughput, eliminate operational bottlenecks, and consistently deliver projects on time and under budget.`;
    } else {
      summary = `Proactive and dedicated ${actualJobTitle} with ${ageGroupData.experienceYears} of hands-on experience in fast-paced environments. Demonstrates a continuous track record of delivering high-quality deliverables, collaborating seamlessly with cross-functional stakeholders, and driving measurable performance enhancements across key initiatives in ${city}.`;
    }
  }

  // 2. Synthesize Work Experience
  const experience: ExperienceItem[] = [];

  if (isStudent) {
    experience.push({
      id: `exp-${Date.now()}-1`,
      jobTitle: `${actualJobTitle} Intern`,
      company: primaryCompany,
      location: city,
      startDate: '2024-05',
      endDate: '2024-08',
      current: false,
      description: `• Assisted senior team members in executing core project workflows, contributing to a 15% reduction in turnaround time for client deliverables.\n• Conducted comprehensive research and comparative analysis to support strategic decision-making across 3 departmental initiatives.\n• Documented operational guidelines and shared technical best practices with incoming peer interns.`
    });
    experience.push({
      id: `exp-${Date.now()}-2`,
      jobTitle: 'Undergraduate Research Assistant & Peer Mentor',
      company: university,
      location: city,
      startDate: '2023-09',
      endDate: '',
      current: true,
      description: `• Spearheaded collaborative lab sessions, mentoring 25+ students on advanced principles and practical toolsets.\n• Co-authored departmental report on modern ${actualJobTitle} methodologies and presented key findings to faculty reviewers.`
    });
  } else if (isRecentGrad) {
    experience.push({
      id: `exp-${Date.now()}-1`,
      jobTitle: `Junior ${actualJobTitle}`,
      company: primaryCompany,
      location: city,
      startDate: '2024-01',
      endDate: '',
      current: true,
      description: `• Contributed to primary project cycles from requirement discovery to production deployment, maintaining a 98% on-time milestone delivery record.\n• Collaborated with senior leads to identify performance bottlenecks and implemented automated tests that improved output consistency by 22%.\n• Authored clean, maintainable documentation for cross-functional knowledge sharing.`
    });
    experience.push({
      id: `exp-${Date.now()}-2`,
      jobTitle: `${actualJobTitle} Project Associate (Co-op)`,
      company: secondaryCompany,
      location: city,
      startDate: '2023-01',
      endDate: '2023-12',
      current: false,
      description: `• Partnered with product and engineering teams to support day-to-day deliverables, resolving 40+ user-reported workflow tickets.\n• Conducted user feedback interviews and synthesized findings into actionable feature enhancements.`
    });
  } else if (isFreelancer) {
    experience.push({
      id: `exp-${Date.now()}-1`,
      jobTitle: `Principal ${actualJobTitle} Consultant`,
      company: 'Self-Employed / Independent Practice',
      location: `${city} (Remote / Global Clients)`,
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: `• Partnered with 12+ enterprise and mid-market clients across ${countryData.name} to deliver bespoke ${actualJobTitle} solutions, achieving 100% client satisfaction ratings.\n• Managed entire project lifecycles from proposal discovery and budgeting to production sign-off, averaging a 30% speed-to-market advantage.\n• Spearheaded digital transformation projects that unlocked over $450k in annualized efficiency gains for key accounts.`
    });
    experience.push({
      id: `exp-${Date.now()}-2`,
      jobTitle: `Senior ${actualJobTitle} Contractor`,
      company: secondaryCompany,
      location: city,
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: `• Led contract execution on mission-critical initiatives, streamlining internal workflows and reducing cycle latency by 28%.\n• Trained client in-house staff on sustainable maintenance practices and system architecture.`
    });
  } else {
    // Senior or Mid-Level Experience
    const rolePrefix = isSeniorAge ? 'Director of' : isMidCareer ? 'Senior' : 'Lead';
    const firstRoleTitle = `${rolePrefix} ${actualJobTitle}`;

    experience.push({
      id: `exp-${Date.now()}-1`,
      jobTitle: firstRoleTitle,
      company: primaryCompany,
      location: city,
      startDate: isSeniorAge ? '2019-04' : '2021-06',
      endDate: isUnemployed ? '2025-08' : '',
      current: !isUnemployed,
      description: `• Directed end-to-end strategic initiatives for ${primaryCompany}, driving a 34% increase in overall team output and revenue impact.\n• Managed and mentored a high-caliber team of 8+ specialists, fostering a culture of technical excellence and continuous improvement.\n• Modernized key operational infrastructure, reducing maintenance overhead by $120,000 annually and accelerating deployment velocity.`
    });

    experience.push({
      id: `exp-${Date.now()}-2`,
      jobTitle: `${actualJobTitle}`,
      company: secondaryCompany,
      location: city,
      startDate: isSeniorAge ? '2014-02' : '2018-03',
      endDate: isSeniorAge ? '2019-03' : '2021-05',
      current: false,
      description: `• Spearheaded core project deliverables, consistently outperforming quarterly KPIs and benchmarks by an average of 18%.\n• Partnered directly with executive leadership to refine standard operating procedures and implement scalable best practices.\n• Identified high-friction bottlenecks and automated reporting mechanisms, saving 15+ manual hours weekly.`
    });

    if (isSeniorAge) {
      experience.push({
        id: `exp-${Date.now()}-3`,
        jobTitle: `Associate ${actualJobTitle}`,
        company: tertiaryCompany,
        location: city,
        startDate: '2008-08',
        endDate: '2014-01',
        current: false,
        description: `• Spearheaded foundational systems integration and led multidisciplinary project tracks to successful on-time delivery.\n• Awarded Employee of the Year (2012) for outstanding technical contributions and peer mentorship.`
      });
    }
  }

  // 3. Synthesize Education tailored to Country and Age
  const education: EducationItem[] = [];
  const degreeType = isSeniorAge ? 'Master of Science (MSc)' : (countryData.code === 'UK' || countryData.code === 'AU') ? 'Bachelor of Science (Honours)' : 'Bachelor of Science (B.S.)';
  const major = matchedOccupation.category === 'Healthcare' ? 'Nursing & Clinical Health Sciences' 
    : matchedOccupation.category === 'Finance' ? 'Finance & Applied Economics'
    : matchedOccupation.category === 'Marketing' ? 'Marketing Communications & Analytics'
    : matchedOccupation.category === 'Design & Creative' ? 'Human-Computer Interaction & Visual Design'
    : matchedOccupation.category === 'Education' ? 'Education & Instructional Pedagogy'
    : 'Computer Science & Information Systems';

  education.push({
    id: `edu-${Date.now()}-1`,
    school: university,
    degree: degreeType,
    fieldOfStudy: major,
    location: city,
    startDate: isYoungAge ? '2022-09' : isMidCareer ? '2012-09' : isSeniorAge ? '2000-09' : '2017-09',
    endDate: isStudent ? '2026-05' : isYoungAge ? '2024-05' : isMidCareer ? '2016-05' : isSeniorAge ? '2004-05' : '2021-05',
    current: isStudent,
    description: isStudent || isRecentGrad 
      ? 'Dean\'s List Honor Roll; Relevant Coursework: Advanced System Design, Statistical Methods, Project Leadership & Ethics.' 
      : 'Graduated with Magna Cum Laude Honors; President of Student Academic Council; Departmental Achievement Award.'
  });

  if (isSeniorAge) {
    education.push({
      id: `edu-${Date.now()}-2`,
      school: `${university} Graduate School`,
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'Executive Leadership & Strategic Management',
      location: city,
      startDate: '2006-09',
      endDate: '2008-05',
      current: false,
      description: 'Capstone in Global Strategic Innovation; Beta Gamma Sigma Honor Society.'
    });
  }

  // 4. Synthesize Skills & Expertise
  const skills: SkillItem[] = matchedOccupation.skills.map((s, idx) => ({
    id: `skill-${Date.now()}-${idx}`,
    name: s.name,
    level: isSeniorAge ? 'Expert' : isStudent ? (idx < 2 ? 'Intermediate' : 'Beginner') : s.level,
    category: s.category
  }));

  // 5. Synthesize Certifications
  const certifications: CertificationItem[] = matchedOccupation.certifications.map((c, idx) => ({
    id: `cert-${Date.now()}-${idx}`,
    name: c.name,
    issuer: c.issuer,
    date: isStudent ? '2024-03' : '2023-08'
  }));

  // 6. Synthesize Projects
  const projects: ProjectItem[] = [
    {
      id: `proj-${Date.now()}-1`,
      title: `${actualJobTitle} Enterprise Optimization Platform`,
      role: isSeniorAge ? 'Lead Architect / Executive Sponsor' : 'Lead Contributor',
      description: `Architected and deployed a comprehensive end-to-end framework that automated key workflows, boosting departmental processing speed by 35% and saving 200+ engineering hours per quarter.`,
      technologies: matchedOccupation.tools.slice(0, 4).join(', '),
      link: `https://portfolio.${cleanNameForEmail}.dev/enterprise-optimization`
    },
    {
      id: `proj-${Date.now()}-2`,
      title: `Scalable Data & Insights Pipeline for ${primaryCompany}`,
      role: 'Core Specialist',
      description: `Designed real-time tracking telemetry and interactive dashboards providing actionable insights for executive stakeholders across multiple regional markets.`,
      technologies: matchedOccupation.tools.slice(2, 6).join(', '),
      link: `https://github.com/${cleanNameForEmail}/insights-pipeline`
    }
  ];

  // 7. Select appropriate template & styling based on occupation category
  const themeConfig = {
    template: matchedOccupation.defaultTemplate,
    accentColor: matchedOccupation.defaultAccent,
    font: (matchedOccupation.defaultTemplate === 'classic' || matchedOccupation.defaultTemplate === 'executive') ? ('serif' as const) : ('sans' as const),
    spacing: 'normal' as const
  };

  return {
    id: `ai-cv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${fullName} — ${actualJobTitle} (${input.country})`,
    industry: matchedOccupation.category,
    personalInfo: {
      fullName,
      jobTitle: actualJobTitle,
      email: `${cleanNameForEmail}@example.com`,
      phone: `${countryData.phonePrefix} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
      location: `${city}, ${countryData.name}`,
      linkedin: `linkedin.com/in/${cleanNameForEmail}`,
      github: matchedOccupation.category === 'Technology' ? `github.com/${cleanNameForEmail}` : undefined,
      website: `https://${cleanNameForEmail}.dev`
    },
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
    themeConfig,
    updatedAt: Date.now()
  };
}
