package com.example.netiqcv.model

import kotlinx.serialization.Serializable

@Serializable
data class PersonalInfo(
    val fullName: String = "",
    val jobTitle: String = "",
    val email: String = "",
    val phone: String = "",
    val location: String = "",
    val website: String = "",
    val linkedin: String = "",
    val github: String = "",
    val photoUrl: String = ""
)

@Serializable
data class ExperienceItem(
    val id: String = "",
    val jobTitle: String = "",
    val company: String = "",
    val location: String = "",
    val startDate: String = "",
    val endDate: String = "",
    val current: Boolean = false,
    val description: String = ""
)

@Serializable
data class EducationItem(
    val id: String = "",
    val school: String = "",
    val degree: String = "",
    val fieldOfStudy: String = "",
    val location: String = "",
    val startDate: String = "",
    val endDate: String = "",
    val current: Boolean = false,
    val description: String = ""
)

@Serializable
data class SkillItem(
    val id: String = "",
    val name: String = "",
    val category: String = "",
    val level: String = "Advanced" // Beginner, Intermediate, Advanced, Expert
)

@Serializable
data class CertificationItem(
    val id: String = "",
    val name: String = "",
    val issuer: String = "",
    val date: String = "",
    val expirationDate: String = "",
    val credentialId: String = "",
    val url: String = ""
)

@Serializable
data class ProjectItem(
    val id: String = "",
    val title: String = "",
    val role: String = "",
    val description: String = "",
    val technologies: String = "",
    val link: String = "",
    val githubUrl: String = ""
)

enum class CvTemplate(val idName: String, val title: String, val description: String) {
    MODERN("modern", "Modern", "Timeline dots & clean headers"),
    PROFESSIONAL("professional", "Professional", "Sleek colored banner header"),
    CLASSIC("classic", "Classic", "Traditional serif structure"),
    MINIMAL("minimal", "Minimal", "Understated elegance & spacing"),
    EXECUTIVE("executive", "Executive", "Formal framed borders & serif headers"),
    CREATIVE("creative", "Creative", "Two-column colored sidebar layout"),
    COMPACT("compact", "Compact", "Dense high-yield single-sheet format");

    companion object {
        fun fromString(str: String): CvTemplate = entries.find { it.idName.equals(str, ignoreCase = true) } ?: MODERN
    }
}

enum class CvFont(val idName: String, val label: String) {
    SANS("sans", "Modern Sans"),
    SERIF("serif", "Classic Serif");

    companion object {
        fun fromString(str: String): CvFont = entries.find { it.idName.equals(str, ignoreCase = true) } ?: SANS
    }
}

@Serializable
data class ThemeConfig(
    val template: String = "modern",
    val accentColor: String = "#2563EB",
    val font: String = "sans",
    val spacing: String = "normal" // compact, normal, spacious
) {
    fun getTemplateEnum(): CvTemplate = CvTemplate.fromString(template)
    fun getFontEnum(): CvFont = CvFont.fromString(font)
}

@Serializable
data class DocumentAttachment(
    val id: String = "",
    val name: String = "",
    val type: String = "image/jpeg",
    val dataUrl: String = "",
    val fileSize: String = "",
    val uploadedAt: Long = 0L
)

@Serializable
data class ResumeData(
    val id: String = "",
    val title: String = "My Professional Resume",
    val industry: String = "Technology",
    val country: String = "",
    val personalInfo: PersonalInfo = PersonalInfo(),
    val summary: String = "",
    val experience: List<ExperienceItem> = emptyList(),
    val education: List<EducationItem> = emptyList(),
    val skills: List<SkillItem> = emptyList(),
    val certifications: List<CertificationItem> = emptyList(),
    val projects: List<ProjectItem> = emptyList(),
    val documentImages: List<DocumentAttachment> = emptyList(),
    val themeConfig: ThemeConfig = ThemeConfig(),
    val updatedAt: Long = System.currentTimeMillis()
)

data class CountryOption(
    val code: String,
    val name: String,
    val phonePrefix: String,
    val cities: List<String>,
    val universities: List<String>,
    val companies: List<String>
)

data class AgeGroupOption(
    val id: String,
    val label: String,
    val experienceYears: String,
    val levelDesc: String
)

data class EmploymentStatusOption(
    val id: String,
    val label: String,
    val description: String
)

data class OccupationOption(
    val id: String,
    val title: String,
    val category: String,
    val defaultTemplate: CvTemplate,
    val defaultAccent: String,
    val skills: List<SkillItem>,
    val certifications: List<CertificationItem>,
    val tools: List<String>
)

data class AiGeneratorInput(
    val country: String,
    val ageGroup: String,
    val occupation: String,
    val employmentStatus: String,
    val customOccupation: String? = null
)

data class CompletionSection(
    val name: String,
    val weight: Int,
    val completed: Boolean,
    val score: Int,
    val hint: String
)

data class ResumeStrengthResult(
    val score: Int, // 0 - 100
    val level: String, // Needs Work, Good Start, Solid Profile, Looking Strong, All-Star Quality
    val message: String,
    val sections: List<CompletionSection>
)
