import { 
  RoboticJobRole, 
  ExperienceLevel, 
  WorkPreference, 
  TargetIndustry, 
  SkillCategory,
  RoboticSkill 
} from '../types/roboticResume';
import { ResumeData, CvTemplate } from '../types/cv';

export interface RoleDefinition {
  id: string;
  title: string;
  category: string;
  defaultIndustry: TargetIndustry;
  defaultTemplate: CvTemplate;
  defaultAccent: string;
  keywords: string[];
  suggestedSkills: { name: string; category: SkillCategory; level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }[];
  actionVerbs: string[];
  commonResponsibilities: string[];
  recommendedTools: string[];
}

export const ROBOTIC_ACTION_VERBS = [
  'Analyzed',
  'Evaluated',
  'Tested',
  'Validated',
  'Reviewed',
  'Documented',
  'Investigated',
  'Implemented',
  'Developed',
  'Supported',
  'Managed',
  'Optimized',
  'Monitored',
  'Identified',
  'Resolved',
  'Coordinated',
  'Audited',
  'Benchmarked',
  'Synthesized',
  'Formulated',
  'Standardized',
  'Cataloged',
  'Classified',
  'Troubleshot'
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Technical Skills',
  'AI Skills',
  'Data Skills',
  'Software Skills',
  'Soft Skills',
  'Industry Skills',
  'Tools & Platforms'
];

export const GENERAL_SKILLS_CATALOG: Record<SkillCategory, string[]> = {
  'Technical Skills': [
    'System Troubleshooting',
    'API Integration',
    'HTML5 & CSS3',
    'JavaScript/TypeScript',
    'SQL Queries',
    'Git & Version Control',
    'Linux/Unix Command Line',
    'Network Diagnostics',
    'Database Schema Understanding',
    'Cloud Fundamentals (AWS/GCP/Azure)',
    'Cybersecurity Best Practices',
    'Browser Developer Tools'
  ],
  'AI Skills': [
    'AI Model Prompting',
    'Prompt Engineering',
    'RLHF & Human Feedback Evaluation',
    'AI Hallucination Detection',
    'Model Output Evaluation',
    'Adversarial Testing (Red Teaming)',
    'Few-Shot & Zero-Shot Prompting',
    'Semantic Analysis',
    'Synthetic Data Curation',
    'AI Safety & Guardrail Compliance',
    'Model Alignment & Factuality Checking',
    'Multi-modal LLM Evaluation'
  ],
  'Data Skills': [
    'Data Annotation & Tagging',
    'Bounding Box & Segmentation',
    'Data Cleaning & Deduplication',
    'Metadata Cataloging',
    'Data Quality Assurance',
    'Excel / Google Sheets Advanced Modeling',
    'Data Extraction & Verification',
    'Audio/Video Transcription QA',
    'Dataset Splitting & Sampling',
    'Statistical Outlier Detection'
  ],
  'Software Skills': [
    'Manual Functional Testing',
    'Regression Testing',
    'Bug Reporting & Jira Ticket Logging',
    'Test Case Authoring & Execution',
    'Cross-Browser & Device Testing',
    'Smoke & Sanity Testing',
    'User Acceptance Testing (UAT)',
    'API Testing (Postman)',
    'Defect Lifecycle Tracking',
    'Usability & Exploratory Testing'
  ],
  'Soft Skills': [
    'High Attention to Detail',
    'Analytical Problem Solving',
    'Written Technical Communication',
    'Independent Remote Self-Management',
    'Critical Thinking & Deductive Reasoning',
    'Collaborative Feedback Reception',
    'Strict Guideline Adherence',
    'Time Management & Deadline Ownership',
    'Adaptability to Algorithmic Changes',
    'Ethical Judgment & Confidentiality'
  ],
  'Industry Skills': [
    'Search Quality Guidelines (E-E-A-T)',
    'Content Moderation & Policy Enforcement',
    'Search Engine Evaluation Protocols',
    'Trust & Safety Policy Compliance',
    'Copyright & Fair Use Guidelines',
    'COPPA & Child Safety Online Guidelines',
    'GDPR & PII Privacy Standards',
    'Customer Journey Analysis',
    'SEO Core Web Vitals Standards'
  ],
  'Tools & Platforms': [
    'Jira & Confluence',
    'Labelbox / Scale AI / Remotasks',
    'Postman',
    'Slack & Discord',
    'GitHub / GitLab',
    'Google Workspace (Docs, Sheets)',
    'Notion & Trello',
    'TestRail / Zephyr',
    'Figma & FigJam',
    'Chrome DevTools',
    'Loom & Video Annotation Tools',
    'Zendesk / Intercom'
  ]
};

export const TARGET_INDUSTRIES: TargetIndustry[] = [
  'Artificial Intelligence',
  'Technology',
  'Software',
  'Data',
  'Cybersecurity',
  'Digital Marketing',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'Media',
  'Customer Support',
  'Other'
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Entry Level',
  'Junior',
  'Mid-Level',
  'Senior',
  'Expert',
  'Career Changer'
];

export const WORK_PREFERENCES: WorkPreference[] = [
  'Remote',
  'Hybrid',
  'On-site',
  'Flexible'
];

export const ROBOTIC_ROLES_MASTER: RoleDefinition[] = [
  {
    id: 'ai-data-annotator',
    title: 'AI Data Annotator',
    category: 'AI & Data Annotation',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#2563eb',
    keywords: ['data annotation', 'RLHF', 'labeling', 'bounding boxes', 'quality control', 'dataset', 'accuracy', 'guidelines'],
    suggestedSkills: [
      { name: 'Data Annotation & Tagging', category: 'Data Skills', level: 'Expert' },
      { name: 'Strict Guideline Adherence', category: 'Soft Skills', level: 'Expert' },
      { name: 'RLHF & Human Feedback Evaluation', category: 'AI Skills', level: 'Advanced' },
      { name: 'Image Bounding Box & Segmentation', category: 'Data Skills', level: 'Advanced' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' },
      { name: 'Labelbox / Scale AI', category: 'Tools & Platforms', level: 'Advanced' }
    ],
    actionVerbs: ['Annotated', 'Labeled', 'Classified', 'Validated', 'Cataloged', 'Reviewed', 'Audited'],
    commonResponsibilities: [
      'Annotated and categorized high-volume datasets (text, image, audio) following stringent formatting and labeling taxonomy standards.',
      'Achieved a 99.2% quality inspection accuracy score across 15,000+ machine learning training samples.',
      'Reviewed peer annotations, identified labeling edge cases, and proposed clarification updates to project guideline documentation.'
    ],
    recommendedTools: ['Labelbox', 'Scale AI', 'CVAT', 'Google Sheets', 'Slack']
  },
  {
    id: 'data-labeling-specialist',
    title: 'Data Labeling Specialist',
    category: 'AI & Data Annotation',
    defaultIndustry: 'Data',
    defaultTemplate: 'technical',
    defaultAccent: '#0284c7',
    keywords: ['data labeling', 'classification', 'metadata', 'multimodal data', 'accuracy', 'QA check'],
    suggestedSkills: [
      { name: 'Data Cleaning & Deduplication', category: 'Data Skills', level: 'Expert' },
      { name: 'Metadata Cataloging', category: 'Data Skills', level: 'Advanced' },
      { name: 'Semantic Tagging', category: 'AI Skills', level: 'Advanced' },
      { name: 'Quality Assurance Sampling', category: 'Data Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Labeled', 'Categorized', 'Validated', 'Standardized', 'Sampled', 'Documented'],
    commonResponsibilities: [
      'Executed precise multi-modal data labeling for supervised machine learning pipelines, ensuring zero format discrepancies.',
      'Conducted rigorous cross-validation checks on incoming datasets to eliminate duplicate or corrupt entries.',
      'Collaborated with machine learning engineers to calibrate labeling guidelines based on model confusion matrices.'
    ],
    recommendedTools: ['Label Studio', 'Dataloop', 'Roboflow', 'Excel', 'Trello']
  },
  {
    id: 'ai-trainer',
    title: 'AI Trainer',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#7c3aed',
    keywords: ['AI trainer', 'supervised learning', 'model training', 'prompt calibration', 'RLHF', 'evaluations'],
    suggestedSkills: [
      { name: 'RLHF & Human Feedback Evaluation', category: 'AI Skills', level: 'Expert' },
      { name: 'Prompt Engineering', category: 'AI Skills', level: 'Advanced' },
      { name: 'Model Hallucination Detection', category: 'AI Skills', level: 'Expert' },
      { name: 'Factuality & Citation Checking', category: 'Industry Skills', level: 'Expert' }
    ],
    actionVerbs: ['Trained', 'Evaluated', 'Calibrated', 'Benchmarked', 'Synthesized', 'Critiqued'],
    commonResponsibilities: [
      'Formulated complex multi-turn conversational prompts to stress-test large language model capabilities and reasoning thresholds.',
      'Ranked and scored competing model outputs across factual correctness, conciseness, instruction-following, and safety metrics.',
      'Authored gold-standard reference responses utilized in fine-tuning state-of-the-art enterprise conversational agents.'
    ],
    recommendedTools: ['OpenAI Playground', 'Anthropic Console', 'Hugging Face', 'Google Docs', 'Notion']
  },
  {
    id: 'ai-response-evaluator',
    title: 'AI Response Evaluator',
    category: 'AI Quality & Evaluation',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#4338ca',
    keywords: ['AI evaluation', 'response rating', 'accuracy', 'alignment', 'factual verification', 'ranking'],
    suggestedSkills: [
      { name: 'Model Output Evaluation', category: 'AI Skills', level: 'Expert' },
      { name: 'Critical Thinking & Deductive Reasoning', category: 'Soft Skills', level: 'Expert' },
      { name: 'AI Hallucination Detection', category: 'AI Skills', level: 'Expert' },
      { name: 'Instruction Following Assessment', category: 'AI Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Evaluated', 'Rated', 'Benchmarked', 'Investigated', 'Verified', 'Ranked'],
    commonResponsibilities: [
      'Evaluated generative AI outputs against multi-dimensional grading criteria including truthfulness, grammar, tone, and formatting constraints.',
      'Investigated and verified complex technical claims using trusted academic, legal, and governmental primary sources.',
      'Identified subtle hallucinated citations and reported failure modes to the AI safety and alignment engineering team.'
    ],
    recommendedTools: ['Google Search', 'Perplexity', 'Jira', 'Airtable', 'Google Sheets']
  },
  {
    id: 'ai-model-evaluator',
    title: 'AI Model Evaluator',
    category: 'AI Quality & Evaluation',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'modern',
    defaultAccent: '#0f766e',
    keywords: ['model benchmarking', 'red teaming', 'adversarial testing', 'alignment', 'performance metrics'],
    suggestedSkills: [
      { name: 'Adversarial Testing (Red Teaming)', category: 'AI Skills', level: 'Expert' },
      { name: 'Model Alignment & Factuality Checking', category: 'AI Skills', level: 'Expert' },
      { name: 'Systematic Metric Logging', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Safety Guardrail Compliance', category: 'Industry Skills', level: 'Expert' }
    ],
    actionVerbs: ['Audited', 'Stress-tested', 'Benchmarked', 'Measured', 'Cataloged', 'Standardized'],
    commonResponsibilities: [
      'Designed and executed adversarial red-teaming test suites to uncover jailbreak attempts, policy violations, and bias risks.',
      'Computed pass rates, latency benchmarks, and error frequency metrics across different model checkpoints.',
      'Prepared executive evaluation reports detailing model readiness for public deployment.'
    ],
    recommendedTools: ['Weights & Biases', 'Python', 'Jupyter', 'GitHub', 'Slack']
  },
  {
    id: 'ai-quality-analyst',
    title: 'AI Quality Analyst',
    category: 'AI Quality & Evaluation',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'modern',
    defaultAccent: '#059669',
    keywords: ['quality analyst', 'AI audit', 'error analysis', 'sampling', 'accuracy thresholds', 'standard operating procedure'],
    suggestedSkills: [
      { name: 'Data Quality Assurance', category: 'Data Skills', level: 'Expert' },
      { name: 'Statistical Outlier Detection', category: 'Data Skills', level: 'Advanced' },
      { name: 'SOP Documentation', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Cross-Functional Communication', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Monitored', 'Analyzed', 'Standardized', 'Inspected', 'Improved', 'Audited'],
    commonResponsibilities: [
      'Monitored end-to-end data quality and output accuracy across remote distributed annotation teams.',
      'Identified systemic inter-rater reliability discrepancies and held calibration workshops to ensure unified grading consistency.',
      'Synthesized quantitative quality metrics into actionable weekly dashboards for program managers.'
    ],
    recommendedTools: ['Tableau', 'Excel', 'Google Sheets', 'Jira', 'Confluence']
  },
  {
    id: 'search-quality-rater',
    title: 'Search Quality Rater',
    category: 'Search & Quality Rating',
    defaultIndustry: 'Technology',
    defaultTemplate: 'classic',
    defaultAccent: '#1e3a8a',
    keywords: ['search quality', 'E-E-A-T', 'relevance rating', 'user intent', 'search engine', 'content evaluation'],
    suggestedSkills: [
      { name: 'Search Quality Guidelines (E-E-A-T)', category: 'Industry Skills', level: 'Expert' },
      { name: 'User Intent Analysis', category: 'Industry Skills', level: 'Expert' },
      { name: 'Web Research & Source Verification', category: 'Technical Skills', level: 'Expert' },
      { name: 'Analytical Problem Solving', category: 'Soft Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Rated', 'Analyzed', 'Evaluated', 'Benchmarked', 'Investigated', 'Documented'],
    commonResponsibilities: [
      'Rated search engine result pages (SERPs) for query relevance, helpfulness, and Page Quality in strict adherence to 170+ pages of general rating guidelines.',
      'Applied E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) criteria to evaluate web page credibility and content creator authority.',
      'Consistently scored above 95% on blind quality assurance calibration tasks administered by algorithmic quality teams.'
    ],
    recommendedTools: ['Search Evaluation Tools (RaterHub/UHRS)', 'Google Search', 'Browser Tools', 'Chrome']
  },
  {
    id: 'search-engine-evaluator',
    title: 'Search Engine Evaluator',
    category: 'Search & Quality Rating',
    defaultIndustry: 'Technology',
    defaultTemplate: 'classic',
    defaultAccent: '#1d4ed8',
    keywords: ['search evaluator', 'query interpretation', 'SERP', 'navigational intent', 'local search', 'multilingual'],
    suggestedSkills: [
      { name: 'Search Engine Evaluation Protocols', category: 'Industry Skills', level: 'Expert' },
      { name: 'Local Search & Geolocation Intent', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Strict Guideline Adherence', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Assessed', 'Evaluated', 'Verified', 'Deciphered', 'Reported', 'Scored'],
    commonResponsibilities: [
      'Evaluated search query nuances including colloquial phrasing, local intent, voice search queries, and navigational versus informational intent.',
      'Tested experimental ranking algorithmic updates against production baselines to measure satisfaction differentials.',
      'Maintained 100% compliance with strict confidentiality and non-disclosure standards across all proprietary rating platforms.'
    ],
    recommendedTools: ['UHRS', 'RaterHub', 'Spreadsheets', 'DevTools']
  },
  {
    id: 'content-reviewer',
    title: 'Content Reviewer',
    category: 'Content & Moderation',
    defaultIndustry: 'Media',
    defaultTemplate: 'minimal',
    defaultAccent: '#334155',
    keywords: ['content review', 'editorial review', 'accuracy', 'style guidelines', 'quality control', 'metadata'],
    suggestedSkills: [
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' },
      { name: 'Editorial Style Guide Adherence', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Fact-Checking & Source Verification', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Reviewed', 'Proofread', 'Edited', 'Validated', 'Standardized', 'Approved'],
    commonResponsibilities: [
      'Reviewed hundreds of multimedia submissions weekly for tone, factual accuracy, legal compliance, and community standards.',
      'Identified and corrected grammatical errors, style deviations, and broken contextual links prior to live publication.',
      'Logged detailed editorial feedback enabling creators and automated systems to improve quality across subsequent iterations.'
    ],
    recommendedTools: ['Grammarly', 'Google Workspace', 'Contentful', 'Airtable', 'Slack']
  },
  {
    id: 'content-moderator',
    title: 'Content Moderator',
    category: 'Content & Moderation',
    defaultIndustry: 'Technology',
    defaultTemplate: 'minimal',
    defaultAccent: '#475569',
    keywords: ['content moderation', 'trust & safety', 'policy enforcement', 'community standards', 'risk mitigation'],
    suggestedSkills: [
      { name: 'Content Moderation & Policy Enforcement', category: 'Industry Skills', level: 'Expert' },
      { name: 'Trust & Safety Policy Compliance', category: 'Industry Skills', level: 'Expert' },
      { name: 'Rapid Decision-Making Under SLAs', category: 'Soft Skills', level: 'Advanced' },
      { name: 'Objectivity & Emotional Resilience', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Moderated', 'Enforced', 'Investigated', 'Escalated', 'Resolved', 'Cataloged'],
    commonResponsibilities: [
      'Reviewed user-generated content across fast-paced live platforms, enforcing strict community safety, anti-harassment, and copyright policies.',
      'Maintained rapid SLA response times under 90 seconds while achieving a 98.8% audit accuracy score.',
      'Escalated high-severity security, fraud, and severe policy violations directly to specialized legal and trust & safety triage teams.'
    ],
    recommendedTools: ['Zendesk', 'Internal Moderation Tooling', 'ServiceNow', 'Slack']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    defaultIndustry: 'Data',
    defaultTemplate: 'modern',
    defaultAccent: '#0891b2',
    keywords: ['data analyst', 'SQL', 'dashboards', 'reporting', 'KPI tracking', 'data visualization', 'insights'],
    suggestedSkills: [
      { name: 'SQL Queries', category: 'Technical Skills', level: 'Expert' },
      { name: 'Excel / Google Sheets Advanced Modeling', category: 'Data Skills', level: 'Expert' },
      { name: 'Tableau / Power BI Visualization', category: 'Tools & Platforms', level: 'Advanced' },
      { name: 'Statistical Outlier Detection', category: 'Data Skills', level: 'Advanced' },
      { name: 'Analytical Problem Solving', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Analyzed', 'Extracted', 'Modeled', 'Visualized', 'Identified', 'Presented'],
    commonResponsibilities: [
      'Constructed parameterized SQL queries to extract, clean, and aggregate multi-table datasets containing over 2M+ records.',
      'Designed interactive executive dashboards highlighting operational bottlenecks, conversion funnels, and efficiency drivers.',
      'Presented empirical findings and data-backed recommendations to non-technical department leads to optimize operational spend.'
    ],
    recommendedTools: ['SQL', 'Tableau', 'Power BI', 'Google BigQuery', 'Python', 'Excel']
  },
  {
    id: 'ai-research-assistant',
    title: 'AI Research Assistant',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#6366f1',
    keywords: ['AI research', 'literature review', 'dataset curation', 'experiment tracking', 'benchmarking', 'PyTorch'],
    suggestedSkills: [
      { name: 'Synthetic Data Curation', category: 'AI Skills', level: 'Advanced' },
      { name: 'Python Basics / Data Scripting', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Literature Review & Synthesis', category: 'Industry Skills', level: 'Expert' },
      { name: 'Systematic Experiment Logging', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Researched', 'Synthesized', 'Curated', 'Logged', 'Benchmarked', 'Coordinated'],
    commonResponsibilities: [
      'Conducted targeted literature reviews on modern LLM evaluation paradigms, chain-of-thought prompting, and alignment benchmarks.',
      'Prepared and cleaned specialized domain benchmark datasets to measure model performance in medical and legal reasoning tasks.',
      'Documented experimental methodologies and synthesized findings into comprehensive research memos.'
    ],
    recommendedTools: ['ArXiv', 'Zotero', 'Python', 'Weights & Biases', 'Notion']
  },
  {
    id: 'prompt-specialist',
    title: 'Prompt Specialist',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#8b5cf6',
    keywords: ['prompt engineering', 'prompt optimization', 'context windows', 'few-shot prompting', 'LLM workflows'],
    suggestedSkills: [
      { name: 'AI Model Prompting', category: 'AI Skills', level: 'Expert' },
      { name: 'Few-Shot & Zero-Shot Prompting', category: 'AI Skills', level: 'Expert' },
      { name: 'Token Optimization & Cost Reduction', category: 'AI Skills', level: 'Advanced' },
      { name: 'Structured JSON Output Formatting', category: 'Technical Skills', level: 'Expert' }
    ],
    actionVerbs: ['Engineered', 'Optimized', 'Formulated', 'Refined', 'Tested', 'Documented'],
    commonResponsibilities: [
      'Authored and calibrated production-grade prompt templates enforcing deterministic JSON schema responses across complex workflows.',
      'Optimized system instructions to reduce token consumption by 32% while increasing semantic instruction adherence.',
      'Maintained version-controlled prompt repositories and authored unit tests to guard against model version drift.'
    ],
    recommendedTools: ['OpenAI API', 'Claude Prompt Console', 'LangChain / LlamaIndex', 'Git', 'Postman']
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#9333ea',
    keywords: ['prompt engineer', 'RAG', 'system prompts', 'LLM evaluations', 'agentic workflows', 'token efficiency'],
    suggestedSkills: [
      { name: 'Prompt Engineering', category: 'AI Skills', level: 'Expert' },
      { name: 'API Integration', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Adversarial Testing (Red Teaming)', category: 'AI Skills', level: 'Expert' },
      { name: 'Python / TypeScript', category: 'Technical Skills', level: 'Intermediate' }
    ],
    actionVerbs: ['Architected', 'Engineered', 'Benchmarked', 'Implemented', 'Systematized', 'Automated'],
    commonResponsibilities: [
      'Architected multi-stage chain-of-thought and retrieval-augmented prompt pipelines integrating enterprise knowledge bases.',
      'Built automated evaluation harness testing 100+ prompt variations across synthetic adversarial test suites.',
      'Collaborated with product teams to translate ambiguous business requirements into high-fidelity AI agent instructions.'
    ],
    recommendedTools: ['Python', 'LangSmith', 'Promptfoo', 'Postman', 'Git']
  },
  {
    id: 'ai-operations-specialist',
    title: 'AI Operations Specialist',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'modern',
    defaultAccent: '#2563eb',
    keywords: ['AI operations', 'human-in-the-loop', 'workflow management', 'annotation pipeline', 'KPI tracking'],
    suggestedSkills: [
      { name: 'Workflow Optimization', category: 'Industry Skills', level: 'Expert' },
      { name: 'Jira & Confluence Management', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Vendor & Contributor Coordination', category: 'Soft Skills', level: 'Advanced' },
      { name: 'Data Pipeline Monitoring', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Coordinated', 'Monitored', 'Streamlined', 'Facilitated', 'Dispatched', 'Optimized'],
    commonResponsibilities: [
      'Managed end-to-end operational execution of human-in-the-loop (HITL) annotation pipelines comprising 50+ global contributors.',
      'Streamlined onboarding procedures and automated task dispatching, reducing task turnaround times by 40%.',
      'Monitored project velocity and budget utilization, proactively reallocating resources to prevent project bottlenecks.'
    ],
    recommendedTools: ['Jira', 'Asana', 'Scale AI Dashboard', 'Google Sheets', 'Slack']
  },
  {
    id: 'ai-support-specialist',
    title: 'AI Support Specialist',
    category: 'Customer & Technical Support',
    defaultIndustry: 'Customer Support',
    defaultTemplate: 'modern',
    defaultAccent: '#0284c7',
    keywords: ['AI customer support', 'troubleshooting', 'user guidance', 'ticket triage', 'SaaS support'],
    suggestedSkills: [
      { name: 'System Troubleshooting', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Zendesk / Intercom Ticketing', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'AI Product Feature Familiarity', category: 'Industry Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Supported', 'Troubleshot', 'Resolved', 'Guided', 'Documented', 'Triaged'],
    commonResponsibilities: [
      'Delivered tier-1 and tier-2 technical support for enterprise users encountering AI software bugs, prompt errors, and API timeouts.',
      'Achieved a 96% Customer Satisfaction (CSAT) rating with an average first-response time of less than 12 minutes.',
      'Authored 30+ troubleshooting guides and FAQ articles documenting common user integration pitfalls.'
    ],
    recommendedTools: ['Zendesk', 'Intercom', 'Linear', 'Loom', 'Notion']
  },
  {
    id: 'machine-learning-assistant',
    title: 'Machine Learning Assistant',
    category: 'AI & Machine Learning Support',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#1d4ed8',
    keywords: ['ML assistant', 'data preprocessing', 'feature engineering', 'model evaluation', 'Python', 'Jupyter'],
    suggestedSkills: [
      { name: 'Python (Pandas, NumPy)', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Data Cleaning & Deduplication', category: 'Data Skills', level: 'Expert' },
      { name: 'Jupyter Notebooks', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Git Version Control', category: 'Technical Skills', level: 'Intermediate' }
    ],
    actionVerbs: ['Assisted', 'Preprocessed', 'Executed', 'Validated', 'Scraped', 'Cleaned'],
    commonResponsibilities: [
      'Assisted senior machine learning scientists with data preprocessing, exploratory data analysis, and feature normalization.',
      'Wrote robust Python scripts to scrape, sanitize, and format unstructured raw text into tokenized training datasets.',
      'Maintained experimental logbooks tracking model loss, accuracy metrics, and hyperparameter permutations.'
    ],
    recommendedTools: ['Python', 'Pandas', 'Jupyter', 'Git', 'Google Colab']
  },
  {
    id: 'data-collection-specialist',
    title: 'Data Collection Specialist',
    category: 'AI & Data Annotation',
    defaultIndustry: 'Data',
    defaultTemplate: 'minimal',
    defaultAccent: '#047857',
    keywords: ['data collection', 'field data', 'audio collection', 'survey sampling', 'quality verification'],
    suggestedSkills: [
      { name: 'Data Extraction & Verification', category: 'Data Skills', level: 'Expert' },
      { name: 'Strict Guideline Adherence', category: 'Soft Skills', level: 'Expert' },
      { name: 'Metadata Logging', category: 'Data Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Collected', 'Gathered', 'Verified', 'Compiled', 'Cataloged', 'Standardized'],
    commonResponsibilities: [
      'Spearheaded primary and secondary data collection initiatives, assembling targeted demographic and linguistic sample corpora.',
      'Screened collected audio, visual, and textual submissions for recording clarity, guideline compliance, and privacy safety.',
      'Cataloged metadata attributes including dialect, background acoustics, and device specifications.'
    ],
    recommendedTools: ['Audacity', 'Google Forms', 'Airtable', 'Dropbox', 'Excel']
  },
  {
    id: 'transcription-specialist',
    title: 'Transcription Specialist',
    category: 'AI & Data Annotation',
    defaultIndustry: 'Data',
    defaultTemplate: 'classic',
    defaultAccent: '#334155',
    keywords: ['audio transcription', 'speech-to-text', 'verbatim', 'time stamping', 'audio QA', 'speech training data'],
    suggestedSkills: [
      { name: 'Audio/Video Transcription QA', category: 'Data Skills', level: 'Expert' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' },
      { name: 'Time-Stamping & Speaker Diarization', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Fast & Accurate Typing (80+ WPM)', category: 'Technical Skills', level: 'Expert' }
    ],
    actionVerbs: ['Transcribed', 'Verified', 'Synchronized', 'Corrected', 'Audited', 'Formatted'],
    commonResponsibilities: [
      'Transcribed complex, multi-speaker audio recordings containing diverse regional accents, overlapping dialogue, and specialized jargon.',
      'Achieved a 99.5% verbatim accuracy benchmark, precisely logging timestamps, background tags, and non-verbal cues.',
      'Audited automated speech-to-text (ASR) outputs, correcting phonetic transcriptions to train acoustic models.'
    ],
    recommendedTools: ['Express Scribe', 'Audacity', 'Otter.ai', 'Word', 'Foot Pedal Hardware']
  },
  {
    id: 'ai-safety-evaluator',
    title: 'AI Safety Evaluator',
    category: 'AI Quality & Evaluation',
    defaultIndustry: 'Artificial Intelligence',
    defaultTemplate: 'technical',
    defaultAccent: '#dc2626',
    keywords: ['AI safety', 'red teaming', 'content safety', 'guardrails', 'alignment', 'harm prevention', 'policy compliance'],
    suggestedSkills: [
      { name: 'AI Safety & Guardrail Compliance', category: 'AI Skills', level: 'Expert' },
      { name: 'Adversarial Testing (Red Teaming)', category: 'AI Skills', level: 'Expert' },
      { name: 'Critical Thinking & Deductive Reasoning', category: 'Soft Skills', level: 'Expert' },
      { name: 'Trust & Safety Policy Compliance', category: 'Industry Skills', level: 'Expert' }
    ],
    actionVerbs: ['Investigated', 'Stress-tested', 'Identified', 'Documented', 'Prevented', 'Audited'],
    commonResponsibilities: [
      'Proactively stress-tested frontier language models using complex adversarial scenarios to identify safety vulnerabilities and toxic outputs.',
      'Classified safety violations across rigorous categories including self-harm, cyberattack assistance, bias, and dangerous content.',
      'Authored comprehensive post-incident vulnerability memos recommending system prompt guardrails and safety filter adjustments.'
    ],
    recommendedTools: ['Promptfoo', 'Google Sheets', 'Jira', 'Notion', 'Markdown']
  },
  {
    id: 'trust-and-safety-specialist',
    title: 'Trust & Safety Specialist',
    category: 'Content & Moderation',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#b91c1c',
    keywords: ['trust and safety', 'fraud prevention', 'risk mitigation', 'user protection', 'investigations', 'compliance'],
    suggestedSkills: [
      { name: 'Trust & Safety Policy Compliance', category: 'Industry Skills', level: 'Expert' },
      { name: 'Fraud & Abuse Investigation', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Analytical Problem Solving', category: 'Soft Skills', level: 'Expert' },
      { name: 'Cross-Functional Escalation', category: 'Soft Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Investigated', 'Mitigated', 'Enforced', 'Collaborated', 'Resolved', 'Cataloged'],
    commonResponsibilities: [
      'Conducted deep-dive investigations into coordinated platform abuse, impersonation accounts, and bad-actor networks.',
      'Enforced terms of service and trust & safety guidelines, applying account penalties and suspensions with high objectivity.',
      'Partnered with product safety teams to build automated detection heuristics that reduced fraudulent account creations by 28%.'
    ],
    recommendedTools: ['Sift', 'Zendesk', 'Internal Admin Portals', 'SQL', 'Jira']
  },
  {
    id: 'software-tester',
    title: 'Software Tester',
    category: 'Software Quality & Testing',
    defaultIndustry: 'Software',
    defaultTemplate: 'technical',
    defaultAccent: '#2563eb',
    keywords: ['software testing', 'manual testing', 'QA', 'bug reports', 'regression testing', 'test cases', 'SDLC'],
    suggestedSkills: [
      { name: 'Manual Functional Testing', category: 'Software Skills', level: 'Expert' },
      { name: 'Bug Reporting & Jira Ticket Logging', category: 'Software Skills', level: 'Expert' },
      { name: 'Test Case Authoring & Execution', category: 'Software Skills', level: 'Expert' },
      { name: 'Cross-Browser & Device Testing', category: 'Software Skills', level: 'Advanced' },
      { name: 'Browser Developer Tools', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Tested', 'Identified', 'Logged', 'Verified', 'Executed', 'Reported'],
    commonResponsibilities: [
      'Authored and executed comprehensive test plans covering functional, sanity, regression, and cross-browser test suites.',
      'Identified and logged 120+ reproducible software bugs in Jira with clear reproduction steps, network logs, and screen recordings.',
      'Collaborated closely with software developers during sprint cycles to re-test resolved issues and verify zero regressions.'
    ],
    recommendedTools: ['Jira', 'TestRail', 'Chrome DevTools', 'Postman', 'BrowserStack']
  },
  {
    id: 'qa-tester',
    title: 'QA Tester',
    category: 'Software Quality & Testing',
    defaultIndustry: 'Software',
    defaultTemplate: 'technical',
    defaultAccent: '#0284c7',
    keywords: ['QA tester', 'quality assurance', 'test execution', 'smoke testing', 'defect lifecycle', 'API testing'],
    suggestedSkills: [
      { name: 'Smoke & Sanity Testing', category: 'Software Skills', level: 'Expert' },
      { name: 'API Testing (Postman)', category: 'Software Skills', level: 'Advanced' },
      { name: 'Defect Lifecycle Tracking', category: 'Software Skills', level: 'Expert' },
      { name: 'Regression Testing', category: 'Software Skills', level: 'Expert' }
    ],
    actionVerbs: ['Validated', 'Audited', 'Executed', 'Discovered', 'Documented', 'Coordinated'],
    commonResponsibilities: [
      'Executed pre-release smoke testing on staging environments, preventing critical defects from reaching production builds.',
      'Validated REST API endpoint responses, headers, and status codes using Postman collections.',
      'Maintained test case repositories in TestRail, updating validation checklists for all new feature deliverables.'
    ],
    recommendedTools: ['Postman', 'TestRail', 'Jira', 'GitHub', 'Charles Proxy']
  },
  {
    id: 'website-tester',
    title: 'Website Tester',
    category: 'Software Quality & Testing',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#0ea5e9',
    keywords: ['website testing', 'responsive design', 'cross-browser testing', 'broken links', 'HTML/CSS inspection'],
    suggestedSkills: [
      { name: 'Cross-Browser & Device Testing', category: 'Software Skills', level: 'Expert' },
      { name: 'Browser Developer Tools', category: 'Technical Skills', level: 'Expert' },
      { name: 'HTML5 & CSS3', category: 'Technical Skills', level: 'Intermediate' },
      { name: 'Usability & Exploratory Testing', category: 'Software Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Inspected', 'Tested', 'Audited', 'Cataloged', 'Verified', 'Communicated'],
    commonResponsibilities: [
      'Conducted visual and functional responsive tests across iOS, Android, macOS, and Windows desktop/mobile form factors.',
      'Audited web pages for broken hyperlinks, asset load failures, layout shifts, and missing alt attributes using DevTools.',
      'Provided UX feedback highlighting confusing navigation hierarchies and form validation blockers.'
    ],
    recommendedTools: ['BrowserStack', 'Chrome DevTools', 'Lighthouse', 'Notion', 'Loom']
  },
  {
    id: 'application-tester',
    title: 'Application Tester',
    category: 'Software Quality & Testing',
    defaultIndustry: 'Software',
    defaultTemplate: 'technical',
    defaultAccent: '#3b82f6',
    keywords: ['app testing', 'mobile testing', 'iOS', 'Android', 'crash logs', 'TestFlight', 'APK installation'],
    suggestedSkills: [
      { name: 'Mobile Application Testing (iOS/Android)', category: 'Software Skills', level: 'Expert' },
      { name: 'Crash Log Extraction', category: 'Technical Skills', level: 'Advanced' },
      { name: 'TestFlight & Firebase App Distribution', category: 'Tools & Platforms', level: 'Advanced' },
      { name: 'Bug Reporting & Jira Ticket Logging', category: 'Software Skills', level: 'Expert' }
    ],
    actionVerbs: ['Tested', 'Diagnosed', 'Extracted', 'Reproduced', 'Monitored', 'Verified'],
    commonResponsibilities: [
      'Tested native iOS and Android builds across various OS versions and hardware constraints, capturing device crash logs.',
      'Simulated offline states, low-battery conditions, and incoming call interruptions to verify application state persistence.',
      'Managed beta tester distribution cohorts using TestFlight and Firebase App Distribution.'
    ],
    recommendedTools: ['TestFlight', 'Firebase App Distribution', 'Android Studio / Xcode', 'Jira']
  },
  {
    id: 'ux-tester',
    title: 'UX Tester',
    category: 'Software Quality & Testing',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#7c3aed',
    keywords: ['UX testing', 'usability testing', 'user experience', 'accessibility', 'WCAG', 'feedback analysis'],
    suggestedSkills: [
      { name: 'Usability & Exploratory Testing', category: 'Software Skills', level: 'Expert' },
      { name: 'WCAG Accessibility Standards', category: 'Industry Skills', level: 'Advanced' },
      { name: 'User Journey Analysis', category: 'Industry Skills', level: 'Expert' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Evaluated', 'Interviewed', 'Identified', 'Synthesized', 'Recommended', 'Mapped'],
    commonResponsibilities: [
      'Executed task-based usability protocols to evaluate cognitive friction and navigational clarity on emerging product features.',
      'Screened digital interfaces for accessibility compliance (WCAG 2.1 AA) regarding color contrast, screen reader labels, and keyboard navigation.',
      'Synthesized qualitative video feedback and user confusion points into structured executive usability reports.'
    ],
    recommendedTools: ['UserTesting', 'Maze', 'Figma', 'Loom', 'Google Docs']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & IT Infrastructure',
    defaultIndustry: 'Cybersecurity',
    defaultTemplate: 'technical',
    defaultAccent: '#1e3a8a',
    keywords: ['cybersecurity', 'SIEM', 'incident response', 'vulnerability assessment', 'threat detection', 'SOC'],
    suggestedSkills: [
      { name: 'Cybersecurity Best Practices', category: 'Technical Skills', level: 'Expert' },
      { name: 'Network Diagnostics', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Security Incident Monitoring', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Linux/Unix Command Line', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Monitored', 'Investigated', 'Mitigated', 'Audited', 'Hardened', 'Resolved'],
    commonResponsibilities: [
      'Monitored SIEM security feeds, analyzing suspicious network telemetry, unauthorized authentication spikes, and endpoint anomalies.',
      'Investigated security alerts, triaging potential phishing campaigns and isolating compromised workstations in adherence to SOPs.',
      'Conducted routine vulnerability scans across enterprise subnets, tracking patch management remediation workflows.'
    ],
    recommendedTools: ['Splunk', 'Wireshark', 'Nessus', 'Microsoft Defender', 'Linux']
  },
  {
    id: 'it-support-specialist',
    title: 'IT Support Specialist',
    category: 'Security & IT Infrastructure',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#0369a1',
    keywords: ['IT support', 'helpdesk', 'hardware troubleshooting', 'Active Directory', 'remote desktop', 'SLA'],
    suggestedSkills: [
      { name: 'System Troubleshooting', category: 'Technical Skills', level: 'Expert' },
      { name: 'Network Diagnostics', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Zendesk / ServiceNow Ticketing', category: 'Tools & Platforms', level: 'Expert' }
    ],
    actionVerbs: ['Resolved', 'Configured', 'Troubleshot', 'Provisioned', 'Documented', 'Maintained'],
    commonResponsibilities: [
      'Provided high-touch remote and on-site IT support for 250+ employees across Windows, macOS, and mobile environments.',
      'Provisioned new employee hardware, configured secure SSO credentials, and managed Active Directory user permissions.',
      'Resolved 94% of incoming tier-1/tier-2 support tickets within agreed 2-hour SLA thresholds.'
    ],
    recommendedTools: ['ServiceNow', 'Active Directory', 'Jamf', 'TeamViewer', 'Slack']
  },
  {
    id: 'technical-support-specialist',
    title: 'Technical Support Specialist',
    category: 'Security & IT Infrastructure',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#0284c7',
    keywords: ['technical support', 'API debugging', 'ticket resolution', 'log analysis', 'customer success'],
    suggestedSkills: [
      { name: 'System Troubleshooting', category: 'Technical Skills', level: 'Expert' },
      { name: 'API Integration', category: 'Technical Skills', level: 'Intermediate' },
      { name: 'Browser Developer Tools', category: 'Technical Skills', level: 'Advanced' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Diagnosed', 'Escalated', 'Resolved', 'Guided', 'Synthesized', 'Supported'],
    commonResponsibilities: [
      'Diagnosed complex technical support inquiries by inspecting browser console logs, server error codes, and webhook payloads.',
      'Reproduced obscure edge-case customer bugs and escalated structured bug tickets with complete reproduction payloads to engineers.',
      'Authored customer-facing knowledge base articles that reduced incoming recurring inquiry volume by 18%.'
    ],
    recommendedTools: ['Postman', 'Zendesk', 'Datadog', 'Jira', 'Chrome DevTools']
  },
  {
    id: 'remote-digital-specialist',
    title: 'Remote Digital Specialist',
    category: 'Digital & Remote Work',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#059669',
    keywords: ['remote work', 'digital operations', 'SaaS tools', 'asynchronous collaboration', 'workflow automation'],
    suggestedSkills: [
      { name: 'Independent Remote Self-Management', category: 'Soft Skills', level: 'Expert' },
      { name: 'Time Management & Deadline Ownership', category: 'Soft Skills', level: 'Expert' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Google Workspace (Docs, Sheets)', category: 'Tools & Platforms', level: 'Expert' }
    ],
    actionVerbs: ['Coordinated', 'Streamlined', 'Delivered', 'Managed', 'Automated', 'Maintained'],
    commonResponsibilities: [
      'Executed diverse asynchronous digital operations for globally distributed teams across multiple international time zones.',
      'Maintained digital asset repositories, documented standard operating guidelines, and managed shared SaaS software tools.',
      'Automated recurring data entry routines using Zapier and spreadsheet scripting, saving 8+ hours weekly.'
    ],
    recommendedTools: ['Slack', 'Notion', 'Google Workspace', 'Asana', 'Loom', 'Zapier']
  },
  {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    category: 'Digital & Remote Work',
    defaultIndustry: 'Customer Support',
    defaultTemplate: 'minimal',
    defaultAccent: '#0f766e',
    keywords: ['virtual assistant', 'administrative support', 'calendar management', 'email management', 'client communication'],
    suggestedSkills: [
      { name: 'Time Management & Deadline Ownership', category: 'Soft Skills', level: 'Expert' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Google Workspace (Docs, Sheets)', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Organized', 'Coordinated', 'Scheduled', 'Drafted', 'Managed', 'Triaged'],
    commonResponsibilities: [
      'Provided executive-level administrative and scheduling support for C-suite leaders and busy remote founders.',
      'Triaged high-volume executive email inboxes, responding to routine inquiries and prioritizing urgent client communications.',
      'Coordinated complex international travel itineraries, expense reports, and digital document preparation.'
    ],
    recommendedTools: ['Google Calendar', 'Slack', 'Canva', 'Trello', 'Excel']
  },
  {
    id: 'customer-support-specialist',
    title: 'Customer Support Specialist',
    category: 'Customer & Technical Support',
    defaultIndustry: 'Customer Support',
    defaultTemplate: 'modern',
    defaultAccent: '#2563eb',
    keywords: ['customer support', 'CSAT', 'helpdesk', 'live chat', 'conflict resolution', 'Zendesk'],
    suggestedSkills: [
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Zendesk / Intercom', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Collaborative Feedback Reception', category: 'Soft Skills', level: 'Advanced' },
      { name: 'System Troubleshooting', category: 'Technical Skills', level: 'Intermediate' }
    ],
    actionVerbs: ['Resolved', 'Assisted', 'Handled', 'Communicated', 'De-escalated', 'Documented'],
    commonResponsibilities: [
      'Handled 60+ daily omnichannel customer inquiries via live chat, email, and ticketing queues with a 97% positive satisfaction score.',
      'De-escalated dissatisfied customers through empathetic active listening, clear explanations, and decisive dispute resolution.',
      'Collaborated with product teams to highlight recurring customer friction points and proposed self-service improvements.'
    ],
    recommendedTools: ['Zendesk', 'Intercom', 'Slack', 'Google Docs', 'HubSpot']
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    category: 'Creative & Marketing',
    defaultIndustry: 'Media',
    defaultTemplate: 'creative',
    defaultAccent: '#d97706',
    keywords: ['content writer', 'copywriting', 'blog writing', 'SEO articles', 'research', 'editorial'],
    suggestedSkills: [
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'SEO Content Strategy', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Fact-Checking & Source Verification', category: 'Technical Skills', level: 'Advanced' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Authored', 'Researched', 'Published', 'Optimized', 'Drafted', 'Created'],
    commonResponsibilities: [
      'Authored 40+ long-form, high-ranking technical articles and guides driving organic search traffic and user engagement.',
      'Researched emerging technology trends, interviewing subject matter experts to craft insightful, authoritative thought leadership.',
      'Edited and optimized legacy articles for readability, fresh citations, and alignment with target search keywords.'
    ],
    recommendedTools: ['Google Docs', 'WordPress', 'Grammarly', 'Semrush', 'Airtable']
  },
  {
    id: 'seo-specialist',
    title: 'SEO Specialist',
    category: 'Creative & Marketing',
    defaultIndustry: 'Digital Marketing',
    defaultTemplate: 'modern',
    defaultAccent: '#ea580c',
    keywords: ['SEO', 'search engine optimization', 'keyword research', 'Core Web Vitals', 'backlinks', 'Google Analytics'],
    suggestedSkills: [
      { name: 'SEO Core Web Vitals Standards', category: 'Industry Skills', level: 'Expert' },
      { name: 'Google Analytics 4 & Search Console', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Keyword Research & Competitor Analysis', category: 'Industry Skills', level: 'Expert' },
      { name: 'HTML5 & CSS3 Inspection', category: 'Technical Skills', level: 'Intermediate' }
    ],
    actionVerbs: ['Optimized', 'Analyzed', 'Audited', 'Boosted', 'Tracked', 'Executed'],
    commonResponsibilities: [
      'Executed technical SEO site audits, addressing crawl budget inefficiencies, canonical duplicates, and structured schema errors.',
      'Identified high-intent search keyword clusters that generated a 45% year-over-year increase in qualified organic search visitors.',
      'Monitored keyword ranking trajectories and Core Web Vitals metrics via Google Search Console and Google Analytics 4.'
    ],
    recommendedTools: ['Ahrefs', 'Semrush', 'Google Search Console', 'Screaming Frog', 'GA4']
  },
  {
    id: 'social-media-specialist',
    title: 'Social Media Specialist',
    category: 'Creative & Marketing',
    defaultIndustry: 'Digital Marketing',
    defaultTemplate: 'creative',
    defaultAccent: '#ec4899',
    keywords: ['social media', 'community growth', 'engagement', 'content calendar', 'analytics', 'campaigns'],
    suggestedSkills: [
      { name: 'Social Media Campaign Strategy', category: 'Industry Skills', level: 'Expert' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Canva / Visual Creative', category: 'Tools & Platforms', level: 'Advanced' },
      { name: 'Audience Engagement Analytics', category: 'Industry Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Spearheaded', 'Created', 'Grew', 'Curated', 'Engaged', 'Monitored'],
    commonResponsibilities: [
      'Curated and published weekly social media content calendars across LinkedIn, X/Twitter, and YouTube.',
      'Grew active community engagement metrics by 65% through responsive community discussions and timely product updates.',
      'Analyzed post impressions and follower conversion metrics to continuously refine content distribution strategies.'
    ],
    recommendedTools: ['Buffer', 'Hootsuite', 'Canva', 'Meta Business Suite', 'Slack']
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    category: 'Creative & Marketing',
    defaultIndustry: 'Digital Marketing',
    defaultTemplate: 'modern',
    defaultAccent: '#db2777',
    keywords: ['digital marketing', 'PPC', 'paid ads', 'funnels', 'email marketing', 'conversion rate'],
    suggestedSkills: [
      { name: 'Paid Acquisition & Google Ads', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Email Marketing & Automation', category: 'Industry Skills', level: 'Advanced' },
      { name: 'Analytical Problem Solving', category: 'Soft Skills', level: 'Expert' },
      { name: 'Google Analytics 4', category: 'Tools & Platforms', level: 'Advanced' }
    ],
    actionVerbs: ['Managed', 'Optimized', 'Scaled', 'Analyzed', 'Launched', 'Generated'],
    commonResponsibilities: [
      'Managed multi-channel digital acquisition funnels across paid search, social media, and automated drip email sequences.',
      'A/B tested ad copy, creative variants, and landing page headlines, improving conversion rates by 24%.',
      'Tracked return on ad spend (ROAS) and customer acquisition cost (CAC) metrics to maximize marketing efficiency.'
    ],
    recommendedTools: ['Google Ads', 'HubSpot', 'Meta Ads Manager', 'Mailchimp', 'GA4']
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    category: 'Creative & Marketing',
    defaultIndustry: 'Media',
    defaultTemplate: 'creative',
    defaultAccent: '#9333ea',
    keywords: ['graphic design', 'visual identity', 'branding', 'typography', 'Figma', 'Adobe Creative Cloud'],
    suggestedSkills: [
      { name: 'Figma & Visual Design', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Adobe Illustrator & Photoshop', category: 'Tools & Platforms', level: 'Expert' },
      { name: 'Brand Identity & Typography', category: 'Industry Skills', level: 'Expert' },
      { name: 'High Attention to Detail', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Designed', 'Illustrated', 'Concepted', 'Standardized', 'Produced', 'Delivered'],
    commonResponsibilities: [
      'Designed high-impact visual assets, marketing collateral, brand guidelines, and social media creative for digital campaigns.',
      'Standardized typography systems, color palettes, and icon libraries across all client-facing digital touchpoints.',
      'Collaborated with marketing and development teams to export web-optimized SVG and webp assets ensuring high visual fidelity.'
    ],
    recommendedTools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Canva']
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    category: 'Development & Engineering',
    defaultIndustry: 'Technology',
    defaultTemplate: 'technical',
    defaultAccent: '#2563eb',
    keywords: ['web development', 'HTML/CSS', 'JavaScript', 'responsive web', 'Git', 'web apps'],
    suggestedSkills: [
      { name: 'HTML5 & CSS3', category: 'Technical Skills', level: 'Expert' },
      { name: 'JavaScript/TypeScript', category: 'Technical Skills', level: 'Expert' },
      { name: 'Git & Version Control', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Responsive Layouts & Tailwind CSS', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Developed', 'Built', 'Implemented', 'Refactored', 'Deployed', 'Maintained'],
    commonResponsibilities: [
      'Built fast, accessible, and mobile-first web applications using modern JavaScript, CSS flexbox/grid, and semantic HTML.',
      'Integrated third-party REST APIs and payment gateways, implementing client-side validation and error state handling.',
      'Optimized asset payloads and script execution, improving Google Lighthouse performance scores from 68 to 98.'
    ],
    recommendedTools: ['VS Code', 'Git', 'GitHub', 'Chrome DevTools', 'Vite', 'Tailwind']
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Development & Engineering',
    defaultIndustry: 'Technology',
    defaultTemplate: 'technical',
    defaultAccent: '#0284c7',
    keywords: ['frontend', 'React', 'TypeScript', 'Next.js', 'state management', 'UI components', 'web performance'],
    suggestedSkills: [
      { name: 'JavaScript/TypeScript', category: 'Technical Skills', level: 'Expert' },
      { name: 'React / Next.js Framework', category: 'Technical Skills', level: 'Expert' },
      { name: 'API Integration', category: 'Technical Skills', level: 'Expert' },
      { name: 'Browser Developer Tools', category: 'Technical Skills', level: 'Expert' }
    ],
    actionVerbs: ['Architected', 'Engineered', 'Created', 'Optimized', 'Refactored', 'Tested'],
    commonResponsibilities: [
      'Architected modular, accessible UI component libraries in React and TypeScript with comprehensive test coverage.',
      'Implemented clean client-side state management and asynchronous data fetching with optimistic UI updates.',
      'Audited client bundle sizes, employing code-splitting and dynamic imports to reduce initial page load times.'
    ],
    recommendedTools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub', 'Jest']
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Development & Engineering',
    defaultIndustry: 'Software',
    defaultTemplate: 'technical',
    defaultAccent: '#0f766e',
    keywords: ['backend', 'Node.js', 'Python', 'SQL', 'REST API', 'microservices', 'databases'],
    suggestedSkills: [
      { name: 'Node.js / Python Backend', category: 'Technical Skills', level: 'Expert' },
      { name: 'SQL Queries & Database Schema', category: 'Technical Skills', level: 'Expert' },
      { name: 'API Integration & REST Architecture', category: 'Technical Skills', level: 'Expert' },
      { name: 'Linux/Unix Command Line', category: 'Technical Skills', level: 'Advanced' }
    ],
    actionVerbs: ['Engineered', 'Designed', 'Constructed', 'Secured', 'Scaled', 'Optimized'],
    commonResponsibilities: [
      'Designed scalable REST and GraphQL API services handling high concurrent throughput with low latency.',
      'Constructed database schemas, optimized SQL query execution plans, and implemented Redis caching layers.',
      'Secured backend endpoints with JWT authentication, rate limiting, and input sanitization to guard against injection attacks.'
    ],
    recommendedTools: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Postman', 'Git']
  },
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    category: 'Development & Engineering',
    defaultIndustry: 'Technology',
    defaultTemplate: 'technical',
    defaultAccent: '#1d4ed8',
    keywords: ['full-stack', 'React', 'Node.js', 'database', 'cloud deployment', 'full lifecycle'],
    suggestedSkills: [
      { name: 'JavaScript/TypeScript', category: 'Technical Skills', level: 'Expert' },
      { name: 'React / Next.js', category: 'Technical Skills', level: 'Expert' },
      { name: 'Node.js / Python Backend', category: 'Technical Skills', level: 'Advanced' },
      { name: 'SQL Queries', category: 'Technical Skills', level: 'Advanced' },
      { name: 'Git & Version Control', category: 'Technical Skills', level: 'Expert' }
    ],
    actionVerbs: ['Developed', 'Architected', 'Shipped', 'Integrated', 'Maintained', 'Standardized'],
    commonResponsibilities: [
      'Delivered full-stack web applications from initial database schema modeling to responsive frontend user interfaces.',
      'Integrated payment gateways, authentication providers, and third-party SaaS APIs seamlessly across front and backend layers.',
      'Managed CI/CD deployment pipelines, maintaining 99.9% application uptime and continuous integration testing.'
    ],
    recommendedTools: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'general-technology-professional',
    title: 'General Technology Professional',
    category: 'General Technology',
    defaultIndustry: 'Technology',
    defaultTemplate: 'modern',
    defaultAccent: '#334155',
    keywords: ['technology professional', 'technical solutions', 'digital systems', 'cross-functional execution', 'IT'],
    suggestedSkills: [
      { name: 'System Troubleshooting', category: 'Technical Skills', level: 'Expert' },
      { name: 'Analytical Problem Solving', category: 'Soft Skills', level: 'Expert' },
      { name: 'Written Technical Communication', category: 'Soft Skills', level: 'Expert' },
      { name: 'Time Management & Deadline Ownership', category: 'Soft Skills', level: 'Expert' }
    ],
    actionVerbs: ['Managed', 'Coordinated', 'Implemented', 'Resolved', 'Streamlined', 'Delivered'],
    commonResponsibilities: [
      'Managed end-to-end technical deliverables, bridging gaps between engineering teams, stakeholders, and end users.',
      'Identified operational inefficiencies and implemented modern digital tooling to streamline team collaboration.',
      'Synthesized complex technical concepts into clear executive summaries and operational documentation.'
    ],
    recommendedTools: ['Slack', 'Jira', 'Google Workspace', 'Notion', 'Excel']
  }
];

export function findRoleDefinition(roleTitleOrId: string): RoleDefinition | undefined {
  const clean = roleTitleOrId.trim().toLowerCase();
  return ROBOTIC_ROLES_MASTER.find(
    r => r.id.toLowerCase() === clean || r.title.toLowerCase() === clean
  );
}
