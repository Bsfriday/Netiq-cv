package com.example.netiqcv.data

import com.example.netiqcv.model.*
import kotlin.random.Random

object SampleCvsData {

    val SAMPLE_CVS: List<ResumeData> = listOf(
        ResumeData(
            id = "sample-tech-1",
            title = "Senior Full-Stack Cloud Architect",
            industry = "Technology",
            personalInfo = PersonalInfo(
                fullName = "Alexander Vance",
                jobTitle = "Lead Full-Stack Engineer & Architect",
                email = "alex.vance@techlead.io",
                phone = "+1 (415) 890-2341",
                location = "San Francisco, CA",
                linkedin = "linkedin.com/in/alexandervance",
                github = "github.com/avance-cloud",
                website = "https://alexvance.engineer"
            ),
            summary = "Principal Software Engineer and Cloud Architect with 8+ years of expertise designing resilient distributed microservices, modern reactive frontends, and CI/CD pipelines. Passionate about system latency optimization, engineering leadership, and zero-downtime migrations.",
            experience = listOf(
                ExperienceItem(
                    id = "exp-sample-1",
                    jobTitle = "Staff Software Engineer",
                    company = "CloudScale Global Technologies",
                    location = "San Francisco, CA",
                    startDate = "2021-08",
                    endDate = "",
                    current = true,
                    description = "• Re-architected core messaging bus to handle 50,000+ RPS with sub-15ms p99 latency using Kotlin, gRPC, and Redis clusters.\n• Led cross-functional team of 11 engineers through microservice decomposition and GraphQL unification.\n• Reduced annual cloud infrastructure spend by 32% ($240k/yr) via dynamic autoscaling and query caching."
                ),
                ExperienceItem(
                    id = "exp-sample-2",
                    jobTitle = "Senior Backend Engineer",
                    company = "Apex Data Networks",
                    location = "Austin, TX",
                    startDate = "2018-04",
                    endDate = "2021-07",
                    current = false,
                    description = "• Developed high-throughput RESTful ingestion APIs processing 12M telemetry events daily.\n• Built automated end-to-end integration test suites boosting release confidence and decreasing production incident rate by 45%."
                )
            ),
            education = listOf(
                EducationItem(
                    id = "edu-sample-1",
                    school = "University of California, Berkeley",
                    degree = "B.S. in Computer Science & Engineering",
                    fieldOfStudy = "Computer Science",
                    location = "Berkeley, CA",
                    startDate = "2014-08",
                    endDate = "2018-05",
                    current = false,
                    description = "Graduated with High Honors (GPA 3.89). IEEE Student Chapter President."
                )
            ),
            skills = listOf(
                SkillItem(id = "s-1", name = "Kotlin / Java", level = "Expert", category = "Backend"),
                SkillItem(id = "s-2", name = "TypeScript / React", level = "Expert", category = "Frontend"),
                SkillItem(id = "s-3", name = "Kubernetes & Docker", level = "Expert", category = "DevOps"),
                SkillItem(id = "s-4", name = "AWS (EKS, Aurora, Lambda)", level = "Expert", category = "Cloud"),
                SkillItem(id = "s-5", name = "PostgreSQL & Redis", level = "Advanced", category = "Databases"),
                SkillItem(id = "s-6", name = "Distributed Systems", level = "Expert", category = "Architecture")
            ),
            certifications = listOf(
                CertificationItem(id = "cert-1", name = "AWS Certified Solutions Architect – Professional", issuer = "Amazon Web Services", date = "2023-03"),
                CertificationItem(id = "cert-2", name = "Certified Kubernetes Administrator (CKA)", issuer = "Linux Foundation", date = "2022-09")
            ),
            projects = listOf(
                ProjectItem(
                    id = "p-1",
                    title = "HyperStream: High-Throughput Event Broker",
                    role = "Creator & Core Maintainer",
                    description = "Open-source distributed streaming engine built in Kotlin with zero garbage collection pauses on hot paths.",
                    technologies = "Kotlin, Netty, RocksDB, Raft",
                    link = "https://github.com/avance-cloud/hyperstream"
                )
            ),
            themeConfig = ThemeConfig(
                template = "modern",
                accentColor = "#2563EB",
                font = "sans"
            )
        ),
        ResumeData(
            id = "sample-finance-1",
            title = "Vice President of Financial Planning & Analysis",
            industry = "Finance",
            personalInfo = PersonalInfo(
                fullName = "Victoria Sterling, CFA",
                jobTitle = "VP of Financial Planning & Strategic FP&A",
                email = "v.sterling@sterlingcapital.com",
                phone = "+1 (212) 555-0198",
                location = "New York, NY",
                linkedin = "linkedin.com/in/victoriasterling-cfa",
                website = "https://sterlingadvisors.io"
            ),
            summary = "Senior Finance Executive and Chartered Financial Analyst with 12+ years directing strategic corporate finance, multi-entity budget forecasting ($500M+ ARR), and M&A due diligence. Proven partner to Board of Directors and C-suite leadership in optimizing capital allocation.",
            experience = listOf(
                ExperienceItem(
                    id = "exp-sample-f1",
                    jobTitle = "VP of Strategic FP&A",
                    company = "Meridian Capital Partners",
                    location = "New York, NY",
                    startDate = "2020-02",
                    endDate = "",
                    current = true,
                    description = "• Steered annual corporate budgeting and long-range forecast models across 6 international business units totaling $680M in recurring revenue.\n• Orchestrated financial modeling for 3 strategic acquisitions resulting in $45M in annualized cost synergies.\n• Redesigned Executive Dashboards in Power BI reducing monthly board pack assembly time from 10 days to 48 hours."
                ),
                ExperienceItem(
                    id = "exp-sample-f2",
                    jobTitle = "Director of Financial Analysis",
                    company = "Vanguard Financial Group",
                    location = "New York, NY",
                    startDate = "2015-06",
                    endDate = "2020-01",
                    current = false,
                    description = "• Managed a team of 6 senior analysts delivering quarterly variance reports and capital expenditure reviews.\n• Implemented automated cash-flow sensitivity tooling, increasing liquidity forecasting accuracy to 99.2%."
                )
            ),
            education = listOf(
                EducationItem(
                    id = "edu-sample-f1",
                    school = "Columbia Business School",
                    degree = "Master of Business Administration (MBA)",
                    fieldOfStudy = "Finance & Private Equity",
                    location = "New York, NY",
                    startDate = "2013-09",
                    endDate = "2015-05",
                    current = false,
                    description = "Dean's Honors. Beta Gamma Sigma International Honor Society."
                )
            ),
            skills = listOf(
                SkillItem(id = "sf-1", name = "Financial Modeling & Valuation (DCF, LBO)", level = "Expert", category = "Modeling"),
                SkillItem(id = "sf-2", name = "M&A Due Diligence & Integration", level = "Expert", category = "Strategy"),
                SkillItem(id = "sf-3", name = "Budgeting & Rolling Forecasts", level = "Expert", category = "FP&A"),
                SkillItem(id = "sf-4", name = "Board & Investor Relations", level = "Expert", category = "Leadership"),
                SkillItem(id = "sf-5", name = "Power BI, Excel VBA, FactSet", level = "Expert", category = "Tools")
            ),
            certifications = listOf(
                CertificationItem(id = "cf-1", name = "Chartered Financial Analyst (CFA®)", issuer = "CFA Institute", date = "2016-06"),
                CertificationItem(id = "cf-2", name = "Financial Modeling & Valuation Analyst (FMVA)", issuer = "Corporate Finance Institute", date = "2014-04")
            ),
            projects = emptyList(),
            themeConfig = ThemeConfig(
                template = "executive",
                accentColor = "#0F172A",
                font = "serif"
            )
        ),
        ResumeData(
            id = "sample-health-1",
            title = "Clinical Nurse Specialist & Emergency Care Coordinator",
            industry = "Healthcare",
            personalInfo = PersonalInfo(
                fullName = "Sarah Jenkins, MSN, RN, CEN",
                jobTitle = "Emergency Department Clinical Coordinator",
                email = "s.jenkins.rn@memorialhealth.org",
                phone = "+1 (312) 840-9281",
                location = "Chicago, IL",
                linkedin = "linkedin.com/in/sarahjenkins-rn",
                website = ""
            ),
            summary = "Compassionate and decisive Emergency Care Specialist with 9+ years in Level 1 Trauma Center operations. Skilled in rapid triage, acute patient stabilization, multi-disciplinary team coordination, and hospital safety compliance protocols.",
            experience = listOf(
                ExperienceItem(
                    id = "exp-sample-h1",
                    jobTitle = "Emergency Department Charge Nurse & Coordinator",
                    company = "City Memorial Trauma Center",
                    location = "Chicago, IL",
                    startDate = "2019-03",
                    endDate = "",
                    current = true,
                    description = "• Supervised 32 RNs and patient care technicians in a 48-bed Level 1 Trauma ED receiving 220+ admissions per 24 hours.\n• Spearheaded ED door-to-balloon time improvement initiative, achieving an average response time of 42 minutes (18 minutes below national benchmark).\n• Coordinated trauma response during major municipal incidents with 100% adherence to clinical safety checklists."
                )
            ),
            education = listOf(
                EducationItem(
                    id = "edu-sample-h1",
                    school = "Northwestern University",
                    degree = "Master of Science in Nursing (MSN)",
                    fieldOfStudy = "Emergency & Trauma Nursing",
                    location = "Evanston, IL",
                    startDate = "2017-09",
                    endDate = "2019-05",
                    current = false,
                    description = "Sigma Theta Tau International Honor Society of Nursing."
                )
            ),
            skills = listOf(
                SkillItem(id = "sh-1", name = "Level 1 Trauma Triage & Acute Resuscitation", level = "Expert", category = "Clinical"),
                SkillItem(id = "sh-2", name = "Advanced Cardiac Life Support (ACLS)", level = "Expert", category = "Emergency"),
                SkillItem(id = "sh-3", name = "Epic EHR Clinical Documentation", level = "Expert", category = "Systems"),
                SkillItem(id = "sh-4", name = "Pediatric & Geriatric Emergency Protocols", level = "Advanced", category = "Care"),
                SkillItem(id = "sh-5", name = "Infection Control & OSHA Standards", level = "Expert", category = "Compliance")
            ),
            certifications = listOf(
                CertificationItem(id = "ch-1", name = "Certified Emergency Nurse (CEN)", issuer = "Board of Certification for Emergency Nursing", date = "2019-11"),
                CertificationItem(id = "ch-2", name = "ACLS / BLS / PALS Instructor Certified", issuer = "American Heart Association", date = "2023-02")
            ),
            projects = emptyList(),
            themeConfig = ThemeConfig(
                template = "classic",
                accentColor = "#059669",
                font = "serif"
            )
        ),
        ResumeData(
            id = "sample-design-1",
            title = "Principal Product & Design Systems Lead",
            industry = "Design",
            personalInfo = PersonalInfo(
                fullName = "Elena Rostova",
                jobTitle = "Principal Product & Design Systems Designer",
                email = "elena@rostovadesign.com",
                phone = "+1 (206) 739-1142",
                location = "Seattle, WA",
                linkedin = "linkedin.com/in/elenarostova-ux",
                website = "https://elenarostova.design"
            ),
            summary = "Design leader with 7+ years shaping enterprise design systems, multi-platform consumer apps, and micro-interactions. Champion for accessibility (WCAG AAA), spatial design harmony, and frictionless human-computer interaction.",
            experience = listOf(
                ExperienceItem(
                    id = "exp-sample-d1",
                    jobTitle = "Principal Product Designer",
                    company = "Aura Interactive Labs",
                    location = "Seattle, WA",
                    startDate = "2021-01",
                    endDate = "",
                    current = true,
                    description = "• Created Aura UI design system adopted by 140+ engineers across web, iOS, and Android applications, reducing designer-to-developer handoff time by 40%.\n• Conducted 80+ generative user research sessions, increasing core onboarding conversion by 28% across 2.4M active users.\n• Mentored 5 mid-level product designers and established company-wide accessibility guidelines."
                )
            ),
            education = listOf(
                EducationItem(
                    id = "edu-sample-d1",
                    school = "Rhode Island School of Design (RISD)",
                    degree = "B.F.A. in Graphic & Interaction Design",
                    fieldOfStudy = "Interaction Design",
                    location = "Providence, RI",
                    startDate = "2014-09",
                    endDate = "2018-05",
                    current = false,
                    description = "Graduated with Honors. UX Excellence Award."
                )
            ),
            skills = listOf(
                SkillItem(id = "sd-1", name = "Figma & Design Systems Architecture", level = "Expert", category = "Tools"),
                SkillItem(id = "sd-2", name = "Design Tokens & Variable Sync", level = "Expert", category = "Architecture"),
                SkillItem(id = "sd-3", name = "Usability Research & Prototyping", level = "Expert", category = "Research"),
                SkillItem(id = "sd-4", name = "Micro-Interactions & Motion Design", level = "Advanced", category = "Motion"),
                SkillItem(id = "sd-5", name = "WCAG 2.2 AAA Accessibility", level = "Expert", category = "Standards")
            ),
            certifications = listOf(
                CertificationItem(id = "cd-1", name = "UX Master Certified", issuer = "Nielsen Norman Group", date = "2021-07")
            ),
            projects = listOf(
                ProjectItem(
                    id = "pd-1",
                    title = "Aura Open Design System",
                    role = "Lead Creator",
                    description = "Comprehensive multi-brand tokenized design library with 350+ accessible components and Figma plugins.",
                    technologies = "Figma, React, Storybook, Tokens Studio",
                    link = "https://aura-design-system.io"
                )
            ),
            themeConfig = ThemeConfig(
                template = "creative",
                accentColor = "#7C3AED",
                font = "sans"
            )
        )
    )

    fun generateRandomCv(industryCategory: String? = null): ResumeData {
        val matchingOccs = if (industryCategory != null && industryCategory != "All") {
            CountriesAndOccupations.POPULAR_OCCUPATIONS.filter { it.category.equals(industryCategory, ignoreCase = true) }
                .ifEmpty { CountriesAndOccupations.POPULAR_OCCUPATIONS }
        } else {
            CountriesAndOccupations.POPULAR_OCCUPATIONS
        }

        val occ = matchingOccs.random()
        val country = CountriesAndOccupations.COUNTRIES.random()
        val age = CountriesAndOccupations.AGE_GROUPS.random()
        val status = listOf("employed", "employed", "freelancer", "recent_grad").random()

        val generated = CountriesAndOccupations.generateTailoredAiResume(
            AiGeneratorInput(
                country = country.name,
                ageGroup = age.id,
                occupation = occ.title,
                employmentStatus = status
            )
        )

        val templates = CvTemplate.entries.toTypedArray()
        val randomTemplate = templates.random()
        val colors = listOf("#2563EB", "#1E3A8A", "#0284C7", "#059669", "#D97706", "#DB2777", "#7C3AED", "#0F172A")
        val randomColor = colors.random()

        return generated.copy(
            id = "rand-cv-${System.currentTimeMillis()}-${Random.nextInt(100, 999)}",
            themeConfig = generated.themeConfig.copy(
                template = randomTemplate.idName,
                accentColor = randomColor,
                font = if (randomTemplate == CvTemplate.CLASSIC || randomTemplate == CvTemplate.EXECUTIVE) "serif" else "sans"
            )
        )
    }
}
