package com.example.netiqcv.data

data class ResumeTypeItem(
    val id: String,
    val name: String,
    val category: String,
    val description: String,
    val isDedicated: Boolean,
    val targetProfession: String? = null,
    val keywords: List<String>,
    val popular: Boolean = false,
    val badge: String? = null
)

object ResumeTypesData {

    val CATEGORIES = listOf(
        "All",
        "Technology & AI",
        "Engineering",
        "Business & Finance",
        "Healthcare & Science",
        "Creative & Design",
        "Executive & Leadership"
    )

    val RESUME_TYPES: List<ResumeTypeItem> = listOf(
        // Dedicated Studios
        ResumeTypeItem(
            id = "robotic-ai-resume",
            name = "Robotic & AI Tech Resume",
            category = "Technology & AI",
            description = "Dedicated studio for AI trainers, model evaluators, data annotators, and prompt engineers with ATS intelligence.",
            isDedicated = true,
            targetProfession = "AI Data Annotator",
            keywords = listOf("robotic", "ai", "data annotator", "prompt engineer", "ats", "model evaluator", "machine learning"),
            popular = true,
            badge = "Dedicated Studio"
        ),
        ResumeTypeItem(
            id = "cloud-solutions-architect",
            name = "Cloud Solutions Architect",
            category = "Technology & AI",
            description = "Cloud migration, multi-region resilience, AWS/Azure/GCP infrastructure, Kubernetes, and enterprise microservices.",
            isDedicated = false,
            targetProfession = "Cloud Solutions Architect",
            keywords = listOf("cloud", "aws", "azure", "kubernetes", "microservices", "terraform", "devops", "architecture"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "data-scientist-ml",
            name = "Data Scientist & ML Engineer",
            category = "Technology & AI",
            description = "Predictive statistical modeling, PyTorch/TensorFlow, exploratory big data pipelines, and production inference.",
            isDedicated = false,
            targetProfession = "Data Scientist",
            keywords = listOf("data science", "machine learning", "python", "pytorch", "deep learning", "statistics", "sql"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "cybersecurity-analyst",
            name = "Cybersecurity Operations Analyst",
            category = "Technology & AI",
            description = "SIEM monitoring, threat detection, incident response, zero-trust network security, and NIST compliance.",
            isDedicated = false,
            targetProfession = "Cybersecurity Analyst",
            keywords = listOf("cybersecurity", "soc", "siem", "incident response", "firewall", "nist", "penetration testing"),
            popular = false,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "fullstack-developer",
            name = "Full-Stack Web Developer",
            category = "Technology & AI",
            description = "Modern frontend web applications, responsive UI/UX, Node/Kotlin backend APIs, and distributed database modeling.",
            isDedicated = false,
            targetProfession = "Full Stack Developer",
            keywords = listOf("full stack", "react", "typescript", "node", "api", "database", "frontend", "backend"),
            popular = true,
            badge = "Dynamic AI"
        ),
        // Engineering
        ResumeTypeItem(
            id = "biomedical-engineer",
            name = "Biomedical Engineer",
            category = "Engineering",
            description = "Medical device innovation, ISO 13485 compliance, biomechanics, physiological sensors, and clinical validation.",
            isDedicated = false,
            targetProfession = "Biomedical Engineer",
            keywords = listOf("biomedical", "medical device", "bioengineering", "clinical", "iso 13485", "fda", "biomechanics"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "civil-engineer",
            name = "Civil & Structural Engineer",
            category = "Engineering",
            description = "Structural calculations, AutoCAD/Revit BIM modeling, site inspection, and municipal code compliance.",
            isDedicated = false,
            targetProfession = "Civil & Structural Engineer",
            keywords = listOf("civil", "structural", "construction", "autocad", "bim", "revit", "infrastructure"),
            popular = false,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "mechanical-robotics",
            name = "Robotics & Automation Engineer",
            category = "Engineering",
            description = "PLC programming, kinematics, servo motor control, ROS2 integration, and automated assembly robotics.",
            isDedicated = false,
            targetProfession = "Robotics Engineer",
            keywords = listOf("robotics", "ros", "plc", "automation", "cad", "kinematics", "mechatronics"),
            popular = true,
            badge = "Dynamic AI"
        ),
        // Business & Finance
        ResumeTypeItem(
            id = "investment-banker",
            name = "Investment Banking Analyst",
            category = "Business & Finance",
            description = "DCF valuation, M&A due diligence, financial modeling, pitch books, and institutional portfolio analysis.",
            isDedicated = false,
            targetProfession = "Investment Banker",
            keywords = listOf("finance", "investment", "dcf", "valuation", "m&a", "modeling", "capital markets"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "product-manager",
            name = "Technical Product Manager",
            category = "Business & Finance",
            description = "Product roadmap execution, user story formulation, sprint backlog prioritization, and KPI conversion growth.",
            isDedicated = false,
            targetProfession = "Product Manager",
            keywords = listOf("product manager", "scrum", "agile", "roadmap", "user experience", "kpis", "strategy"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "digital-marketing-growth",
            name = "Digital Marketing & Growth Lead",
            category = "Business & Finance",
            description = "Paid acquisition funnels, SEO content ranking, multivariate A/B testing, and omni-channel lifecycle campaigns.",
            isDedicated = false,
            targetProfession = "Digital Marketing Specialist",
            keywords = listOf("marketing", "seo", "sem", "growth", "cac", "roas", "analytics", "campaigns"),
            popular = false,
            badge = "Dynamic AI"
        ),
        // Healthcare & Science
        ResumeTypeItem(
            id = "registered-nurse",
            name = "Registered Nurse (RN) / Clinical",
            category = "Healthcare & Science",
            description = "Acute patient care, triage protocol, medication administration, EHR documentation, and patient advocacy.",
            isDedicated = false,
            targetProfession = "Registered Nurse",
            keywords = listOf("nursing", "rn", "healthcare", "patient care", "triage", "medication", "ehr", "clinical"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "clinical-research",
            name = "Clinical Research Coordinator",
            category = "Healthcare & Science",
            description = "GCP compliance, clinical trial phase monitoring, patient consent verification, and IRB regulatory protocol.",
            isDedicated = false,
            targetProfession = "Clinical Research Coordinator",
            keywords = listOf("clinical research", "trials", "gcp", "fda", "irb", "protocols", "patient safety"),
            popular = false,
            badge = "Dynamic AI"
        ),
        // Creative & Design
        ResumeTypeItem(
            id = "ui-ux-designer",
            name = "UI/UX Product Designer",
            category = "Creative & Design",
            description = "Design system architecture in Figma, interactive prototyping, usability research, and responsive mobile experiences.",
            isDedicated = false,
            targetProfession = "Graphic Designer",
            keywords = listOf("ui", "ux", "figma", "design systems", "prototyping", "wireframes", "user research"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "content-strategist",
            name = "Content Strategist & Copywriter",
            category = "Creative & Design",
            description = "Brand voice guidelines, thought leadership editorial pipelines, technical documentation, and conversion copy.",
            isDedicated = false,
            targetProfession = "Content Writer",
            keywords = listOf("content", "copywriting", "editorial", "branding", "seo", "storytelling", "writing"),
            popular = false,
            badge = "Dynamic AI"
        ),
        // Executive & Leadership
        ResumeTypeItem(
            id = "chief-technology-officer",
            name = "Chief Technology Officer (CTO)",
            category = "Executive & Leadership",
            description = "Executive engineering leadership, multi-million dollar tech budgeting, enterprise scaling, and board advisory.",
            isDedicated = false,
            targetProfession = "Chief Technology Officer",
            keywords = listOf("cto", "executive", "vp engineering", "strategy", "board", "budget", "leadership"),
            popular = true,
            badge = "Dynamic AI"
        ),
        ResumeTypeItem(
            id = "operations-director",
            name = "Supply Chain & Operations Director",
            category = "Executive & Leadership",
            description = "Global vendor logistics, ERP systems, lean six sigma procurement, and multi-facility operational efficiency.",
            isDedicated = false,
            targetProfession = "Operations Director",
            keywords = listOf("operations", "supply chain", "logistics", "procurement", "erp", "six sigma", "director"),
            popular = false,
            badge = "Dynamic AI"
        )
    )
}
