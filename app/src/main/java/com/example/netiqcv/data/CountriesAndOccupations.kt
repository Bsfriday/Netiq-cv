package com.example.netiqcv.data

import com.example.netiqcv.model.*
import kotlin.random.Random

object CountriesAndOccupations {

    val COUNTRIES = listOf(
        CountryOption(
            code = "US",
            name = "United States",
            phonePrefix = "+1 (555)",
            cities = listOf("San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL", "Boston, MA"),
            universities = listOf("Stanford University", "UC Berkeley", "MIT", "Columbia University", "UT Austin", "University of Washington"),
            companies = listOf("Apex Dynamics Inc.", "Beacon Tech Solutions", "Horizon Global", "Pinnacle Systems", "Vanguard Innovations")
        ),
        CountryOption(
            code = "UK",
            name = "United Kingdom",
            phonePrefix = "+44 7700",
            cities = listOf("London", "Manchester", "Edinburgh", "Bristol", "Cambridge", "Birmingham"),
            universities = listOf("University of Oxford", "University of Cambridge", "Imperial College London", "University of Manchester", "University of Edinburgh"),
            companies = listOf("Albion Digital Ltd.", "Crown & Sterling Partners", "Thames Capital Group", "Meridian Innovations UK", "Vanguard British Enterprise")
        ),
        CountryOption(
            code = "CA",
            name = "Canada",
            phonePrefix = "+1 (416)",
            cities = listOf("Toronto, ON", "Vancouver, BC", "Montreal, QC", "Ottawa, ON", "Calgary, AB"),
            universities = listOf("University of Toronto", "University of British Columbia", "McGill University", "University of Waterloo", "McMaster University"),
            companies = listOf("Maple Ridge Technologies", "Nordic Horizon Capital", "Frontier Digital Canada", "St. Lawrence Solutions", "Great Lakes Systems")
        ),
        CountryOption(
            code = "AU",
            name = "Australia",
            phonePrefix = "+61 4",
            cities = listOf("Sydney, NSW", "Melbourne, VIC", "Brisbane, QLD", "Perth, WA", "Canberra, ACT"),
            universities = listOf("University of Melbourne", "University of Sydney", "UNSW Sydney", "Australian National University", "Monash University"),
            companies = listOf("Southern Cross Innovations", "Pacific Crest Operations", "Harbour City Tech", "Outback Systems Pty Ltd", "Oasis Solutions Group")
        ),
        CountryOption(
            code = "DE",
            name = "Germany",
            phonePrefix = "+49 151",
            cities = listOf("Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart", "Cologne"),
            universities = listOf("Technical University of Munich (TUM)", "LMU Munich", "Heidelberg University", "RWTH Aachen University", "Humboldt University of Berlin"),
            companies = listOf("Bavaria Tech Group GmbH", "Rheinland Dynamics", "Hanseatic Solutions", "Alpen Software AG", "Vanguard Deutschland GmbH")
        ),
        CountryOption(
            code = "FR",
            name = "France",
            phonePrefix = "+33 6",
            cities = listOf("Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux"),
            universities = listOf("Sorbonne University", "École Polytechnique", "HEC Paris", "Sciences Po", "Université Paris-Saclay"),
            companies = listOf("Lumière Technologies SA", "Hexagone Innovations", "Seine Digital Partners", "Rhône Capital Solutions", "Azur Ventures Paris")
        ),
        CountryOption(
            code = "IN",
            name = "India",
            phonePrefix = "+91 98",
            cities = listOf("Bengaluru, Karnataka", "Hyderabad, Telangana", "Mumbai, Maharashtra", "Pune, Maharashtra", "Delhi NCR", "Chennai, Tamil Nadu"),
            universities = listOf("IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani", "Indian Institute of Science (IISc)"),
            companies = listOf("Apex InfoTech Solutions", "Paramount Digital Systems", "Vertex Global Tech", "Indus Wave Innovations", "Zenith Enterprise Labs")
        ),
        CountryOption(
            code = "SG",
            name = "Singapore",
            phonePrefix = "+65 91",
            cities = listOf("Singapore City", "Central Area, Singapore", "Marina Bay, Singapore"),
            universities = listOf("National University of Singapore (NUS)", "Nanyang Technological University (NTU)", "Singapore Management University (SMU)"),
            companies = listOf("Marina Bay Global Tech", "Lion City Innovations", "Equatorial Digital Pte Ltd", "Merlion Capital & Tech", "Sentosa Solutions")
        ),
        CountryOption(
            code = "AE",
            name = "United Arab Emirates",
            phonePrefix = "+971 50",
            cities = listOf("Dubai", "Abu Dhabi", "Sharjah"),
            universities = listOf("United Arab Emirates University", "American University of Sharjah", "Khalifa University", "NYU Abu Dhabi"),
            companies = listOf("Emirates Apex Global", "Gulf Horizon Ventures", "Burj Digital Solutions", "Falcon Tech Capital", "Oasis Prime International")
        ),
        CountryOption(
            code = "NL",
            name = "Netherlands",
            phonePrefix = "+31 6",
            cities = listOf("Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "The Hague"),
            universities = listOf("Delft University of Technology (TU Delft)", "University of Amsterdam", "Utrecht University", "Erasmus University Rotterdam"),
            companies = listOf("Oranje Dynamics BV", "Amstel Digital Labs", "Randstad Horizon Tech", "Zuiderzee Solutions", "Nordic Tulip Group")
        ),
        CountryOption(
            code = "BR",
            name = "Brazil",
            phonePrefix = "+55 11 9",
            cities = listOf("São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Florianópolis, SC"),
            universities = listOf("Universidade de São Paulo (USP)", "Unicamp", "UFRJ", "PUC-SP", "UFMG"),
            companies = listOf("Paulista Digital Tech", "Carioca Solutions Ltda", "Horizonte Brasil Ventures", "Atlantica Software", "Sul Inovações")
        ),
        CountryOption(
            code = "ZA",
            name = "South Africa",
            phonePrefix = "+27 82",
            cities = listOf("Johannesburg", "Cape Town", "Durban", "Pretoria"),
            universities = listOf("University of Cape Town", "University of the Witwatersrand", "Stellenbosch University", "University of Pretoria"),
            companies = listOf("Table Mountain Tech", "Savannah Digital Group", "Protea Solutions Ltd", "Cape Point Innovations", "Highveld Systems")
        ),
        CountryOption(
            code = "JP",
            name = "Japan",
            phonePrefix = "+81 90",
            cities = listOf("Tokyo", "Osaka", "Kyoto", "Yokohama", "Fukuoka"),
            universities = listOf("University of Tokyo", "Kyoto University", "Tokyo Institute of Technology", "Waseda University", "Keio University"),
            companies = listOf("Sunrise Digital Systems", "Nippon Tech Dynamics", "Fuji Horizon Corp", "Sakura Enterprise Solutions", "Kanto Global Labs")
        )
    )

    val AGE_GROUPS = listOf(
        AgeGroupOption("18-22", "18 – 22 years (Entry Level / College)", "0–2 years", "Early career stage with emphasis on coursework, internships, and rapid adaptability."),
        AgeGroupOption("23-29", "23 – 29 years (Early-to-Mid Career)", "2–6 years", "Active professional with established hands-on execution skills and project delivery track record."),
        AgeGroupOption("30-39", "30 – 39 years (Mid-to-Senior Specialist / Lead)", "7–15 years", "Proven senior practitioner with domain mastery, cross-functional leadership, and measurable business impact."),
        AgeGroupOption("40-49", "40 – 49 years (Senior Lead / Manager / Head)", "16–22 years", "Seasoned leader driving strategic initiatives, team development, and operational efficiency."),
        AgeGroupOption("50+", "50+ years (Executive / Director / Veteran)", "23+ years", "Executive-level authority specializing in organizational transformation, governance, and C-suite advisement.")
    )

    val EMPLOYMENT_STATUSES = listOf(
        EmploymentStatusOption("employed", "Employed (Active Professional)", "Currently working in the industry; highlights ongoing contributions, promotions, and impact."),
        EmploymentStatusOption("student", "Student", "Currently enrolled in academic programs; highlights projects, coursework, and campus leadership."),
        EmploymentStatusOption("recent_grad", "Recent Graduate", "Graduated within the last 1-2 years; highlights capstone projects, academic honors, and foundational mastery."),
        EmploymentStatusOption("freelancer", "Freelancer / Independent Consultant", "Self-employed or contract-based; showcases client deliverables and versatile execution."),
        EmploymentStatusOption("unemployed", "Seeking New Opportunity / Career Break", "Actively transitioning; emphasizes transferable skills, achievements, and upskilling."),
        EmploymentStatusOption("career_changer", "Career Changer / Transitioning Field", "Pivoting from another industry; highlights cross-disciplinary problem solving and recent certifications.")
    )

    val POPULAR_OCCUPATIONS = listOf(
        OccupationOption(
            id = "software-engineer",
            title = "Software Engineer",
            category = "Technology",
            defaultTemplate = CvTemplate.MODERN,
            defaultAccent = "#2563EB",
            skills = listOf(
                SkillItem(id = "s1", name = "TypeScript & JavaScript", level = "Expert", category = "Programming"),
                SkillItem(id = "s2", name = "React / Next.js / Kotlin", level = "Expert", category = "Frontend/Mobile"),
                SkillItem(id = "s3", name = "Node.js & Python", level = "Advanced", category = "Backend"),
                SkillItem(id = "s4", name = "REST & GraphQL APIs", level = "Advanced", category = "Architecture"),
                SkillItem(id = "s5", name = "PostgreSQL & Redis", level = "Advanced", category = "Databases"),
                SkillItem(id = "s6", name = "Docker & Kubernetes", level = "Intermediate", category = "DevOps"),
                SkillItem(id = "s7", name = "CI/CD & Git Workflow", level = "Expert", category = "Tools")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "AWS Certified Solutions Architect", issuer = "Amazon Web Services", date = "2023-04"),
                CertificationItem(id = "c2", name = "CKAD: Certified Kubernetes Application Developer", issuer = "Cloud Native Computing Foundation", date = "2022-11")
            ),
            tools = listOf("Kotlin", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS")
        ),
        OccupationOption(
            id = "data-scientist",
            title = "Data Scientist & AI Specialist",
            category = "Technology",
            defaultTemplate = CvTemplate.EXECUTIVE,
            defaultAccent = "#0F766E",
            skills = listOf(
                SkillItem(id = "s1", name = "Python (NumPy, Pandas, PyTorch)", level = "Expert", category = "Data Science"),
                SkillItem(id = "s2", name = "Machine Learning & LLMs", level = "Advanced", category = "AI"),
                SkillItem(id = "s3", name = "SQL & Data Warehousing (BigQuery)", level = "Expert", category = "Databases"),
                SkillItem(id = "s4", name = "Statistical Modeling & A/B Testing", level = "Expert", category = "Analytics"),
                SkillItem(id = "s5", name = "Data Visualization (Tableau/D3)", level = "Advanced", category = "BI"),
                SkillItem(id = "s6", name = "Scikit-Learn & TensorFlow", level = "Advanced", category = "AI")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Google Professional Data Engineer", issuer = "Google Cloud", date = "2023-08"),
                CertificationItem(id = "c2", name = "Deep Learning Specialization", issuer = "DeepLearning.AI", date = "2022-05")
            ),
            tools = listOf("Python", "SQL", "PyTorch", "BigQuery", "Tableau", "Docker")
        ),
        OccupationOption(
            id = "product-manager",
            title = "Product Manager",
            category = "Management",
            defaultTemplate = CvTemplate.PROFESSIONAL,
            defaultAccent = "#1D4ED8",
            skills = listOf(
                SkillItem(id = "s1", name = "Product Strategy & Roadmapping", level = "Expert", category = "Management"),
                SkillItem(id = "s2", name = "User Research & Personas", level = "Advanced", category = "Research"),
                SkillItem(id = "s3", name = "Agile / Scrum Methodologies", level = "Expert", category = "Agile"),
                SkillItem(id = "s4", name = "Data Analytics (Mixpanel, Amplitude)", level = "Advanced", category = "Analytics"),
                SkillItem(id = "s5", name = "Stakeholder Alignment", level = "Expert", category = "Communication"),
                SkillItem(id = "s6", name = "Go-To-Market (GTM) Strategy", level = "Advanced", category = "Strategy")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Certified Scrum Product Owner (CSPO)", issuer = "Scrum Alliance", date = "2022-09"),
                CertificationItem(id = "c2", name = "Product Management Certificate", issuer = "Product School", date = "2021-03")
            ),
            tools = listOf("Jira", "Figma", "Amplitude", "Mixpanel", "Notion", "Confluence")
        ),
        OccupationOption(
            id = "nurse-healthcare",
            title = "Registered Nurse / Healthcare Specialist",
            category = "Healthcare",
            defaultTemplate = CvTemplate.CLASSIC,
            defaultAccent = "#059669",
            skills = listOf(
                SkillItem(id = "s1", name = "Clinical Patient Assessment", level = "Expert", category = "Clinical"),
                SkillItem(id = "s2", name = "Medication Administration", level = "Expert", category = "Clinical"),
                SkillItem(id = "s3", name = "Emergency & Acute Care Protocols", level = "Advanced", category = "Emergency"),
                SkillItem(id = "s4", name = "Electronic Health Records (Epic, Cerner)", level = "Expert", category = "Systems"),
                SkillItem(id = "s5", name = "Patient Advocacy & Family Education", level = "Expert", category = "Care"),
                SkillItem(id = "s6", name = "Infection Control & Safety Standards", level = "Expert", category = "Compliance")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Registered Nurse (RN) Licensure", issuer = "State Board of Nursing", date = "2018-06"),
                CertificationItem(id = "c2", name = "BLS & ACLS Certification", issuer = "American Heart Association", date = "2023-01")
            ),
            tools = listOf("Epic Systems", "Cerner", "Pyxis MedStation", "Telemetry Monitors")
        ),
        OccupationOption(
            id = "financial-analyst",
            title = "Financial Analyst",
            category = "Finance",
            defaultTemplate = CvTemplate.CLASSIC,
            defaultAccent = "#0F172A",
            skills = listOf(
                SkillItem(id = "s1", name = "Financial Modeling & DCF Valuation", level = "Expert", category = "Modeling"),
                SkillItem(id = "s2", name = "Variance Analysis & Budget Forecasting", level = "Expert", category = "Analysis"),
                SkillItem(id = "s3", name = "Advanced Excel & VBA Macros", level = "Expert", category = "Tools"),
                SkillItem(id = "s4", name = "Financial Statement Analysis (GAAP/IFRS)", level = "Advanced", category = "Accounting"),
                SkillItem(id = "s5", name = "Bloomberg Terminal & FactSet", level = "Advanced", category = "Platforms"),
                SkillItem(id = "s6", name = "Capital Allocation & ROI Analysis", level = "Advanced", category = "Strategy")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Chartered Financial Analyst (CFA) Candidate", issuer = "CFA Institute", date = "2021-09"),
                CertificationItem(id = "c2", name = "Financial Modeling & Valuation Analyst (FMVA)", issuer = "CFI", date = "2019-02")
            ),
            tools = listOf("Excel", "Bloomberg Terminal", "Power BI", "QuickBooks", "FactSet")
        ),
        OccupationOption(
            id = "ux-ui-designer",
            title = "UX / UI Product Designer",
            category = "Design",
            defaultTemplate = CvTemplate.CREATIVE,
            defaultAccent = "#7C3AED",
            skills = listOf(
                SkillItem(id = "s1", name = "Design Systems & Component Libraries", level = "Expert", category = "Design"),
                SkillItem(id = "s2", name = "Figma & High-Fidelity Prototyping", level = "Expert", category = "Tools"),
                SkillItem(id = "s3", name = "User Journey Mapping & Wireframing", level = "Expert", category = "UX"),
                SkillItem(id = "s4", name = "Usability Testing & User Interviews", level = "Advanced", category = "Research"),
                SkillItem(id = "s5", name = "Interaction Design & Micro-animations", level = "Advanced", category = "Design"),
                SkillItem(id = "s6", name = "WCAG Accessibility Standards", level = "Advanced", category = "Accessibility")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Google UX Design Professional Certificate", issuer = "Google / Coursera", date = "2021-04"),
                CertificationItem(id = "c2", name = "Nielsen Norman Group (NN/g) UX Master Certified", issuer = "NN/g", date = "2020-07")
            ),
            tools = listOf("Figma", "Adobe CC", "Miro", "Principle", "Maze", "Lottie")
        ),
        OccupationOption(
            id = "marketing-manager",
            title = "Digital Marketing Strategist",
            category = "Marketing",
            defaultTemplate = CvTemplate.MODERN,
            defaultAccent = "#DB2777",
            skills = listOf(
                SkillItem(id = "s1", name = "Multi-Channel Campaign Strategy", level = "Expert", category = "Marketing"),
                SkillItem(id = "s2", name = "Paid Acquisition (Google Ads, Meta)", level = "Expert", category = "Paid Media"),
                SkillItem(id = "s3", name = "SEO & Content Marketing Strategy", level = "Advanced", category = "Organic"),
                SkillItem(id = "s4", name = "Marketing Automation (HubSpot, Marketo)", level = "Advanced", category = "Automation"),
                SkillItem(id = "s5", name = "Google Analytics 4 (GA4) & Tracking", level = "Expert", category = "Analytics"),
                SkillItem(id = "s6", name = "Budget Optimization & CAC/LTV", level = "Advanced", category = "Financials")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Google Ads & GA4 Certified Professional", issuer = "Google", date = "2023-05"),
                CertificationItem(id = "c2", name = "HubSpot Inbound Marketing Certified", issuer = "HubSpot Academy", date = "2022-09")
            ),
            tools = listOf("HubSpot", "Google Analytics 4", "Meta Ads Manager", "Semrush", "Canva")
        ),
        OccupationOption(
            id = "project-manager",
            title = "Technical Project Manager",
            category = "Project Management",
            defaultTemplate = CvTemplate.PROFESSIONAL,
            defaultAccent = "#0284C7",
            skills = listOf(
                SkillItem(id = "s1", name = "Agile, Scrum & Kanban Frameworks", level = "Expert", category = "Methodology"),
                SkillItem(id = "s2", name = "Resource Allocation & Capacity Planning", level = "Expert", category = "Planning"),
                SkillItem(id = "s3", name = "Risk Management & Mitigation Strategy", level = "Advanced", category = "Risk"),
                SkillItem(id = "s4", name = "Budget Oversight ($1M+ projects)", level = "Advanced", category = "Financial"),
                SkillItem(id = "s5", name = "Cross-functional Team Leadership", level = "Expert", category = "Leadership"),
                SkillItem(id = "s6", name = "Sprint Planning & Backlog Grooming", level = "Expert", category = "Execution")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "Project Management Professional (PMP)", issuer = "PMI", date = "2019-06"),
                CertificationItem(id = "c2", name = "Certified ScrumMaster (CSM)", issuer = "Scrum Alliance", date = "2018-03")
            ),
            tools = listOf("Jira", "Asana", "Monday.com", "MS Project", "Slack", "Confluence")
        ),
        OccupationOption(
            id = "cybersecurity-analyst",
            title = "Cybersecurity Analyst",
            category = "Cybersecurity",
            defaultTemplate = CvTemplate.COMPACT,
            defaultAccent = "#1E3A8A",
            skills = listOf(
                SkillItem(id = "s1", name = "SOC Incident Monitoring & Response", level = "Expert", category = "Security Ops"),
                SkillItem(id = "s2", name = "SIEM Tools (Splunk, Sentinel)", level = "Expert", category = "Tools"),
                SkillItem(id = "s3", name = "Vulnerability Scanning (Nessus, Qualys)", level = "Advanced", category = "Assessment"),
                SkillItem(id = "s4", name = "Network Security Protocols & Firewalls", level = "Advanced", category = "Network"),
                SkillItem(id = "s5", name = "Threat Hunting & IOC Analysis", level = "Advanced", category = "Threat Intel"),
                SkillItem(id = "s6", name = "NIST & ISO 27001 Compliance", level = "Intermediate", category = "Compliance")
            ),
            certifications = listOf(
                CertificationItem(id = "c1", name = "CompTIA Security+ / CySA+", issuer = "CompTIA", date = "2021-05"),
                CertificationItem(id = "c2", name = "CISSP Certified Information Systems Security Professional", issuer = "(ISC)²", date = "2020-10")
            ),
            tools = listOf("Splunk", "Wireshark", "Nessus", "Microsoft Sentinel", "CrowdStrike")
        )
    )

    private val FIRST_NAMES = listOf("Alex", "Morgan", "Taylor", "Jordan", "Sam", "Casey", "Riley", "Avery", "Jamie", "Cameron", "Dakota", "Logan", "Elena", "Marcus", "Sarah", "David")
    private val LAST_NAMES = listOf("Vance", "Sterling", "Mercer", "Chen", "Patel", "Dubois", "Kowalski", "Novak", "Silva", "Tanaka", "O'Connor", "Schneider", "Sinclair", "Mitchell")

    fun generateTailoredAiResume(input: AiGeneratorInput): ResumeData {
        val country = COUNTRIES.find { it.name.equals(input.country, ignoreCase = true) } ?: COUNTRIES[0]
        val age = AGE_GROUPS.find { it.id == input.ageGroup } ?: AGE_GROUPS[1]
        val occ = POPULAR_OCCUPATIONS.find { it.title.equals(input.occupation, ignoreCase = true) || it.id == input.occupation } ?: POPULAR_OCCUPATIONS[0]

        val actualTitle = input.customOccupation?.trim()?.takeIf { it.isNotBlank() } ?: occ.title
        val firstName = FIRST_NAMES.random()
        val lastName = LAST_NAMES.random()
        val fullName = "$firstName $lastName"
        val cleanEmail = "${firstName.lowercase()}.${lastName.lowercase()}"

        val city = country.cities.random()
        val university = country.universities.random()
        val primaryComp = country.companies.random()
        val secondaryComp = country.companies.find { it != primaryComp } ?: "Horizon Enterprises"

        val isStudent = input.employmentStatus == "student"
        val isRecentGrad = input.employmentStatus == "recent_grad"
        val isUnemployed = input.employmentStatus == "unemployed"
        val isFreelancer = input.employmentStatus == "freelancer"
        val isCareerChanger = input.employmentStatus == "career_changer"

        val isYoung = input.ageGroup == "18-22"
        val isMid = input.ageGroup == "30-39"
        val isSenior = input.ageGroup == "40-49" || input.ageGroup == "50+"

        val summary = when {
            isStudent -> "Motivated and high-achieving $actualTitle student at $university with demonstrated coursework in industry fundamentals, collaborative project execution, and practical research. Seeking to leverage proven technical acumen and analytical problem-solving skills in $city."
            isRecentGrad -> "Energetic, top-tier $actualTitle graduate from $university equipped with hands-on capstone project experience, strong foundational training, and proficiency with modern industry toolsets. Proven ability to bridge theoretical principles with real-world deliverables in $city."
            isUnemployed -> "Results-oriented $actualTitle based in $city with ${age.experienceYears} of proven expertise in optimizing operational workflows, delivering high-impact solutions, and driving cross-functional project success."
            isFreelancer -> "Independent, client-focused $actualTitle consultant with ${age.experienceYears} of experience delivering customized end-to-end solutions for high-growth enterprises and international clients across ${country.name}."
            isCareerChanger -> "Dynamic and adaptable professional transitioning into $actualTitle, bringing ${age.experienceYears} of multifaceted expertise in strategic problem-solving, stakeholder communication, and analytical execution."
            isSenior -> "Accomplished and visionary $actualTitle with ${age.experienceYears} of progressive leadership in $city and international markets. Proven track record of steering cross-functional departments, architecting scalable systems, and cultivating top-performing teams."
            isMid -> "Versatile, outcome-driven $actualTitle with ${age.experienceYears} of industry expertise spearheading impactful initiatives at $primaryComp. Recognized for combining analytical rigor with strategic vision to eliminate operational bottlenecks."
            else -> "Proactive and dedicated $actualTitle with ${age.experienceYears} of hands-on experience in fast-paced environments. Demonstrates a continuous track record of delivering high-quality deliverables across key initiatives in $city."
        }

        val experience = mutableListOf<ExperienceItem>()
        if (isStudent) {
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-1",
                    jobTitle = "$actualTitle Intern",
                    company = primaryComp,
                    location = city,
                    startDate = "2024-05",
                    endDate = "2024-08",
                    current = false,
                    description = "• Assisted senior team members in executing core project workflows, contributing to a 15% reduction in turnaround time for client deliverables.\n• Conducted comprehensive research and comparative analysis to support strategic decision-making across 3 departmental initiatives.\n• Documented operational guidelines and shared technical best practices."
                )
            )
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-2",
                    jobTitle = "Undergraduate Research Assistant",
                    company = university,
                    location = city,
                    startDate = "2023-09",
                    endDate = "",
                    current = true,
                    description = "• Spearheaded collaborative lab sessions, mentoring 25+ students on advanced principles and practical toolsets.\n• Co-authored departmental report on modern $actualTitle methodologies and presented findings to faculty reviewers."
                )
            )
        } else if (isRecentGrad) {
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-1",
                    jobTitle = "Junior $actualTitle",
                    company = primaryComp,
                    location = city,
                    startDate = "2024-01",
                    endDate = "",
                    current = true,
                    description = "• Contributed to primary project cycles from requirement discovery to production deployment, maintaining a 98% on-time milestone delivery record.\n• Collaborated with senior leads to identify performance bottlenecks and implemented automated tests that improved output consistency by 22%.\n• Authored clean, maintainable documentation for cross-functional knowledge sharing."
                )
            )
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-2",
                    jobTitle = "$actualTitle Project Associate (Co-op)",
                    company = secondaryComp,
                    location = city,
                    startDate = "2023-01",
                    endDate = "2023-12",
                    current = false,
                    description = "• Partnered with product and engineering teams to support day-to-day deliverables, resolving 40+ user-reported workflow tickets.\n• Conducted user feedback interviews and synthesized findings into actionable feature enhancements."
                )
            )
        } else {
            val rolePrefix = if (isSenior) "Director of" else if (isMid) "Senior" else "Lead"
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-1",
                    jobTitle = "$rolePrefix $actualTitle",
                    company = primaryComp,
                    location = city,
                    startDate = if (isSenior) "2019-04" else "2021-06",
                    endDate = if (isUnemployed) "2025-08" else "",
                    current = !isUnemployed,
                    description = "• Directed end-to-end strategic initiatives for $primaryComp, driving a 34% increase in overall team output and revenue impact.\n• Managed and mentored a high-caliber team of 8+ specialists, fostering a culture of technical excellence and continuous improvement.\n• Modernized key operational infrastructure, reducing maintenance overhead by $120,000 annually."
                )
            )
            experience.add(
                ExperienceItem(
                    id = "exp-${System.currentTimeMillis()}-2",
                    jobTitle = actualTitle,
                    company = secondaryComp,
                    location = city,
                    startDate = if (isSenior) "2014-02" else "2018-03",
                    endDate = if (isSenior) "2019-03" else "2021-05",
                    current = false,
                    description = "• Spearheaded core project deliverables, consistently outperforming quarterly KPIs and benchmarks by an average of 18%.\n• Partnered directly with executive leadership to refine standard operating procedures and implement scalable best practices.\n• Identified high-friction bottlenecks and automated reporting mechanisms, saving 15+ manual hours weekly."
                )
            )
        }

        val degreeType = if (isSenior) "Master of Science (MSc)" else if (country.code in listOf("UK", "AU")) "Bachelor of Science (Honours)" else "Bachelor of Science (B.S.)"
        val education = listOf(
            EducationItem(
                id = "edu-${System.currentTimeMillis()}-1",
                school = university,
                degree = degreeType,
                fieldOfStudy = "${occ.category} & Systems",
                location = city,
                startDate = if (isYoung) "2022-09" else if (isMid) "2012-09" else if (isSenior) "2000-09" else "2017-09",
                endDate = if (isStudent) "2026-05" else if (isYoung) "2024-05" else if (isMid) "2016-05" else if (isSenior) "2004-05" else "2021-05",
                current = isStudent,
                description = if (isStudent || isRecentGrad) "Dean's List Honor Roll; Relevant Coursework: Advanced System Design, Statistical Methods, Project Leadership & Ethics." else "Graduated with Magna Cum Laude Honors; Departmental Achievement Award."
            )
        )

        val skills = occ.skills.mapIndexed { idx, s ->
            s.copy(id = "skill-${System.currentTimeMillis()}-$idx")
        }

        val certifications = occ.certifications.mapIndexed { idx, c ->
            c.copy(id = "cert-${System.currentTimeMillis()}-$idx")
        }

        val projects = listOf(
            ProjectItem(
                id = "proj-${System.currentTimeMillis()}-1",
                title = "$actualTitle Enterprise Optimization Platform",
                role = if (isSenior) "Lead Architect" else "Lead Contributor",
                description = "Architected and deployed a comprehensive end-to-end framework that automated key workflows, boosting processing speed by 35% and saving 200+ hours per quarter.",
                technologies = occ.tools.take(4).joinToString(", "),
                link = "https://portfolio.$cleanEmail.dev/project-1"
            ),
            ProjectItem(
                id = "proj-${System.currentTimeMillis()}-2",
                title = "Scalable Data & Insights Pipeline for $primaryComp",
                role = "Core Specialist",
                description = "Designed real-time tracking telemetry and interactive dashboards providing actionable insights for executive stakeholders across multiple markets.",
                technologies = occ.tools.drop(2).take(4).joinToString(", "),
                link = "https://github.com/$cleanEmail/pipeline"
            )
        )

        val phone = "${country.phonePrefix} ${Random.nextInt(100, 999)} ${Random.nextInt(1000, 9999)}"

        return ResumeData(
            id = "ai-cv-${System.currentTimeMillis()}-${Random.nextInt(1000, 9999)}",
            title = "$fullName — $actualTitle (${country.name})",
            industry = occ.category,
            country = country.name,
            personalInfo = PersonalInfo(
                fullName = fullName,
                jobTitle = actualTitle,
                email = "$cleanEmail@netiqcv.io",
                phone = phone,
                location = "$city, ${country.name}",
                linkedin = "linkedin.com/in/$cleanEmail",
                github = if (occ.category == "Technology") "github.com/$cleanEmail" else "",
                website = "https://$cleanEmail.dev"
            ),
            summary = summary,
            experience = experience,
            education = education,
            skills = skills,
            certifications = certifications,
            projects = projects,
            themeConfig = ThemeConfig(
                template = occ.defaultTemplate.idName,
                accentColor = occ.defaultAccent,
                font = if (occ.defaultTemplate == CvTemplate.CLASSIC || occ.defaultTemplate == CvTemplate.EXECUTIVE) "serif" else "sans",
                spacing = "normal"
            ),
            updatedAt = System.currentTimeMillis()
        )
    }
}
