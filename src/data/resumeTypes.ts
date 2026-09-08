export interface ResumeTypeItem {
  id: string;
  name: string;
  category: 'Technology & AI' | 'Engineering' | 'Business & Finance' | 'Healthcare & Science' | 'Creative & Design' | 'Executive & Leadership' | 'Specialized & General';
  description: string;
  iconName: string;
  isDedicated: boolean;
  route?: string; // Dedicated route if isDedicated is true
  targetProfession?: string; // Target profession for dynamic AI generation
  keywords: string[];
  popular?: boolean;
  badge?: string;
}

export const RESUME_CATEGORIES = [
  'All',
  'Technology & AI',
  'Engineering',
  'Business & Finance',
  'Healthcare & Science',
  'Creative & Design',
  'Executive & Leadership',
  'Specialized & General'
] as const;

export type ResumeCategory = typeof RESUME_CATEGORIES[number];

export const RESUME_TYPES: ResumeTypeItem[] = [
  // 1. DEDICATED EXISTING GENERATORS / STUDIOS
  {
    id: 'robotic-ai-resume',
    name: 'Robotic & AI Tech Resume',
    category: 'Technology & AI',
    description: 'Dedicated studio for AI trainers, model evaluators, data annotators, and prompt engineers with ATS optimization.',
    iconName: 'Bot',
    isDedicated: true,
    route: '/robotic-resume',
    keywords: ['robotic', 'ai', 'data annotator', 'prompt engineer', 'ats', 'model evaluator', 'machine learning', 'artificial intelligence'],
    popular: true,
    badge: 'Dedicated Studio'
  },
  {
    id: 'custom-studio-builder',
    name: 'Custom CV Studio Builder',
    category: 'Specialized & General',
    description: 'Full interactive editor with live drag-and-drop sections, real-time preview, ATS strength meter, and PDF export.',
    iconName: 'FileText',
    isDedicated: true,
    route: '/create',
    keywords: ['builder', 'custom', 'editor', 'studio', 'create', 'ats meter', 'drag and drop'],
    popular: true,
    badge: 'Dedicated Studio'
  },
  {
    id: 'industry-samples',
    name: 'Curated Sample Resumes',
    category: 'Specialized & General',
    description: 'Browse 9 expertly crafted industry sample CVs for inspiration, quick clone, and customized editing.',
    iconName: 'Compass',
    isDedicated: true,
    route: '/samples',
    keywords: ['samples', 'examples', 'templates', 'industry', 'clone', 'preset'],
    popular: false,
    badge: 'Dedicated Studio'
  },
  {
    id: 'instant-random-cv',
    name: 'Instant Industry CV Generator',
    category: 'Specialized & General',
    description: 'Instantly generate a complete, realistic fictional CV across 9 industries to test templates and layouts.',
    iconName: 'Zap',
    isDedicated: true,
    route: '/random',
    keywords: ['random', 'instant', 'quick', 'test', 'demo', 'fictional', 'mock'],
    popular: false,
    badge: 'Dedicated Studio'
  },

  // 2. DYNAMIC AI GENERATOR TYPES (ENGINEERING)
  {
    id: 'biomedical-engineer',
    name: 'Biomedical Engineer Resume',
    category: 'Engineering',
    description: 'Medical device innovation, ISO 13485 compliance, biomechanics, physiological sensors, and clinical validation.',
    iconName: 'Activity',
    isDedicated: false,
    targetProfession: 'Biomedical Engineer',
    keywords: ['biomedical', 'medical device', 'bioengineering', 'clinical', 'iso 13485', 'fda', 'biomechanics', 'matlab'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'civil-structural-engineer',
    name: 'Civil & Structural Engineer Resume',
    category: 'Engineering',
    description: 'Structural calculations, AutoCAD/Revit BIM modeling, site inspection, and municipal code compliance.',
    iconName: 'DraftingCompass',
    isDedicated: false,
    targetProfession: 'Civil & Structural Engineer',
    keywords: ['civil', 'structural', 'construction', 'autocad', 'bim', 'revit', 'building', 'infrastructure'],
    popular: false,
    badge: 'Dynamic AI'
  },
  {
    id: 'mechanical-mechatronics-engineer',
    name: 'Mechanical & Mechatronics Engineer',
    category: 'Engineering',
    description: 'Kinematics, robotics hardware, thermo-fluid systems, CAD modeling, and precision manufacturing.',
    iconName: 'Wrench',
    isDedicated: false,
    targetProfession: 'Mechanical & Mechatronics Engineer',
    keywords: ['mechanical', 'mechatronics', 'robotics', 'hardware', 'cad', 'solidworks', 'manufacturing'],
    popular: false,
    badge: 'Dynamic AI'
  },
  {
    id: 'aerospace-systems-engineer',
    name: 'Aerospace Systems Engineer Resume',
    category: 'Engineering',
    description: 'Avionics, propulsion systems, flight mechanics, telemetry systems, and mission-critical safety standards.',
    iconName: 'Cpu',
    isDedicated: false,
    targetProfession: 'Aerospace Systems Engineer',
    keywords: ['aerospace', 'aviation', 'propulsion', 'defense', 'avionics', 'space', 'flight'],
    popular: false,
    badge: 'Dynamic AI'
  },
  {
    id: 'renewable-energy-engineer',
    name: 'Renewable Energy & Sustainability Engineer',
    category: 'Engineering',
    description: 'Solar PV, wind microgrids, battery energy storage systems (BESS), and carbon reduction auditing.',
    iconName: 'SunMedium',
    isDedicated: false,
    targetProfession: 'Renewable Energy Specialist',
    keywords: ['renewable', 'solar', 'wind', 'energy', 'sustainability', 'green', 'clean tech', 'bess'],
    popular: false,
    badge: 'Dynamic AI'
  },

  // 3. DYNAMIC AI GENERATOR TYPES (TECHNOLOGY & AI)
  {
    id: 'software-engineer',
    name: 'Software Engineer & Full-Stack Developer',
    category: 'Technology & AI',
    description: 'Modern web architectures, TypeScript/React, distributed backend APIs, cloud containers, and CI/CD pipelines.',
    iconName: 'Code2',
    isDedicated: false,
    targetProfession: 'Software Engineer',
    keywords: ['software', 'developer', 'frontend', 'backend', 'fullstack', 'react', 'typescript', 'python', 'cloud'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'data-scientist-ai',
    name: 'Data Scientist & AI Specialist',
    category: 'Technology & AI',
    description: 'Statistical modeling, deep learning, PyTorch/TensorFlow, LLM evaluation, and BigQuery analytics.',
    iconName: 'Database',
    isDedicated: false,
    targetProfession: 'Data Scientist & AI Specialist',
    keywords: ['data scientist', 'machine learning', 'ai', 'python', 'pytorch', 'statistics', 'llm', 'sql'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst & SOC Engineer',
    category: 'Technology & AI',
    description: 'Threat hunting, SIEM incident response, penetration testing, zero-trust architecture, and compliance.',
    iconName: 'Shield',
    isDedicated: false,
    targetProfession: 'Cybersecurity Analyst',
    keywords: ['cybersecurity', 'security', 'soc', 'splunk', 'incident response', 'penetration testing', 'infosec'],
    popular: true,
    badge: 'Dynamic AI'
  },

  // 4. DYNAMIC AI GENERATOR TYPES (BUSINESS & FINANCE)
  {
    id: 'financial-analyst',
    name: 'Financial Analyst & Quant Associate',
    category: 'Business & Finance',
    description: 'DCF valuation modeling, corporate budget forecasting, M&A due diligence, and Bloomberg analytics.',
    iconName: 'LineChart',
    isDedicated: false,
    targetProfession: 'Financial Analyst',
    keywords: ['finance', 'financial analyst', 'valuation', 'excel', 'investment', 'banking', 'bloomberg', 'accounting'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'certified-public-accountant',
    name: 'Certified Public Accountant (CPA)',
    category: 'Business & Finance',
    description: 'GAAP audit reconciliation, enterprise corporate taxation, general ledger close, and ERP compliance.',
    iconName: 'Coins',
    isDedicated: false,
    targetProfession: 'Certified Public Accountant (CPA)',
    keywords: ['accountant', 'cpa', 'accounting', 'tax', 'audit', 'gaap', 'ledger', 'financial statements'],
    popular: false,
    badge: 'Dynamic AI'
  },
  {
    id: 'product-manager',
    name: 'Technical Product Manager (TPM)',
    category: 'Business & Finance',
    description: 'User journey discovery, Agile roadmapping, GTM launch execution, data metrics, and stakeholder alignment.',
    iconName: 'Briefcase',
    isDedicated: false,
    targetProfession: 'Product Manager',
    keywords: ['product manager', 'pm', 'agile', 'scrum', 'roadmap', 'strategy', 'gtm', 'user research'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'digital-marketing-strategist',
    name: 'Digital Marketing & Growth Strategist',
    category: 'Business & Finance',
    description: 'Multi-channel acquisition (Google/Meta), SEO growth, retention funnels, and marketing automation.',
    iconName: 'Layers',
    isDedicated: false,
    targetProfession: 'Digital Marketing Strategist',
    keywords: ['marketing', 'seo', 'growth', 'paid ads', 'analytics', 'content', 'campaigns', 'conversion'],
    popular: false,
    badge: 'Dynamic AI'
  },

  // 5. DYNAMIC AI GENERATOR TYPES (HEALTHCARE & SCIENCE)
  {
    id: 'registered-nurse-specialist',
    name: 'Registered Nurse & Healthcare Specialist',
    category: 'Healthcare & Science',
    description: 'Acute clinical care, EHR documentation (Epic/Cerner), triage assessment, and patient advocacy.',
    iconName: 'HeartPulse',
    isDedicated: false,
    targetProfession: 'Registered Nurse / Healthcare Specialist',
    keywords: ['nurse', 'rn', 'healthcare', 'clinical', 'hospital', 'patient care', 'medical', 'epic'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'clinical-research-coordinator',
    name: 'Clinical Research Coordinator',
    category: 'Healthcare & Science',
    description: 'GCP trial compliance, patient recruitment, IRB documentation, protocol management, and bio-data logging.',
    iconName: 'Stethoscope',
    isDedicated: false,
    targetProfession: 'Clinical Research Coordinator',
    keywords: ['clinical research', 'gcp', 'trials', 'pharma', 'irb', 'protocol', 'biotech', 'medicine'],
    popular: false,
    badge: 'Dynamic AI'
  },

  // 6. DYNAMIC AI GENERATOR TYPES (CREATIVE & DESIGN)
  {
    id: 'ux-ui-product-designer',
    name: 'UX / UI Product Designer Resume',
    category: 'Creative & Design',
    description: 'Design systems, high-fidelity Figma prototypes, user testing, micro-interactions, and WCAG accessibility.',
    iconName: 'PenTool',
    isDedicated: false,
    targetProfession: 'UX / UI Product Designer',
    keywords: ['designer', 'ui', 'ux', 'figma', 'product design', 'wireframing', 'user experience', 'visual'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'brand-visual-designer',
    name: 'Brand & Visual Communications Designer',
    category: 'Creative & Design',
    description: 'Corporate brand identity, typography systems, vector graphics, marketing collateral, and motion visual design.',
    iconName: 'Palette',
    isDedicated: false,
    targetProfession: 'Brand & Visual Designer',
    keywords: ['graphic design', 'brand', 'typography', 'visual', 'creative', 'adobe', 'illustration'],
    popular: false,
    badge: 'Dynamic AI'
  },

  // 7. DYNAMIC AI GENERATOR TYPES (EXECUTIVE & LEADERSHIP)
  {
    id: 'executive-director-leadership',
    name: 'Executive Director & VP Leadership',
    category: 'Executive & Leadership',
    description: 'Organizational vision, multi-million P&L management, enterprise scaling, board relations, and culture building.',
    iconName: 'Crown',
    isDedicated: false,
    targetProfession: 'Executive Director & Chief of Staff',
    keywords: ['executive', 'vp', 'director', 'c-suite', 'p&l', 'leadership', 'board', 'management'],
    popular: true,
    badge: 'Dynamic AI'
  },
  {
    id: 'operations-general-manager',
    name: 'Operations & General Manager',
    category: 'Executive & Leadership',
    description: 'Operational throughput, cross-departmental efficiency, cost reduction frameworks, and supply chain scaling.',
    iconName: 'Building2',
    isDedicated: false,
    targetProfession: 'Operations & General Manager',
    keywords: ['operations', 'general manager', 'gm', 'coo', 'efficiency', 'logistics', 'process improvement'],
    popular: false,
    badge: 'Dynamic AI'
  },

  // 8. DYNAMIC AI GENERATOR TYPES (SPECIALIZED & GENERAL)
  {
    id: 'lead-educator-teacher',
    name: 'Lead High School / College Educator',
    category: 'Specialized & General',
    description: 'Curriculum development, LMS technology (Canvas/Google), student growth analytics, and project pedagogy.',
    iconName: 'GraduationCap',
    isDedicated: false,
    targetProfession: 'Lead High School / College Educator',
    keywords: ['teacher', 'educator', 'professor', 'curriculum', 'pedagogy', 'academic', 'classroom', 'school'],
    popular: false,
    badge: 'Dynamic AI'
  },
  {
    id: 'supply-chain-logistics',
    name: 'Supply Chain & Logistics Specialist',
    category: 'Specialized & General',
    description: 'Global freight routing, vendor procurement, inventory warehousing, ERP fulfillment, and customs clearance.',
    iconName: 'Truck',
    isDedicated: false,
    targetProfession: 'Supply Chain & Logistics Specialist',
    keywords: ['supply chain', 'logistics', 'procurement', 'warehouse', 'freight', 'inventory', 'shipping'],
    popular: false,
    badge: 'Dynamic AI'
  }
];

export interface RouteResolution {
  type: 'dedicated' | 'dynamic';
  route: string;
  profession?: string;
}

/**
 * Intelligently determines whether a dedicated resume generator exists
 * for the selected category/type or if it routes to the dynamic AI generator.
 */
export function resolveResumeRoute(item: ResumeTypeItem): RouteResolution {
  if (item.isDedicated && item.route) {
    return {
      type: 'dedicated',
      route: item.route
    };
  }
  return {
    type: 'dynamic',
    route: '/ai-generator',
    profession: item.targetProfession || item.name
  };
}
