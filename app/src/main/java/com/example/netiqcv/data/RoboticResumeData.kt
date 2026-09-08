package com.example.netiqcv.data

import com.example.netiqcv.model.CvTemplate
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.model.SkillItem

data class RoboticRoleDefinition(
    val id: String,
    val title: String,
    val category: String,
    val defaultIndustry: String,
    val defaultTemplate: CvTemplate,
    val defaultAccent: String,
    val keywords: List<String>,
    val suggestedSkills: List<SkillItem>,
    val actionVerbs: List<String>,
    val commonResponsibilities: List<String>
)

data class AtsScoreBreakdown(
    val overallScore: Int, // 0 - 100
    val keywordScore: Int,
    val structureScore: Int,
    val impactScore: Int,
    val matchedKeywords: List<String>,
    val missingKeywords: List<String>,
    val recommendations: List<String>
)

object RoboticResumeData {

    val ACTION_VERBS = listOf(
        "Analyzed", "Evaluated", "Tested", "Validated", "Reviewed", "Documented",
        "Investigated", "Implemented", "Developed", "Supported", "Optimized", "Monitored",
        "Identified", "Resolved", "Coordinated", "Audited", "Benchmarked", "Synthesized",
        "Standardized", "Classified", "Engineered", "Automated", "Trained", "Calibrated"
    )

    val AI_SKILLS_CATALOG = listOf(
        SkillItem(name = "RLHF & Human Feedback", category = "AI Skills", level = "Expert"),
        SkillItem(name = "Prompt Engineering", category = "AI Skills", level = "Expert"),
        SkillItem(name = "Model Hallucination Detection", category = "AI Skills", level = "Advanced"),
        SkillItem(name = "Adversarial Red Teaming", category = "AI Skills", level = "Advanced"),
        SkillItem(name = "Multi-modal LLM Evaluation", category = "AI Skills", level = "Advanced"),
        SkillItem(name = "Data Annotation & Bounding Boxes", category = "Data Skills", level = "Expert"),
        SkillItem(name = "Synthetic Dataset Curation", category = "Data Skills", level = "Advanced"),
        SkillItem(name = "Taxonomy & Metadata Tagging", category = "Data Skills", level = "Advanced"),
        SkillItem(name = "Python & Jupyter Notebooks", category = "Technical Skills", level = "Advanced"),
        SkillItem(name = "SQL & Query Optimization", category = "Technical Skills", level = "Intermediate"),
        SkillItem(name = "API Testing (Postman/Curl)", category = "Technical Skills", level = "Intermediate"),
        SkillItem(name = "Quality Assurance & SLA Compliance", category = "Operations", level = "Expert")
    )

    val ROLES: List<RoboticRoleDefinition> = listOf(
        RoboticRoleDefinition(
            id = "ai-annotator",
            title = "AI Data Annotator",
            category = "Artificial Intelligence",
            defaultIndustry = "Artificial Intelligence",
            defaultTemplate = CvTemplate.MODERN,
            defaultAccent = "#2563EB",
            keywords = listOf("annotation", "labeling", "bounding box", "metadata", "accuracy", "taxonomy", "RLHF", "quality assurance", "guidelines", "curation"),
            suggestedSkills = listOf(
                SkillItem(name = "Data Annotation & Tagging", category = "Data Skills", level = "Expert"),
                SkillItem(name = "Bounding Box Segmentation", category = "Data Skills", level = "Expert"),
                SkillItem(name = "Taxonomy Guidelines Compliance", category = "Data Skills", level = "Expert"),
                SkillItem(name = "Quality Assurance Auditing", category = "Quality", level = "Advanced")
            ),
            actionVerbs = listOf("Annotated", "Classified", "Audited", "Validated", "Standardized", "Curated"),
            commonResponsibilities = listOf(
                "Annotated complex multimodal datasets adhering to strict taxonomy standards with >99.2% accuracy rating.",
                "Conducted secondary QA audits on high-priority training datasets to eliminate classification ambiguities.",
                "Collaborated with ML engineers to clarify edge-case labeling guidelines and streamline annotation workflows."
            )
        ),
        RoboticRoleDefinition(
            id = "prompt-engineer",
            title = "Prompt Engineer",
            category = "Artificial Intelligence",
            defaultIndustry = "Artificial Intelligence",
            defaultTemplate = CvTemplate.PROFESSIONAL,
            defaultAccent = "#4F46E5",
            keywords = listOf("prompt engineering", "few-shot", "chain-of-thought", "LLM", "hallucination", "context window", "system prompt", "benchmark", "token efficiency"),
            suggestedSkills = listOf(
                SkillItem(name = "Few-Shot & Zero-Shot Prompting", category = "AI Skills", level = "Expert"),
                SkillItem(name = "Chain-of-Thought Rubric Design", category = "AI Skills", level = "Expert"),
                SkillItem(name = "Hallucination Diagnostic Benchmarks", category = "AI Skills", level = "Advanced"),
                SkillItem(name = "Python & OpenAI/Gemini SDKs", category = "Technical Skills", level = "Advanced")
            ),
            actionVerbs = listOf("Formulated", "Engineered", "Optimized", "Benchmarked", "Evaluated", "Designed"),
            commonResponsibilities = listOf(
                "Designed and fine-tuned domain-specific system prompts boosting model reasoning fidelity by 34%.",
                "Constructed automated benchmark test suites assessing context window degradation and factual consistency.",
                "Formulated chain-of-thought rubrics utilized by internal teams for consistent enterprise AI deployment."
            )
        ),
        RoboticRoleDefinition(
            id = "ai-model-evaluator",
            title = "AI Model Evaluator",
            category = "Artificial Intelligence",
            defaultIndustry = "Artificial Intelligence",
            defaultTemplate = CvTemplate.MODERN,
            defaultAccent = "#0284C7",
            keywords = listOf("model evaluation", "RLHF", "red teaming", "safety guidelines", "inter-rater reliability", "Cohen's Kappa", "scoring rubric", "adversarial"),
            suggestedSkills = listOf(
                SkillItem(name = "RLHF Preference Scoring", category = "AI Skills", level = "Expert"),
                SkillItem(name = "Adversarial Red Teaming", category = "AI Skills", level = "Expert"),
                SkillItem(name = "AI Safety & Guardrail Compliance", category = "AI Skills", level = "Advanced"),
                SkillItem(name = "Statistical Calibration", category = "Data Skills", level = "Advanced")
            ),
            actionVerbs = listOf("Evaluated", "Ranked", "Investigated", "Stress-tested", "Benchmarked", "Reported"),
            commonResponsibilities = listOf(
                "Evaluated thousands of multi-turn conversational responses against truthfulness, helpfulness, and safety guidelines.",
                "Performed adversarial red-teaming to discover bypass vulnerabilities and edge-case prompt jailbreaks.",
                "Maintained exceptional inter-rater reliability calibration (Cohen's Kappa > 0.91) across evaluation batches."
            )
        ),
        RoboticRoleDefinition(
            id = "search-quality-rater",
            title = "Search Quality Rater",
            category = "Search & Discovery",
            defaultIndustry = "Technology",
            defaultTemplate = CvTemplate.CLASSIC,
            defaultAccent = "#059669",
            keywords = listOf("E-E-A-T", "search quality", "query intent", "relevance", "page quality", "fact checking", "reputable sources", "guidelines"),
            suggestedSkills = listOf(
                SkillItem(name = "E-E-A-T Assessment", category = "Search Skills", level = "Expert"),
                SkillItem(name = "Query Intent Interpretation", category = "Search Skills", level = "Expert"),
                SkillItem(name = "Factual Accuracy Verification", category = "Research", level = "Advanced"),
                SkillItem(name = "Search Algorithm Analysis", category = "Technology", level = "Advanced")
            ),
            actionVerbs = listOf("Assessed", "Categorized", "Verified", "Ranked", "Investigated", "Reviewed"),
            commonResponsibilities = listOf(
                "Assessed web page quality and user intent relevance under rigorous Search Quality Evaluator guidelines.",
                "Analyzed query nuances and localization constraints to score information satisfaction scores.",
                "Delivered detailed rationale for Needs Met ratings and deceptive or low-reputation content flags."
            )
        ),
        RoboticRoleDefinition(
            id = "content-moderator",
            title = "Content & Trust Safety Moderator",
            category = "Trust & Safety",
            defaultIndustry = "Technology",
            defaultTemplate = CvTemplate.MINIMAL,
            defaultAccent = "#DC2626",
            keywords = listOf("moderation", "policy enforcement", "community guidelines", "trust & safety", "escalation", "SLA", "user protection"),
            suggestedSkills = listOf(
                SkillItem(name = "Community Standards Enforcement", category = "Trust & Safety", level = "Expert"),
                SkillItem(name = "Incident Triage & Escalation", category = "Operations", level = "Expert"),
                SkillItem(name = "Content Policy Auditing", category = "Quality", level = "Advanced")
            ),
            actionVerbs = listOf("Reviewed", "Enforced", "Triaged", "Monitored", "Escalated", "Resolved"),
            commonResponsibilities = listOf(
                "Reviewed flagged user submissions across high-velocity digital queues, consistently surpassing SLA benchmarks.",
                "Enforced platform community guidelines and copyright policies with 99.5% accuracy audit rate.",
                "Identified emerging adversarial abuse patterns and coordinated with Trust & Safety leads on policy refinements."
            )
        ),
        RoboticRoleDefinition(
            id = "machine-learning-assistant",
            title = "Machine Learning Assistant",
            category = "Data Science & ML",
            defaultIndustry = "Artificial Intelligence",
            defaultTemplate = CvTemplate.EXECUTIVE,
            defaultAccent = "#7C3AED",
            keywords = listOf("machine learning", "feature engineering", "scikit-learn", "PyTorch", "data preprocessing", "model training", "metrics", "ROC-AUC"),
            suggestedSkills = listOf(
                SkillItem(name = "Data Preprocessing & Cleaning", category = "Data Skills", level = "Expert"),
                SkillItem(name = "Python, Pandas & NumPy", category = "Technical Skills", level = "Expert"),
                SkillItem(name = "PyTorch / TensorFlow Basics", category = "Technical Skills", level = "Intermediate"),
                SkillItem(name = "Experiment Tracking (MLflow/W&B)", category = "Tools", level = "Intermediate")
            ),
            actionVerbs = listOf("Preprocessed", "Implemented", "Trained", "Documented", "Visualized", "Benchmarked"),
            commonResponsibilities = listOf(
                "Preprocessed raw tabular and unstructured text corpora into clean feature representations for model training.",
                "Assisted research scientists in hyperparameter sweeps, metric logging, and regression analysis.",
                "Maintained clean pipeline documentation and reproducible Git version control repositories."
            )
        )
    )

    fun findRole(titleOrId: String): RoboticRoleDefinition {
        return ROLES.find { it.id.equals(titleOrId, ignoreCase = true) || it.title.equals(titleOrId, ignoreCase = true) }
            ?: ROLES.first()
    }

    /**
     * Calculates ATS score and keyword breakdown for a resume against role requirements or target text.
     */
    fun calculateAtsScore(cv: ResumeData, targetRole: String? = null): AtsScoreBreakdown {
        val role = ROLES.find {
            it.title.equals(targetRole ?: cv.personalInfo.jobTitle, ignoreCase = true)
        } ?: ROLES.first()

        val fullText = buildString {
            append(cv.title).append(" ")
            append(cv.personalInfo.fullName).append(" ")
            append(cv.personalInfo.jobTitle).append(" ")
            append(cv.summary).append(" ")
            cv.experience.forEach {
                append(it.jobTitle).append(" ")
                append(it.company).append(" ")
                append(it.description).append(" ")
            }
            cv.education.forEach {
                append(it.school).append(" ")
                append(it.degree).append(" ")
                append(it.description).append(" ")
            }
            cv.skills.forEach { append(it.name).append(" ") }
            cv.certifications.forEach { append(it.name).append(" ").append(it.issuer).append(" ") }
            cv.projects.forEach { append(it.title).append(" ").append(it.description).append(" ").append(it.technologies).append(" ") }
        }.lowercase()

        val matched = mutableListOf<String>()
        val missing = mutableListOf<String>()

        for (kw in role.keywords) {
            if (fullText.contains(kw.lowercase())) {
                matched.add(kw)
            } else {
                missing.add(kw)
            }
        }

        // Keyword score (40 points max)
        val kwPercentage = if (role.keywords.isNotEmpty()) matched.size.toFloat() / role.keywords.size else 1f
        val keywordScore = (kwPercentage * 40).toInt().coerceIn(0, 40)

        // Structure score (30 points max)
        var structureScore = 0
        if (cv.personalInfo.fullName.isNotBlank()) structureScore += 5
        if (cv.personalInfo.email.isNotBlank() && cv.personalInfo.phone.isNotBlank()) structureScore += 5
        if (cv.summary.length >= 100) structureScore += 8 else if (cv.summary.isNotBlank()) structureScore += 4
        if (cv.experience.isNotEmpty()) structureScore += 6
        if (cv.education.isNotEmpty()) structureScore += 3
        if (cv.skills.size >= 4) structureScore += 3

        // Impact & Action Verb Score (30 points max)
        var actionVerbCount = 0
        for (verb in ACTION_VERBS) {
            if (fullText.contains(verb.lowercase())) actionVerbCount++
        }
        val impactScore = (actionVerbCount * 4).coerceAtMost(25) +
                (if (fullText.contains(Regex("""\d+%|\$\d+|\d+\+"""))) 5 else 0)

        val overallScore = (keywordScore + structureScore + impactScore).coerceIn(0, 100)

        val recs = mutableListOf<String>()
        if (missing.isNotEmpty()) {
            recs.add("Include missing core keywords: ${missing.take(3).joinToString(", ")}")
        }
        if (cv.summary.length < 120) {
            recs.add("Expand your summary to 2-3 sentences highlighting domain experience.")
        }
        if (actionVerbCount < 3) {
            recs.add("Start experience bullet points with strong action verbs like 'Engineered', 'Evaluated', or 'Validated'.")
        }
        if (!fullText.contains(Regex("""\d+%|\d+\+"""))) {
            recs.add("Add quantified metrics (e.g., 'boosted speed by 25%', 'managed 500+ tasks') to demonstrate business impact.")
        }
        if (recs.isEmpty()) {
            recs.add("Outstanding ATS optimization! Your resume demonstrates strong keyword density and clear structure.")
        }

        return AtsScoreBreakdown(
            overallScore = overallScore,
            keywordScore = keywordScore,
            structureScore = structureScore,
            impactScore = impactScore,
            matchedKeywords = matched,
            missingKeywords = missing,
            recommendations = recs
        )
    }

    /**
     * Generates a tailored ATS professional summary.
     */
    fun generateRoboticSummary(
        role: String,
        level: String = "Mid-Level",
        workPreference: String = "Remote",
        skills: List<String> = emptyList(),
        location: String = "United States"
    ): String {
        val skillPhrase = if (skills.isNotEmpty()) {
            " with specialized proficiency across ${skills.take(5).joinToString(", ")}"
        } else {
            " with proven domain proficiency"
        }

        val remotePhrase = if (workPreference.equals("Remote", ignoreCase = true)) {
            " Proven excellence in autonomous, asynchronous remote workflows adhering to strict SLA benchmarks and zero-defect delivery standards."
        } else {
            " Versatile collaborator experienced in high-velocity agile sprints and cross-functional team coordination."
        }

        return when (level) {
            "Senior", "Expert" ->
                "Senior $role based in $location$skillPhrase. Brings deep expertise designing frontier evaluation benchmarks, leading adversarial red-teaming, and formulating high-precision rubrics for enterprise production systems.$remotePhrase Recognized for analytical rigor, rapid taxonomy comprehension, and consistently surpassing data quality KPIs."

            "Entry Level", "Junior" ->
                "Analytical and detail-focused $role based in $location$skillPhrase. Demonstrates disciplined execution across data evaluation workflows, taxonomy compliance, and precision anomaly detection.$remotePhrase Committed to accelerating model alignment and upholding verified 99%+ inspection accuracy."

            else ->
                "Results-oriented and technically disciplined $role based in $location$skillPhrase. Combines strong analytical reasoning and structured quality auditing to deliver high-yield results across production workflows.$remotePhrase Trusted by stakeholders for reliable accuracy, clear documentation, and proactive problem resolution."
        }
    }

    /**
     * Enhances bullets with action verbs.
     */
    fun enhanceBulletPoints(rawInput: String, role: String? = null): List<String> {
        val lines = rawInput.split("\n", ";", ".")
            .map { it.trim().removePrefix("•").removePrefix("-").removePrefix("*").trim() }
            .filter { it.length > 5 }

        if (lines.isEmpty()) return emptyList()

        return lines.mapIndexed { idx, line ->
            val firstWord = line.split(" ").firstOrNull() ?: ""
            val isActionVerb = ACTION_VERBS.any { it.equals(firstWord, ignoreCase = true) }
            if (isActionVerb) {
                if (line.endsWith(".")) line else "$line."
            } else {
                val verb = ACTION_VERBS[idx % ACTION_VERBS.size]
                val cleaned = line.replaceFirstChar { it.lowercase() }
                "$verb $cleaned."
            }
        }
    }
}
