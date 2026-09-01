package com.example.netiqcv.utils

import com.example.netiqcv.model.CompletionSection
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.model.ResumeStrengthResult

object CompletionCalculator {
    fun calculateResumeStrength(cv: ResumeData): ResumeStrengthResult {
        val sections = mutableListOf<CompletionSection>()

        // 1. Personal Information (Weight: 25)
        val p = cv.personalInfo
        val hasName = p.fullName.isNotBlank()
        val hasTitle = p.jobTitle.isNotBlank()
        val hasEmail = p.email.isNotBlank()
        val hasPhone = p.phone.isNotBlank()
        val hasLocation = p.location.isNotBlank()
        val hasLinks = p.linkedin.isNotBlank() || p.website.isNotBlank() || p.github.isNotBlank()

        var personalScore = 0
        if (hasName) personalScore += 7
        if (hasTitle) personalScore += 5
        if (hasEmail) personalScore += 5
        if (hasPhone) personalScore += 4
        if (hasLocation) personalScore += 2
        if (hasLinks) personalScore += 2

        val personalHint = when {
            !hasName -> "Add your full name"
            !hasEmail -> "Provide a valid email address"
            !hasTitle -> "Add your professional title"
            else -> "Contact details complete"
        }
        sections.add(
            CompletionSection(
                name = "Personal Information",
                weight = 25,
                completed = personalScore >= 21,
                score = personalScore,
                hint = personalHint
            )
        )

        // 2. Summary (Weight: 15)
        val summaryLen = cv.summary.trim().length
        val summaryScore = when {
            summaryLen >= 100 -> 15
            summaryLen >= 40 -> 10
            summaryLen > 0 -> 5
            else -> 0
        }
        val summaryHint = when {
            summaryLen == 0 -> "Add a brief summary introducing your core strengths"
            summaryLen < 80 -> "Expand your summary with key achievements & focus"
            else -> "Summary is well-crafted"
        }
        sections.add(
            CompletionSection(
                name = "Professional Summary",
                weight = 15,
                completed = summaryScore >= 12,
                score = summaryScore,
                hint = summaryHint
            )
        )

        // 3. Experience (Weight: 25)
        val validExp = cv.experience.filter { it.jobTitle.isNotBlank() && it.company.isNotBlank() }
        val expScore = when {
            validExp.size >= 2 -> {
                val detailed = validExp.any { it.description.length > 40 }
                if (detailed) 25 else 20
            }
            validExp.size == 1 -> {
                if (validExp[0].description.length > 40) 18 else 12
            }
            else -> 0
        }
        val expHint = when {
            validExp.isEmpty() -> "Add at least 1 work experience entry"
            validExp.size == 1 -> "Add a 2nd role or expand bullet points"
            else -> "Strong career history detailed"
        }
        sections.add(
            CompletionSection(
                name = "Work Experience",
                weight = 25,
                completed = expScore >= 20,
                score = expScore,
                hint = expHint
            )
        )

        // 4. Education (Weight: 15)
        val validEdu = cv.education.filter { it.school.isNotBlank() && (it.degree.isNotBlank() || it.fieldOfStudy.isNotBlank()) }
        val eduScore = if (validEdu.isNotEmpty()) 15 else 0
        val eduHint = if (validEdu.isEmpty()) "Add your highest degree or school" else "Education section complete"
        sections.add(
            CompletionSection(
                name = "Education",
                weight = 15,
                completed = eduScore >= 15,
                score = eduScore,
                hint = eduHint
            )
        )

        // 5. Skills (Weight: 10)
        val skillCount = cv.skills.filter { it.name.isNotBlank() }.size
        val skillScore = when {
            skillCount >= 5 -> 10
            skillCount >= 3 -> 7
            skillCount >= 1 -> 4
            else -> 0
        }
        val skillHint = if (skillCount < 3) "Add ${3 - skillCount} more key skills" else "Key competencies highlighted"
        sections.add(
            CompletionSection(
                name = "Skills & Competencies",
                weight = 10,
                completed = skillScore >= 8,
                score = skillScore,
                hint = skillHint
            )
        )

        // 6. Certifications & Projects (Weight: 10)
        val hasCerts = cv.certifications.any { it.name.isNotBlank() }
        val hasProjects = cv.projects.any { it.title.isNotBlank() }
        val extraScore = when {
            hasCerts && hasProjects -> 10
            hasCerts || hasProjects -> 7
            else -> 0
        }
        val extraHint = if (!hasCerts && !hasProjects) "Add a certification or project" else "Credentials & portfolio added"
        sections.add(
            CompletionSection(
                name = "Certifications & Projects",
                weight = 10,
                completed = extraScore >= 7,
                score = extraScore,
                hint = extraHint
            )
        )

        val totalScore = sections.sumOf { it.score }.coerceIn(0, 100)

        val (level, message) = when {
            totalScore >= 90 -> "All-Star Quality" to "Your resume is in top shape! Ready to export and apply."
            totalScore >= 75 -> "Looking Strong" to "Looking strong! A few touches will make it stand out."
            totalScore >= 55 -> "Solid Profile" to "Good progress! Add more details to shine for recruiters."
            totalScore >= 35 -> "Good Start" to "You have a good foundation. Fill in remaining sections."
            else -> "Needs Work" to "Complete missing sections to strengthen your resume."
        }

        return ResumeStrengthResult(
            score = totalScore,
            level = level,
            message = message,
            sections = sections
        )
    }
}
