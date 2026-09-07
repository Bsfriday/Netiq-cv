export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategoryName;
  description: string;
  tags: string[];
  relatedSkills: string[];
}

export type SkillCategoryName = 
  | 'AI & Machine Learning'
  | 'Data Annotation & Labeling'
  | 'AI Evaluation'
  | 'Software Testing & QA'
  | 'Data & Analytics'
  | 'Technology'
  | 'Digital & Remote Work';

export interface SkillCategoryInfo {
  name: SkillCategoryName;
  badgeColor: string;
  description: string;
}

export const SKILL_CATEGORIES_INFO: SkillCategoryInfo[] = [
  {
    name: 'AI & Machine Learning',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Generative AI, prompting, LLMs, RAG, and foundation model workflows'
  },
  {
    name: 'Data Annotation & Labeling',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Ground truth generation, vision, audio, text, and multimodal tagging'
  },
  {
    name: 'AI Evaluation',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Model ranking, hallucination mitigation, safety auditing, and benchmark testing'
  },
  {
    name: 'Software Testing & QA',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Manual testing, test planning, bug tracking, and defect lifecycle management'
  },
  {
    name: 'Data & Analytics',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    description: 'Data cleaning, validation, SQL, Excel, and exploratory analytical insights'
  },
  {
    name: 'Technology',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Python, Git, REST APIs, Linux, Jira, cloud tooling, and systems'
  },
  {
    name: 'Digital & Remote Work',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    description: 'Async collaboration, strict SOP adherence, high throughput, and quality standards'
  }
];

export const ROBOTIC_SKILLS_LIBRARY: SkillDefinition[] = [
  // ==========================================
  // 1. AI & Machine Learning (24 Skills)
  // ==========================================
  {
    id: 'aiml-01',
    name: 'Prompt Engineering',
    category: 'AI & Machine Learning',
    description: 'Crafting structured, reproducible instructions for foundation models and generative AI systems.',
    tags: ['ai', 'prompt', 'llm', 'generative', 'engineering'],
    relatedSkills: ['Prompt Optimization', 'Chain-of-Thought Prompting', 'Few-Shot Prompting', 'Generative AI']
  },
  {
    id: 'aiml-02',
    name: 'Prompt Optimization',
    category: 'AI & Machine Learning',
    description: 'Iteratively refining system and user prompts to maximize answer accuracy and reduce token usage.',
    tags: ['ai', 'prompt', 'tokens', 'optimization', 'refinement'],
    relatedSkills: ['Prompt Engineering', 'System Prompt Architecture', 'Context Window Management']
  },
  {
    id: 'aiml-03',
    name: 'LLM Fine-Tuning Concepts',
    category: 'AI & Machine Learning',
    description: 'Understanding dataset curation, LoRA/PEFT concepts, and supervised fine-tuning paradigms.',
    tags: ['llm', 'fine-tuning', 'models', 'machine-learning', 'weights'],
    relatedSkills: ['Generative AI', 'Model Evaluation', 'Vector Search & Embeddings']
  },
  {
    id: 'aiml-04',
    name: 'Generative AI',
    category: 'AI & Machine Learning',
    description: 'Leveraging modern generative models for text, code, imagery, and multimodal synthesis.',
    tags: ['genai', 'generative', 'diffusion', 'llm', 'chatgpt', 'gemini'],
    relatedSkills: ['Prompt Engineering', 'Multi-Modal AI Prompting', 'AI Workflow Automation']
  },
  {
    id: 'aiml-05',
    name: 'AI Workflow Automation',
    category: 'AI & Machine Learning',
    description: 'Connecting AI models into automated business pipelines, batch jobs, and operational loops.',
    tags: ['automation', 'pipelines', 'workflows', 'productivity', 'agents'],
    relatedSkills: ['AI Agent Systems', 'REST APIs', 'Generative AI']
  },
  {
    id: 'aiml-06',
    name: 'Natural Language Processing (NLP)',
    category: 'AI & Machine Learning',
    description: 'Working with tokenization, semantic similarity, embeddings, and linguistic structures.',
    tags: ['nlp', 'linguistics', 'text', 'language', 'embeddings'],
    relatedSkills: ['Named Entity Recognition (NER)', 'Text Classification', 'Vector Search & Embeddings']
  },
  {
    id: 'aiml-07',
    name: 'Computer Vision Concepts',
    category: 'AI & Machine Learning',
    description: 'Foundations of object detection, image segmentation, optical recognition, and bounding frames.',
    tags: ['cv', 'vision', 'bounding-box', 'segmentation', 'images'],
    relatedSkills: ['Bounding Box Annotation', 'Image Segmentation', 'Multi-Modal AI Prompting']
  },
  {
    id: 'aiml-08',
    name: 'Retrieval-Augmented Generation (RAG)',
    category: 'AI & Machine Learning',
    description: 'Architecting grounded knowledge retrieval loops via vector stores and document indexing.',
    tags: ['rag', 'retrieval', 'vector', 'embeddings', 'grounding'],
    relatedSkills: ['Vector Search & Embeddings', 'Context Window Management', 'Prompt Engineering']
  },
  {
    id: 'aiml-09',
    name: 'Model Evaluation',
    category: 'AI & Machine Learning',
    description: 'Systematic assessment of model capabilities, accuracy thresholds, and degradation benchmarks.',
    tags: ['evaluation', 'metrics', 'benchmarks', 'accuracy', 'testing'],
    relatedSkills: ['LLM Response Evaluation', 'AI Output Benchmarking', 'Metric-Based Evaluation']
  },
  {
    id: 'aiml-10',
    name: 'AI Output Benchmarking',
    category: 'AI & Machine Learning',
    description: 'Comparative testing of generative outputs against standardized rubrics and quality baselines.',
    tags: ['benchmarks', 'metrics', 'comparisons', 'baselines'],
    relatedSkills: ['Model Evaluation', 'Cross-Model Comparison', 'Rubric-Based Scoring']
  },
  {
    id: 'aiml-11',
    name: 'AI Bias Detection',
    category: 'AI & Machine Learning',
    description: 'Auditing outputs for demographic, cognitive, regional, or linguistic skew and unfairness.',
    tags: ['bias', 'ethics', 'fairness', 'auditing', 'safety'],
    relatedSkills: ['AI Safety', 'AI Ethics', 'Toxicity Filtering']
  },
  {
    id: 'aiml-12',
    name: 'AI Safety',
    category: 'AI & Machine Learning',
    description: 'Ensuring model systems prevent dangerous, harmful, illegal, or unethical generations.',
    tags: ['safety', 'guardrails', 'alignment', 'content-policy'],
    relatedSkills: ['AI Bias Detection', 'AI Ethics', 'Red Teaming AI', 'Content Policy Verification']
  },
  {
    id: 'aiml-13',
    name: 'AI Ethics',
    category: 'AI & Machine Learning',
    description: 'Applying regulatory guidelines, copyright integrity, transparency, and humane AI principles.',
    tags: ['ethics', 'compliance', 'transparency', 'governance'],
    relatedSkills: ['AI Safety', 'AI Bias Detection', 'Data Integrity Auditing']
  },
  {
    id: 'aiml-14',
    name: 'Human-in-the-loop AI',
    category: 'AI & Machine Learning',
    description: 'Designing and executing human review workflows to supervise, correct, and validate model cycles.',
    tags: ['hitl', 'human-in-the-loop', 'supervision', 'annotation', 'review'],
    relatedSkills: ['Reinforcement Learning from Human Feedback (RLHF)', 'Ground Truth Generation', 'Data Annotation']
  },
  {
    id: 'aiml-15',
    name: 'Reinforcement Learning from Human Feedback (RLHF)',
    category: 'AI & Machine Learning',
    description: 'Pairwise ranking and preference modeling based on human annotator decisions and rubrics.',
    tags: ['rlhf', 'human-feedback', 'alignment', 'preference-scoring'],
    relatedSkills: ['Model Ranking & Preference Scoring', 'Human-in-the-loop AI', 'Rubric-Based Scoring']
  },
  {
    id: 'aiml-16',
    name: 'Red Teaming AI',
    category: 'AI & Machine Learning',
    description: 'Probing model boundaries, adversarial jailbreaks, prompt injection, and security vulnerabilities.',
    tags: ['red-teaming', 'jailbreak', 'adversarial', 'security', 'penetration'],
    relatedSkills: ['Adversarial Prompt Testing', 'AI Safety', 'Edge Case Identification']
  },
  {
    id: 'aiml-17',
    name: 'Context Window Management',
    category: 'AI & Machine Learning',
    description: 'Structuring long-context documents, needle-in-haystack recall, token pruning, and chunking.',
    tags: ['context', 'tokens', 'memory', 'chunking', 'window'],
    relatedSkills: ['Retrieval-Augmented Generation (RAG)', 'Prompt Optimization', 'Few-Shot Prompting']
  },
  {
    id: 'aiml-18',
    name: 'Multi-Modal AI Prompting',
    category: 'AI & Machine Learning',
    description: 'Querying and synthesizing across combined inputs of image, audio, video, document, and text.',
    tags: ['multimodal', 'vision', 'audio', 'video', 'prompting'],
    relatedSkills: ['Prompt Engineering', 'Computer Vision Concepts', 'Video Tracking Annotation']
  },
  {
    id: 'aiml-19',
    name: 'AI Agent Systems',
    category: 'AI & Machine Learning',
    description: 'Orchestrating autonomous agents with tool-calling, memory persistence, and execution plans.',
    tags: ['agents', 'autonomous', 'tool-use', 'function-calling', 'orchestration'],
    relatedSkills: ['AI Workflow Automation', 'Prompt Engineering', 'REST APIs']
  },
  {
    id: 'aiml-20',
    name: 'AI Content Moderation',
    category: 'AI & Machine Learning',
    description: 'Classifying user inputs and model outputs against trust and safety guardrails and hate-speech filters.',
    tags: ['moderation', 'safety', 'trust', 'filtering', 'policy'],
    relatedSkills: ['Toxicity Filtering', 'AI Safety', 'Content Policy Verification']
  },
  {
    id: 'aiml-21',
    name: 'Few-Shot Prompting',
    category: 'AI & Machine Learning',
    description: 'Crafting diverse in-context exemplars to guide generative outputs with zero extra model training.',
    tags: ['few-shot', 'in-context', 'examples', 'prompting'],
    relatedSkills: ['Prompt Engineering', 'Chain-of-Thought Prompting', 'Prompt Optimization']
  },
  {
    id: 'aiml-22',
    name: 'Chain-of-Thought Prompting',
    category: 'AI & Machine Learning',
    description: 'Guiding step-by-step reasoning sequences to resolve complex mathematical and logical queries.',
    tags: ['cot', 'chain-of-thought', 'reasoning', 'logic', 'prompts'],
    relatedSkills: ['Reasoning Verification', 'Prompt Engineering', 'Few-Shot Prompting']
  },
  {
    id: 'aiml-23',
    name: 'System Prompt Architecture',
    category: 'AI & Machine Learning',
    description: 'Designing role definition, response constraints, behavioral guardrails, and tone guidelines.',
    tags: ['system-prompt', 'persona', 'guardrails', 'architecture'],
    relatedSkills: ['Prompt Engineering', 'Prompt Optimization', 'AI Safety']
  },
  {
    id: 'aiml-24',
    name: 'Vector Search & Embeddings',
    category: 'AI & Machine Learning',
    description: 'Utilizing cosine similarity, semantic search indexes, dense vector spaces, and chunking schemas.',
    tags: ['vectors', 'embeddings', 'similarity', 'pinecone', 'chroma'],
    relatedSkills: ['Retrieval-Augmented Generation (RAG)', 'Natural Language Processing (NLP)', 'SQL Querying']
  },

  // ==========================================
  // 2. Data Annotation & Labeling (20 Skills)
  // ==========================================
  {
    id: 'data-01',
    name: 'Data Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Tagging raw data with categorical, spatial, or descriptive labels according to strict specifications.',
    tags: ['annotation', 'labeling', 'data', 'tagging', 'ground-truth'],
    relatedSkills: ['Data Labeling', 'Labeling Guideline Adherence', 'Annotation Quality Assurance']
  },
  {
    id: 'data-02',
    name: 'Data Labeling',
    category: 'Data Annotation & Labeling',
    description: 'Systematic attribution of labels to train, fine-tune, and benchmark machine learning models.',
    tags: ['labeling', 'annotation', 'dataset', 'classification'],
    relatedSkills: ['Data Annotation', 'Ground Truth Generation', 'Dataset Auditing']
  },
  {
    id: 'data-03',
    name: 'Image Segmentation',
    category: 'Data Annotation & Labeling',
    description: 'Delineating individual pixel boundaries of objects within complex imagery.',
    tags: ['segmentation', 'vision', 'pixels', 'masking', 'images'],
    relatedSkills: ['Polygon Annotation', 'Semantic Segmentation', 'Bounding Box Annotation']
  },
  {
    id: 'data-04',
    name: 'Bounding Box Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Drawing 2D rectangular bounding boxes around objects with strict pixel tolerances.',
    tags: ['bounding-box', 'bbox', 'vision', 'object-detection', 'labelbox'],
    relatedSkills: ['Polygon Annotation', 'Image Segmentation', 'Computer Vision Concepts']
  },
  {
    id: 'data-05',
    name: 'Polygon Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Tracing multi-vertex geometric outlines around irregular shapes and complex contours.',
    tags: ['polygon', 'vertices', 'contours', 'geometry', 'vision'],
    relatedSkills: ['Bounding Box Annotation', 'Image Segmentation', 'Keypoint Annotation']
  },
  {
    id: 'data-06',
    name: 'Keypoint Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Pinpointing skeletal joints, facial landmarks, and structural nodes on photographic subjects.',
    tags: ['keypoints', 'landmarks', 'pose', 'skeleton', 'facial'],
    relatedSkills: ['Polygon Annotation', 'Bounding Box Annotation', 'Image Segmentation']
  },
  {
    id: 'data-07',
    name: 'Semantic Segmentation',
    category: 'Data Annotation & Labeling',
    description: 'Classifying every pixel in a scene into environmental classes (e.g. road, pedestrian, sky).',
    tags: ['semantic', 'segmentation', 'autonomous', 'pixels', 'classes'],
    relatedSkills: ['Image Segmentation', 'Polygon Annotation', 'Computer Vision Concepts']
  },
  {
    id: 'data-08',
    name: 'Video Tracking Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Tracking entity persistence and occlusion across sequential video frames with unique IDs.',
    tags: ['video', 'tracking', 'frames', 'temporal', 'interpolation'],
    relatedSkills: ['Bounding Box Annotation', 'Multi-Modal AI Prompting', 'Data Annotation']
  },
  {
    id: 'data-09',
    name: 'Audio Transcription',
    category: 'Data Annotation & Labeling',
    description: 'Converting multi-speaker audio recordings into verbatim text with timestamps and phonetics.',
    tags: ['audio', 'transcription', 'speech', 'verbatim', 'timestamps'],
    relatedSkills: ['Text Classification', 'Attention to Detail', 'Data Annotation']
  },
  {
    id: 'data-10',
    name: 'Text Classification',
    category: 'Data Annotation & Labeling',
    description: 'Assigning predefined taxonomical classes, topics, or categories to textual passages.',
    tags: ['classification', 'text', 'categories', 'taxonomy', 'nlp'],
    relatedSkills: ['Named Entity Recognition (NER)', 'Intent Classification', 'Sentiment Annotation']
  },
  {
    id: 'data-11',
    name: 'Named Entity Recognition (NER)',
    category: 'Data Annotation & Labeling',
    description: 'Extracting and labeling proper nouns, dates, locations, organizations, and sensitive PII.',
    tags: ['ner', 'entities', 'pii', 'extraction', 'nlp'],
    relatedSkills: ['Text Classification', 'Natural Language Processing (NLP)', 'Metadata Tagging']
  },
  {
    id: 'data-12',
    name: 'Intent Classification',
    category: 'Data Annotation & Labeling',
    description: 'Identifying the underlying goal or action requested in conversational customer queries.',
    tags: ['intent', 'dialogue', 'chatbots', 'customer-queries'],
    relatedSkills: ['Text Classification', 'Sentiment Annotation', 'Multi-Turn Conversation Tagging']
  },
  {
    id: 'data-13',
    name: 'Sentiment Annotation',
    category: 'Data Annotation & Labeling',
    description: 'Evaluating emotional polarity, subjectivity, and tone across customer reviews and messages.',
    tags: ['sentiment', 'emotion', 'polarity', 'tone', 'reviews'],
    relatedSkills: ['Text Classification', 'Intent Classification', 'Attention to Detail']
  },
  {
    id: 'data-14',
    name: 'Multi-Turn Conversation Tagging',
    category: 'Data Annotation & Labeling',
    description: 'Labeling speaker turns, contextual dependencies, coreference, and coherence across chats.',
    tags: ['dialogue', 'multi-turn', 'conversations', 'coherence', 'chat'],
    relatedSkills: ['Intent Classification', 'Semantic Coherence Review', 'LLM Response Evaluation']
  },
  {
    id: 'data-15',
    name: 'Content Categorization',
    category: 'Data Annotation & Labeling',
    description: 'Organizing diverse media into deep hierarchical taxonomies and catalog structures.',
    tags: ['categorization', 'taxonomy', 'hierarchy', 'catalog'],
    relatedSkills: ['Metadata Tagging', 'Text Classification', 'Data Labeling']
  },
  {
    id: 'data-16',
    name: 'Metadata Tagging',
    category: 'Data Annotation & Labeling',
    description: 'Appending schema-compliant technical, copyright, temporal, and spatial descriptors.',
    tags: ['metadata', 'tags', 'descriptors', 'attributes', 'schema'],
    relatedSkills: ['Content Categorization', 'Data Cleaning', 'Data Labeling']
  },
  {
    id: 'data-17',
    name: 'Ground Truth Generation',
    category: 'Data Annotation & Labeling',
    description: 'Producing verified gold-standard reference datasets used to validate automated AI systems.',
    tags: ['ground-truth', 'gold-standard', 'reference', 'validation'],
    relatedSkills: ['Dataset Auditing', 'Annotation Quality Assurance', 'Human-in-the-loop AI']
  },
  {
    id: 'data-18',
    name: 'Dataset Auditing',
    category: 'Data Annotation & Labeling',
    description: 'Statistical inspection of existing datasets for mislabeled entries, label leakage, and voids.',
    tags: ['auditing', 'inspection', 'quality', 'dataset', 'verification'],
    relatedSkills: ['Ground Truth Generation', 'Annotation Quality Assurance', 'Data Integrity Auditing']
  },
  {
    id: 'data-19',
    name: 'Annotation Quality Assurance',
    category: 'Data Annotation & Labeling',
    description: 'Conducting inter-annotator agreement (Cohen Kappa) checks and blind error scoring.',
    tags: ['qa', 'quality', 'inter-annotator', 'cohen-kappa', 'accuracy'],
    relatedSkills: ['Labeling Guideline Adherence', 'Dataset Auditing', 'Ground Truth Generation']
  },
  {
    id: 'data-20',
    name: 'Labeling Guideline Adherence',
    category: 'Data Annotation & Labeling',
    description: 'Reading, internalizing, and rigorously applying hundreds of pages of complex labeling rubrics.',
    tags: ['guidelines', 'rubrics', 'sop', 'compliance', 'rigor'],
    relatedSkills: ['Strict Standard Operating Procedure (SOP) Adherence', 'Attention to Detail', 'Annotation Quality Assurance']
  },

  // ==========================================
  // 3. AI Evaluation (18 Skills)
  // ==========================================
  {
    id: 'aiev-01',
    name: 'LLM Response Evaluation',
    category: 'AI Evaluation',
    description: 'Assessing generated text against relevance, conciseness, instruction following, and accuracy.',
    tags: ['evaluation', 'llm', 'responses', 'ratings', 'quality'],
    relatedSkills: ['Prompt-Response Alignment', 'Model Ranking & Preference Scoring', 'Factuality Checking']
  },
  {
    id: 'aiev-02',
    name: 'AI Hallucination Detection',
    category: 'AI Evaluation',
    description: 'Detecting plausible-sounding but completely fabricated facts, quotes, dates, or citations.',
    tags: ['hallucinations', 'facts', 'verification', 'accuracy', 'truthfulness'],
    relatedSkills: ['Factuality Checking', 'Reasoning Verification', 'Output Fidelity Auditing']
  },
  {
    id: 'aiev-03',
    name: 'Factuality Checking',
    category: 'AI Evaluation',
    description: 'Verifying every affirmative claim against authoritative primary sources and ground truths.',
    tags: ['facts', 'verification', 'claims', 'sources', 'accuracy'],
    relatedSkills: ['AI Hallucination Detection', 'LLM Response Evaluation', 'Critical Thinking']
  },
  {
    id: 'aiev-04',
    name: 'Toxicity Filtering',
    category: 'AI Evaluation',
    description: 'Screening for explicit violence, hate speech, harassment, self-harm, and inappropriate tones.',
    tags: ['toxicity', 'moderation', 'safety', 'guardrails', 'harassment'],
    relatedSkills: ['AI Safety Evaluation', 'Content Policy Verification', 'AI Content Moderation']
  },
  {
    id: 'aiev-05',
    name: 'Model Ranking & Preference Scoring',
    category: 'AI Evaluation',
    description: 'Executing side-by-side A/B comparisons and ranking multiple candidate model outputs.',
    tags: ['ranking', 'preference', 'pairwise', 'a-b-testing', 'rlhf'],
    relatedSkills: ['Reinforcement Learning from Human Feedback (RLHF)', 'Rubric-Based Scoring', 'Cross-Model Comparison']
  },
  {
    id: 'aiev-06',
    name: 'Semantic Coherence Review',
    category: 'AI Evaluation',
    description: 'Auditing sentence logic, argumentative continuity, grammatical cohesion, and narrative flow.',
    tags: ['coherence', 'semantics', 'grammar', 'flow', 'logic'],
    relatedSkills: ['Reasoning Verification', 'LLM Response Evaluation', 'Multi-Turn Conversation Tagging']
  },
  {
    id: 'aiev-07',
    name: 'AI Safety Evaluation',
    category: 'AI Evaluation',
    description: 'Testing if models refuse harmful requests gracefully without revealing exploitable vectors.',
    tags: ['safety', 'refusals', 'guardrails', 'alignment', 'compliance'],
    relatedSkills: ['Toxicity Filtering', 'Red Teaming AI', 'Content Policy Verification']
  },
  {
    id: 'aiev-08',
    name: 'Edge Case Identification',
    category: 'AI Evaluation',
    description: 'Uncovering ambiguous corner cases, boundary conditions, and unconventional user prompts.',
    tags: ['edge-cases', 'corner-cases', 'boundaries', 'testing', 'anomalies'],
    relatedSkills: ['Adversarial Prompt Testing', 'Consistency Testing', 'Exploratory Testing']
  },
  {
    id: 'aiev-09',
    name: 'Consistency Testing',
    category: 'AI Evaluation',
    description: 'Measuring whether equivalent prompts across different temperatures yield uniform answers.',
    tags: ['consistency', 'determinism', 'variance', 'temperature', 'reliability'],
    relatedSkills: ['Edge Case Identification', 'Output Fidelity Auditing', 'Regression Testing']
  },
  {
    id: 'aiev-10',
    name: 'Prompt-Response Alignment',
    category: 'AI Evaluation',
    description: 'Verifying that every explicit constraint (word count, format, tone, exclusions) was fulfilled.',
    tags: ['alignment', 'constraints', 'instructions', 'following', 'rubrics'],
    relatedSkills: ['LLM Response Evaluation', 'Rubric-Based Scoring', 'Prompt Engineering']
  },
  {
    id: 'aiev-11',
    name: 'Reasoning Verification',
    category: 'AI Evaluation',
    description: 'Inspecting the validity of intermediate logical steps in mathematical and deductive tasks.',
    tags: ['reasoning', 'logic', 'math', 'deduction', 'verification'],
    relatedSkills: ['Chain-of-Thought Prompting', 'AI Hallucination Detection', 'Factuality Checking']
  },
  {
    id: 'aiev-12',
    name: 'Cross-Model Comparison',
    category: 'AI Evaluation',
    description: 'Benchmarking latency, factual correctness, and stylistic quality across competing LLM architectures.',
    tags: ['cross-model', 'benchmarks', 'comparison', 'evaluation'],
    relatedSkills: ['Model Ranking & Preference Scoring', 'AI Output Benchmarking', 'Metric-Based Evaluation']
  },
  {
    id: 'aiev-13',
    name: 'Metric-Based Evaluation',
    category: 'AI Evaluation',
    description: 'Applying automated similarity metrics like BLEU, ROUGE, BERTScore, and exact string match.',
    tags: ['metrics', 'bleu', 'rouge', 'bertscore', 'quantitative'],
    relatedSkills: ['Model Evaluation', 'Cross-Model Comparison', 'Dataset Auditing']
  },
  {
    id: 'aiev-14',
    name: 'Human Evaluation Frameworks',
    category: 'AI Evaluation',
    description: 'Developing standardized rubric guidelines and Likert rating scales for human review cohorts.',
    tags: ['frameworks', 'likert', 'rubrics', 'human-eval', 'standards'],
    relatedSkills: ['Rubric-Based Scoring', 'Reinforcement Learning from Human Feedback (RLHF)', 'Labeling Guideline Adherence']
  },
  {
    id: 'aiev-15',
    name: 'Rubric-Based Scoring',
    category: 'AI Evaluation',
    description: 'Grading outputs systematically along predefined dimensions such as helpfulness, honesty, and harmlessness.',
    tags: ['rubric', 'scoring', 'dimensions', 'grades', 'criteria'],
    relatedSkills: ['Human Evaluation Frameworks', 'Prompt-Response Alignment', 'Model Ranking & Preference Scoring']
  },
  {
    id: 'aiev-16',
    name: 'Adversarial Prompt Testing',
    category: 'AI Evaluation',
    description: 'Formulating deceptive, nested, and trick questions to discover latent model failure modes.',
    tags: ['adversarial', 'tricks', 'stress-testing', 'jailbreaks'],
    relatedSkills: ['Red Teaming AI', 'Edge Case Identification', 'AI Safety Evaluation']
  },
  {
    id: 'aiev-17',
    name: 'Content Policy Verification',
    category: 'AI Evaluation',
    description: 'Cross-referencing generative content against company legal guidelines, terms of service, and copyright laws.',
    tags: ['policy', 'legal', 'compliance', 'tos', 'verification'],
    relatedSkills: ['AI Safety Evaluation', 'Toxicity Filtering', 'AI Ethics']
  },
  {
    id: 'aiev-18',
    name: 'Output Fidelity Auditing',
    category: 'AI Evaluation',
    description: 'Auditing whether synthetic summaries accurately represent the underlying source document without alteration.',
    tags: ['fidelity', 'summaries', 'source', 'accuracy', 'auditing'],
    relatedSkills: ['AI Hallucination Detection', 'Factuality Checking', 'Semantic Coherence Review']
  },

  // ==========================================
  // 4. Software Testing & QA (20 Skills)
  // ==========================================
  {
    id: 'qa-01',
    name: 'Quality Assurance (QA)',
    category: 'Software Testing & QA',
    description: 'Ensuring digital applications and workflows meet rigorous engineering specifications and user expectations.',
    tags: ['qa', 'quality', 'testing', 'standards', 'verification'],
    relatedSkills: ['Manual Testing', 'Test Case Design', 'Bug Reporting & Tracking']
  },
  {
    id: 'qa-02',
    name: 'Manual Testing',
    category: 'Software Testing & QA',
    description: 'Executing test scenarios manually across diverse devices, browsers, and user permissions.',
    tags: ['manual-testing', 'qa', 'execution', 'scenarios', 'devices'],
    relatedSkills: ['Quality Assurance (QA)', 'Exploratory Testing', 'Test Case Design']
  },
  {
    id: 'qa-03',
    name: 'Test Case Design',
    category: 'Software Testing & QA',
    description: 'Authoring clear, reproducible test cases with exact preconditions, test steps, and expected results.',
    tags: ['test-cases', 'design', 'test-plan', 'specifications'],
    relatedSkills: ['Test Plan Documentation', 'Bug Reporting & Tracking', 'Quality Assurance (QA)']
  },
  {
    id: 'qa-04',
    name: 'Bug Reporting & Tracking',
    category: 'Software Testing & QA',
    description: 'Filing clear, actionable defect tickets with reproduction steps, logs, screenshots, and severity ratings.',
    tags: ['bugs', 'defects', 'jira', 'tracking', 'reporting', 'tickets'],
    relatedSkills: ['Defect Lifecycle Management', 'Jira', 'Test Case Design']
  },
  {
    id: 'qa-05',
    name: 'Regression Testing',
    category: 'Software Testing & QA',
    description: 'Verifying that recent code changes or feature updates have not disrupted existing core functionality.',
    tags: ['regression', 'testing', 'releases', 'stability'],
    relatedSkills: ['Functional Testing', 'Post-Release Verification', 'Quality Assurance (QA)']
  },
  {
    id: 'qa-06',
    name: 'Exploratory Testing',
    category: 'Software Testing & QA',
    description: 'Simultaneously learning, designing, and executing dynamic test sequences without rigid scripts.',
    tags: ['exploratory', 'investigation', 'ad-hoc', 'edge-cases'],
    relatedSkills: ['Manual Testing', 'Edge Case Identification', 'Usability Testing']
  },
  {
    id: 'qa-07',
    name: 'User Acceptance Testing (UAT)',
    category: 'Software Testing & QA',
    description: 'Validating end-to-end user journeys against business stakeholder requirements and acceptance criteria.',
    tags: ['uat', 'acceptance', 'stakeholders', 'journeys', 'business'],
    relatedSkills: ['Test Plan Documentation', 'Functional Testing', 'Quality Assurance (QA)']
  },
  {
    id: 'qa-08',
    name: 'Functional Testing',
    category: 'Software Testing & QA',
    description: 'Confirming that software components behave strictly in accordance with documented functional specs.',
    tags: ['functional', 'specs', 'features', 'validation'],
    relatedSkills: ['Regression Testing', 'Manual Testing', 'Test Case Design']
  },
  {
    id: 'qa-09',
    name: 'API Testing Basics',
    category: 'Software Testing & QA',
    description: 'Testing endpoint responses, HTTP status codes, payloads, authentication headers, and error handling.',
    tags: ['api', 'postman', 'http', 'rest', 'json', 'endpoints'],
    relatedSkills: ['REST APIs', 'Postman Basics', 'JSON / XML Data Structures']
  },
  {
    id: 'qa-10',
    name: 'Web Application Testing',
    category: 'Software Testing & QA',
    description: 'Testing web frontend responsiveness, client routing, DOM interactions, cookies, and local storage.',
    tags: ['web', 'frontend', 'dom', 'browser', 'ui'],
    relatedSkills: ['Cross-Browser Testing', 'Usability Testing', 'Manual Testing']
  },
  {
    id: 'qa-11',
    name: 'Mobile Application Testing',
    category: 'Software Testing & QA',
    description: 'Verifying iOS and Android app behavior under diverse connectivity, screen aspect ratios, and interruptions.',
    tags: ['mobile', 'ios', 'android', 'devices', 'gestures'],
    relatedSkills: ['Web Application Testing', 'Manual Testing', 'Usability Testing']
  },
  {
    id: 'qa-12',
    name: 'Cross-Browser Testing',
    category: 'Software Testing & QA',
    description: 'Ensuring consistent rendering, CSS compatibility, and JavaScript execution on Chrome, Safari, Firefox, Edge.',
    tags: ['cross-browser', 'compatibility', 'chrome', 'safari', 'firefox'],
    relatedSkills: ['Web Application Testing', 'Usability Testing', 'Manual Testing']
  },
  {
    id: 'qa-13',
    name: 'Defect Lifecycle Management',
    category: 'Software Testing & QA',
    description: 'Tracking issues from initial triage through engineering assignment, patch verification, and closure.',
    tags: ['defects', 'lifecycle', 'triage', 'jira', 'workflow'],
    relatedSkills: ['Bug Reporting & Tracking', 'Jira', 'Root Cause Analysis']
  },
  {
    id: 'qa-14',
    name: 'Test Plan Documentation',
    category: 'Software Testing & QA',
    description: 'Authoring comprehensive test strategy documents outlining scope, risks, resources, and deliverables.',
    tags: ['test-plan', 'strategy', 'documentation', 'scope'],
    relatedSkills: ['Test Case Design', 'Technical Writing & Documentation', 'Quality Assurance (QA)']
  },
  {
    id: 'qa-15',
    name: 'Usability Testing',
    category: 'Software Testing & QA',
    description: 'Evaluating user interface ergonomics, navigation intuition, accessibility contrast, and readability.',
    tags: ['usability', 'ux', 'accessibility', 'ergonomics', 'ui'],
    relatedSkills: ['Web Application Testing', 'Exploratory Testing', 'Attention to Detail']
  },
  {
    id: 'qa-16',
    name: 'Performance Testing Concepts',
    category: 'Software Testing & QA',
    description: 'Understanding load times, time to first byte, server throttling, network latency, and throughput.',
    tags: ['performance', 'load', 'latency', 'ttfb', 'speed'],
    relatedSkills: ['API Testing Basics', 'REST APIs', 'Quality Assurance (QA)']
  },
  {
    id: 'qa-17',
    name: 'Test Data Preparation',
    category: 'Software Testing & QA',
    description: 'Generating realistic mock data, boundary values, edge payloads, and seed database fixtures.',
    tags: ['test-data', 'fixtures', 'mock-data', 'seeding', 'payloads'],
    relatedSkills: ['SQL Querying', 'Data Preprocessing', 'Test Case Design']
  },
  {
    id: 'qa-18',
    name: 'Root Cause Analysis',
    category: 'Software Testing & QA',
    description: 'Investigating underlying failure mechanisms rather than merely documenting symptoms.',
    tags: ['root-cause', 'investigation', 'debugging', 'troubleshooting'],
    relatedSkills: ['Technical Troubleshooting', 'Analytical Problem Solving', 'Bug Reporting & Tracking']
  },
  {
    id: 'qa-19',
    name: 'Post-Release Verification',
    category: 'Software Testing & QA',
    description: 'Performing smoke testing in production immediately following deployment to confirm service health.',
    tags: ['smoke-testing', 'production', 'post-release', 'verification'],
    relatedSkills: ['Regression Testing', 'Quality Assurance (QA)', 'Manual Testing']
  },
  {
    id: 'qa-20',
    name: 'SLA & KPI Compliance',
    category: 'Software Testing & QA',
    description: 'Maintaining strict fidelity to response time agreements, defect turnaround times, and quality quotas.',
    tags: ['sla', 'kpi', 'compliance', 'turnaround', 'quotas'],
    relatedSkills: ['SLA Discipline', 'Strict Standard Operating Procedure (SOP) Adherence', 'High-Throughput Task Delivery']
  },

  // ==========================================
  // 5. Data & Analytics (15 Skills)
  // ==========================================
  {
    id: 'data-an-01',
    name: 'Data Cleaning',
    category: 'Data & Analytics',
    description: 'Normalizing values, parsing corrupted strings, trimming whitespace, and addressing missing fields.',
    tags: ['cleaning', 'data', 'normalization', 'wrangling', 'preprocessing'],
    relatedSkills: ['Data Validation', 'Data Preprocessing', 'Dataset Deduplication']
  },
  {
    id: 'data-an-02',
    name: 'Data Validation',
    category: 'Data & Analytics',
    description: 'Enforcing schema constraints, data types, regular expressions, and range checks on ingested rows.',
    tags: ['validation', 'schema', 'types', 'integrity', 'rules'],
    relatedSkills: ['Data Cleaning', 'Data Integrity Auditing', 'SQL Querying']
  },
  {
    id: 'data-an-03',
    name: 'Data Preprocessing',
    category: 'Data & Analytics',
    description: 'Transforming raw unstructured streams into normalized tables ready for ML ingestion and queries.',
    tags: ['preprocessing', 'transformation', 'pipelines', 'etl'],
    relatedSkills: ['Data Cleaning', 'Python for Data Analysis', 'ETL Fundamentals']
  },
  {
    id: 'data-an-04',
    name: 'SQL Querying',
    category: 'Data & Analytics',
    description: 'Authoring robust SELECT queries, JOINs, aggregations, window functions, and CTEs.',
    tags: ['sql', 'database', 'queries', 'joins', 'postgresql', 'mysql'],
    relatedSkills: ['Python for Data Analysis', 'Data Validation', 'Data Cleaning']
  },
  {
    id: 'data-an-05',
    name: 'Python for Data Analysis',
    category: 'Data & Analytics',
    description: 'Using pandas and numpy to manipulate dataframes, filter records, and compute statistical aggregates.',
    tags: ['python', 'pandas', 'numpy', 'data-science', 'analysis'],
    relatedSkills: ['SQL Querying', 'Exploratory Data Analysis (EDA)', 'Data Cleaning']
  },
  {
    id: 'data-an-06',
    name: 'Excel Advanced Modeling',
    category: 'Data & Analytics',
    description: 'Building multi-tab models with VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, and dynamic formulas.',
    tags: ['excel', 'spreadsheets', 'vlookup', 'xlookup', 'pivot-tables'],
    relatedSkills: ['Google Sheets Automation', 'Data Visualization', 'Statistical Summarization']
  },
  {
    id: 'data-an-07',
    name: 'Google Sheets Automation',
    category: 'Data & Analytics',
    description: 'Automating collaborative sheets using formulas, IMPORTRANGE, QUERY, and lightweight macros.',
    tags: ['google-sheets', 'automation', 'spreadsheets', 'query-formula'],
    relatedSkills: ['Excel Advanced Modeling', 'Workflow Optimization', 'Data Cleaning']
  },
  {
    id: 'data-an-08',
    name: 'Data Visualization',
    category: 'Data & Analytics',
    description: 'Designing clear charts, bar plots, distribution histograms, and heatmaps to convey trends.',
    tags: ['visualization', 'charts', 'plots', 'dashboards', 'graphs'],
    relatedSkills: ['Business Intelligence Basics', 'Exploratory Data Analysis (EDA)', 'Statistical Summarization']
  },
  {
    id: 'data-an-09',
    name: 'Dataset Deduplication',
    category: 'Data & Analytics',
    description: 'Identifying exact and fuzzy duplicate records across relational tables using hashing and keys.',
    tags: ['deduplication', 'duplicates', 'cleaning', 'fuzzy-match'],
    relatedSkills: ['Data Cleaning', 'Data Validation', 'SQL Querying']
  },
  {
    id: 'data-an-10',
    name: 'Data Integrity Auditing',
    category: 'Data & Analytics',
    description: 'Conducting statistical spot checks and verifying foreign key relationships to prevent silent data loss.',
    tags: ['integrity', 'auditing', 'accuracy', 'consistency'],
    relatedSkills: ['Data Validation', 'Dataset Auditing', 'SQL Querying']
  },
  {
    id: 'data-an-11',
    name: 'Anomaly Detection',
    category: 'Data & Analytics',
    description: 'Detecting statistical outliers, abnormal spikes, sensor anomalies, and unusual user patterns.',
    tags: ['anomaly', 'outliers', 'detection', 'statistics', 'patterns'],
    relatedSkills: ['Statistical Summarization', 'Exploratory Data Analysis (EDA)', 'Data Integrity Auditing']
  },
  {
    id: 'data-an-12',
    name: 'ETL Fundamentals',
    category: 'Data & Analytics',
    description: 'Understanding Extract, Transform, Load pipelines, schedule triggers, and data warehousing basics.',
    tags: ['etl', 'pipelines', 'warehousing', 'transformation', 'data-engineering'],
    relatedSkills: ['Data Preprocessing', 'SQL Querying', 'Python for Data Analysis']
  },
  {
    id: 'data-an-13',
    name: 'Exploratory Data Analysis (EDA)',
    category: 'Data & Analytics',
    description: 'Investigating new datasets through descriptive stats, null counts, and distribution curves.',
    tags: ['eda', 'exploratory', 'statistics', 'distributions', 'insights'],
    relatedSkills: ['Python for Data Analysis', 'Data Visualization', 'Statistical Summarization']
  },
  {
    id: 'data-an-14',
    name: 'Statistical Summarization',
    category: 'Data & Analytics',
    description: 'Calculating means, medians, standard deviations, percentiles, confidence intervals, and ratios.',
    tags: ['statistics', 'summary', 'median', 'mean', 'percentiles'],
    relatedSkills: ['Exploratory Data Analysis (EDA)', 'Excel Advanced Modeling', 'Data Visualization']
  },
  {
    id: 'data-an-15',
    name: 'Business Intelligence Basics',
    category: 'Data & Analytics',
    description: 'Connecting database sources to reporting dashboards to track organizational KPIs over time.',
    tags: ['bi', 'business-intelligence', 'kpi', 'reporting', 'dashboards'],
    relatedSkills: ['Data Visualization', 'SQL Querying', 'Excel Advanced Modeling']
  },

  // ==========================================
  // 6. Technology (19 Skills)
  // ==========================================
  {
    id: 'tech-01',
    name: 'Python',
    category: 'Technology',
    description: 'Writing clean, modular Python code, scripts, CLI utilities, and automation workflows.',
    tags: ['python', 'scripting', 'programming', 'code'],
    relatedSkills: ['Python for Data Analysis', 'REST APIs', 'Git & Version Control']
  },
  {
    id: 'tech-02',
    name: 'SQL',
    category: 'Technology',
    description: 'Designing queries and interacting with relational database systems like PostgreSQL and MySQL.',
    tags: ['sql', 'database', 'rdbms', 'queries'],
    relatedSkills: ['SQL Querying', 'Data Validation', 'Python']
  },
  {
    id: 'tech-03',
    name: 'Git & Version Control',
    category: 'Technology',
    description: 'Branching, staging, committing, merging, rebasing, and resolving merge conflicts cleanly.',
    tags: ['git', 'version-control', 'branches', 'commits', 'merging'],
    relatedSkills: ['GitHub Workflow', 'CI/CD Fundamentals', 'Technology']
  },
  {
    id: 'tech-04',
    name: 'GitHub Workflow',
    category: 'Technology',
    description: 'Managing pull requests, code reviews, issue discussions, and repository documentation.',
    tags: ['github', 'pr', 'pull-requests', 'code-review', 'collaboration'],
    relatedSkills: ['Git & Version Control', 'Markdown Documentation', 'CI/CD Fundamentals']
  },
  {
    id: 'tech-05',
    name: 'REST APIs',
    category: 'Technology',
    description: 'Understanding REST architecture, HTTP methods (GET, POST, PUT, DELETE), headers, and payloads.',
    tags: ['rest', 'api', 'http', 'endpoints', 'json'],
    relatedSkills: ['API Testing Basics', 'Postman Basics', 'JSON / XML Data Structures']
  },
  {
    id: 'tech-06',
    name: 'JSON / XML Data Structures',
    category: 'Technology',
    description: 'Parsing, validating, serializing, and structuring hierarchical data payloads for web exchange.',
    tags: ['json', 'xml', 'data-formats', 'payloads', 'schema'],
    relatedSkills: ['REST APIs', 'Data Cleaning', 'API Testing Basics']
  },
  {
    id: 'tech-07',
    name: 'Linux / Bash Command Line',
    category: 'Technology',
    description: 'Navigating file systems, process management, shell scripting, grep/sed/awk, and SSH operations.',
    tags: ['linux', 'bash', 'shell', 'cli', 'terminal', 'unix'],
    relatedSkills: ['Git & Version Control', 'Cloud Platform Basics (AWS / GCP)', 'Technical Troubleshooting']
  },
  {
    id: 'tech-08',
    name: 'Cloud Platform Basics (AWS / GCP)',
    category: 'Technology',
    description: 'Foundations of cloud storage buckets (S3/GCS), compute instances, IAM roles, and cloud consoles.',
    tags: ['cloud', 'aws', 'gcp', 's3', 'storage', 'iam'],
    relatedSkills: ['Docker & Containerization Concepts', 'Linux / Bash Command Line', 'REST APIs']
  },
  {
    id: 'tech-09',
    name: 'Docker & Containerization Concepts',
    category: 'Technology',
    description: 'Understanding container isolation, Dockerfiles, images, container lifecycles, and port mappings.',
    tags: ['docker', 'containers', 'virtualization', 'devops'],
    relatedSkills: ['Cloud Platform Basics (AWS / GCP)', 'Linux / Bash Command Line', 'CI/CD Fundamentals']
  },
  {
    id: 'tech-10',
    name: 'Jira',
    category: 'Technology',
    description: 'Managing agile sprints, backlog grooming, issue tracking, Kanban boards, and burndown charts.',
    tags: ['jira', 'agile', 'scrum', 'kanban', 'atlassian', 'tickets'],
    relatedSkills: ['Bug Reporting & Tracking', 'Confluence', 'Defect Lifecycle Management']
  },
  {
    id: 'tech-11',
    name: 'Trello',
    category: 'Technology',
    description: 'Organizing task pipelines with visual Kanban cards, checklists, custom fields, and power-ups.',
    tags: ['trello', 'kanban', 'task-management', 'cards'],
    relatedSkills: ['Jira', 'Notion Documentation', 'Time Management']
  },
  {
    id: 'tech-12',
    name: 'Confluence',
    category: 'Technology',
    description: 'Authoring shared technical wikis, architecture decision records, and standard operating runbooks.',
    tags: ['confluence', 'wiki', 'documentation', 'runbooks'],
    relatedSkills: ['Jira', 'Technical Writing & Documentation', 'Markdown Documentation']
  },
  {
    id: 'tech-13',
    name: 'Notion Documentation',
    category: 'Technology',
    description: 'Structuring knowledge bases, relational databases, project hubs, and SOP repositories in Notion.',
    tags: ['notion', 'knowledge-base', 'documentation', 'databases'],
    relatedSkills: ['Technical Writing & Documentation', 'Markdown Documentation', 'Trello']
  },
  {
    id: 'tech-14',
    name: 'Slack / Discord Ops',
    category: 'Technology',
    description: 'Managing asynchronous team channels, integrations, threaded updates, and incident coordination.',
    tags: ['slack', 'discord', 'communication', 'channels', 'ops'],
    relatedSkills: ['Asynchronous Communication', 'Remote Collaboration', 'Cross-Functional Communication']
  },
  {
    id: 'tech-15',
    name: 'Markdown Documentation',
    category: 'Technology',
    description: 'Authoring clean READMEs, guides, documentation, tables, and code snippets in Github-flavored Markdown.',
    tags: ['markdown', 'docs', 'readme', 'formatting', 'syntax'],
    relatedSkills: ['Technical Writing & Documentation', 'GitHub Workflow', 'Confluence']
  },
  {
    id: 'tech-16',
    name: 'Postman Basics',
    category: 'Technology',
    description: 'Creating API collections, managing environment variables, testing tokens, and inspecting payloads.',
    tags: ['postman', 'api-testing', 'collections', 'requests'],
    relatedSkills: ['API Testing Basics', 'REST APIs', 'JSON / XML Data Structures']
  },
  {
    id: 'tech-17',
    name: 'Web Scraping Fundamentals',
    category: 'Technology',
    description: 'Parsing HTML DOM trees using Beautiful Soup and selectors while adhering to robots.txt rules.',
    tags: ['web-scraping', 'beautifulsoup', 'parsing', 'html', 'crawling'],
    relatedSkills: ['Python', 'Data Cleaning', 'Data Preprocessing']
  },
  {
    id: 'tech-18',
    name: 'CI/CD Fundamentals',
    category: 'Technology',
    description: 'Understanding continuous integration pipelines, automated build checks, linting, and deploy hooks.',
    tags: ['cicd', 'pipeline', 'github-actions', 'deployment', 'automation'],
    relatedSkills: ['GitHub Workflow', 'Git & Version Control', 'Docker & Containerization Concepts']
  },
  {
    id: 'tech-19',
    name: 'Technical Troubleshooting',
    category: 'Technology',
    description: 'Systematic diagnosis of software glitches, network errors, configuration clashes, and environment issues.',
    tags: ['troubleshooting', 'debugging', 'investigation', 'fixes'],
    relatedSkills: ['Root Cause Analysis', 'Analytical Problem Solving', 'Linux / Bash Command Line']
  },

  // ==========================================
  // 7. Digital & Remote Work (17 Skills)
  // ==========================================
  {
    id: 'remote-01',
    name: 'Remote Collaboration',
    category: 'Digital & Remote Work',
    description: 'Working seamlessly across time zones with distributed colleagues using modern digital toolsets.',
    tags: ['remote', 'distributed', 'collaboration', 'telework'],
    relatedSkills: ['Asynchronous Communication', 'Time Management', 'Slack / Discord Ops']
  },
  {
    id: 'remote-02',
    name: 'Asynchronous Communication',
    category: 'Digital & Remote Work',
    description: 'Writing thorough, self-contained messages, status updates, and tickets that minimize meeting overhead.',
    tags: ['async', 'communication', 'writing', 'updates', 'slack'],
    relatedSkills: ['Remote Collaboration', 'Technical Writing & Documentation', 'Cross-Functional Communication']
  },
  {
    id: 'remote-03',
    name: 'Strict Standard Operating Procedure (SOP) Adherence',
    category: 'Digital & Remote Work',
    description: 'Faithfully executing complex multi-step protocols with zero deviation and high audit compliance.',
    tags: ['sop', 'procedures', 'guidelines', 'compliance', 'standards'],
    relatedSkills: ['Labeling Guideline Adherence', 'Attention to Detail', 'SLA Discipline']
  },
  {
    id: 'remote-04',
    name: 'Attention to Detail',
    category: 'Digital & Remote Work',
    description: 'Spotting subtle discrepancies, typos, edge formatting variations, and anomalies in complex outputs.',
    tags: ['detail', 'precision', 'thoroughness', 'accuracy'],
    relatedSkills: ['Strict Standard Operating Procedure (SOP) Adherence', 'Quality Assurance (QA)', 'Data Cleaning']
  },
  {
    id: 'remote-05',
    name: 'Critical Thinking',
    category: 'Digital & Remote Work',
    description: 'Objective evaluation of factual claims, logical fallacies, contradictory data, and source credibility.',
    tags: ['critical-thinking', 'reasoning', 'logic', 'evaluation'],
    relatedSkills: ['Factuality Checking', 'Analytical Problem Solving', 'Reasoning Verification']
  },
  {
    id: 'remote-06',
    name: 'Analytical Problem Solving',
    category: 'Digital & Remote Work',
    description: 'Deconstructing ambiguous blockers into structured hypotheses and testing systematic solutions.',
    tags: ['problem-solving', 'analysis', 'solutions', 'troubleshooting'],
    relatedSkills: ['Critical Thinking', 'Root Cause Analysis', 'Technical Troubleshooting']
  },
  {
    id: 'remote-07',
    name: 'Independent Execution',
    category: 'Digital & Remote Work',
    description: 'Taking full ownership of tasks with minimal supervision, meeting deadlines reliably and autonomously.',
    tags: ['independent', 'ownership', 'autonomy', 'self-starter'],
    relatedSkills: ['Time Management', 'Remote Collaboration', 'High-Throughput Task Delivery']
  },
  {
    id: 'remote-08',
    name: 'High-Throughput Task Delivery',
    category: 'Digital & Remote Work',
    description: 'Consistently hitting high volume quotas while sustaining strict quality and zero defect rates.',
    tags: ['throughput', 'productivity', 'volume', 'velocity', 'quotas'],
    relatedSkills: ['Time Management', 'Independent Execution', 'SLA Discipline']
  },
  {
    id: 'remote-09',
    name: 'Time Management',
    category: 'Digital & Remote Work',
    description: 'Prioritizing competing deliverables, managing calendar timeblocks, and honoring tight deadlines.',
    tags: ['time-management', 'prioritization', 'deadlines', 'focus'],
    relatedSkills: ['Independent Execution', 'High-Throughput Task Delivery', 'Remote Collaboration']
  },
  {
    id: 'remote-10',
    name: 'Technical Writing & Documentation',
    category: 'Digital & Remote Work',
    description: 'Translating complex workflows into crisp, readable guides, runbooks, FAQs, and reports.',
    tags: ['technical-writing', 'documentation', 'guides', 'clarity'],
    relatedSkills: ['Markdown Documentation', 'Confluence', 'Asynchronous Communication']
  },
  {
    id: 'remote-11',
    name: 'Workflow Optimization',
    category: 'Digital & Remote Work',
    description: 'Eliminating repetitive manual keystrokes through macros, keyboard shortcuts, and streamlined flows.',
    tags: ['optimization', 'efficiency', 'shortcuts', 'process-improvement'],
    relatedSkills: ['AI Workflow Automation', 'Time Management', 'Google Sheets Automation']
  },
  {
    id: 'remote-12',
    name: 'Cross-Functional Communication',
    category: 'Digital & Remote Work',
    description: 'Liaising effectively across product managers, QA engineers, data scientists, and business leads.',
    tags: ['communication', 'cross-functional', 'stakeholders', 'alignment'],
    relatedSkills: ['Asynchronous Communication', 'Remote Collaboration', 'Technical Writing & Documentation']
  },
  {
    id: 'remote-13',
    name: 'Confidentiality & Data Privacy',
    category: 'Digital & Remote Work',
    description: 'Protecting proprietary enterprise IP, sensitive customer PII, and adhering to NDA covenants.',
    tags: ['confidentiality', 'privacy', 'pii', 'gdpr', 'security', 'nda'],
    relatedSkills: ['Information Security Awareness', 'Content Policy Verification', 'Named Entity Recognition (NER)']
  },
  {
    id: 'remote-14',
    name: 'Information Security Awareness',
    category: 'Digital & Remote Work',
    description: 'Practicing multi-factor authentication, phishing defense, secure password management, and zero trust.',
    tags: ['security', 'mfa', 'infosec', 'phishing', 'passwords'],
    relatedSkills: ['Confidentiality & Data Privacy', 'Strict Standard Operating Procedure (SOP) Adherence']
  },
  {
    id: 'remote-15',
    name: 'SLA Discipline',
    category: 'Digital & Remote Work',
    description: 'Consistently maintaining service level agreements, turnaround targets, and audit ratings.',
    tags: ['sla', 'discipline', 'targets', 'reliability', 'accountability'],
    relatedSkills: ['SLA & KPI Compliance', 'High-Throughput Task Delivery', 'Strict Standard Operating Procedure (SOP) Adherence']
  },
  {
    id: 'remote-16',
    name: 'Active Listening',
    category: 'Digital & Remote Work',
    description: 'Synthesizing stakeholder verbal feedback, asking clarifying queries, and capturing exact specs.',
    tags: ['listening', 'comprehension', 'feedback', 'meetings'],
    relatedSkills: ['Cross-Functional Communication', 'Attention to Detail', 'Remote Collaboration']
  },
  {
    id: 'remote-17',
    name: 'Continuous Learning & Adaptability',
    category: 'Digital & Remote Work',
    description: 'Swiftly mastering new software tools, AI platforms, and operational guidelines as tech evolves.',
    tags: ['learning', 'adaptability', 'growth-mindset', 'agility'],
    relatedSkills: ['Independent Execution', 'Critical Thinking', 'Workflow Optimization']
  }
];

// Helper functions for skill management

export function getAllSkills(): SkillDefinition[] {
  return ROBOTIC_SKILLS_LIBRARY;
}

export function searchSkills(query: string): SkillDefinition[] {
  if (!query || !query.trim()) return ROBOTIC_SKILLS_LIBRARY;
  const clean = query.trim().toLowerCase();
  return ROBOTIC_SKILLS_LIBRARY.filter(skill => 
    skill.name.toLowerCase().includes(clean) ||
    skill.category.toLowerCase().includes(clean) ||
    skill.tags.some(t => t.toLowerCase().includes(clean)) ||
    skill.description.toLowerCase().includes(clean)
  );
}

export function getSkillsByCategory(category: SkillCategoryName): SkillDefinition[] {
  return ROBOTIC_SKILLS_LIBRARY.filter(s => s.category === category);
}

export function findSkillByName(name: string): SkillDefinition | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return ROBOTIC_SKILLS_LIBRARY.find(s => s.name.toLowerCase() === clean);
}

/**
 * Returns intelligent skill recommendations based on current selections.
 */
export function getRecommendedSkills(selectedSkillNames: string[], limit: number = 8): SkillDefinition[] {
  const selectedSet = new Set(selectedSkillNames.map(s => s.toLowerCase()));
  const recommendationScores = new Map<string, number>();

  // For each selected skill, boost its related skills
  selectedSkillNames.forEach(skillName => {
    const def = findSkillByName(skillName);
    if (def) {
      def.relatedSkills.forEach(rel => {
        if (!selectedSet.has(rel.toLowerCase())) {
          const current = recommendationScores.get(rel) || 0;
          recommendationScores.set(rel, current + 2);
        }
      });
      // Also boost same-category skills slightly
      const sameCat = getSkillsByCategory(def.category);
      sameCat.forEach(s => {
        if (!selectedSet.has(s.name.toLowerCase())) {
          const current = recommendationScores.get(s.name) || 0;
          recommendationScores.set(s.name, current + 1);
        }
      });
    }
  });

  // If no recommendations found (e.g. none selected yet), recommend popular foundational skills
  if (recommendationScores.size === 0) {
    const foundational = [
      'Prompt Engineering',
      'Data Annotation',
      'Quality Assurance (QA)',
      'LLM Response Evaluation',
      'Attention to Detail',
      'Strict Standard Operating Procedure (SOP) Adherence',
      'SQL Querying',
      'AI Hallucination Detection'
    ];
    return foundational
      .filter(name => !selectedSet.has(name.toLowerCase()))
      .map(name => findSkillByName(name)!)
      .filter(Boolean)
      .slice(0, limit);
  }

  // Sort by score descending
  const sortedNames = Array.from(recommendationScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const results: SkillDefinition[] = [];
  for (const name of sortedNames) {
    const def = findSkillByName(name);
    if (def && !selectedSet.has(def.name.toLowerCase())) {
      results.push(def);
      if (results.length >= limit) break;
    }
  }

  return results;
}
