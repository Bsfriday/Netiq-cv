package com.example.netiqcv.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.model.CvTemplate
import com.example.netiqcv.model.ResumeData

fun parseHexColor(hex: String, defaultColor: Color = Color(0xFF2563EB)): Color {
    return try {
        val clean = hex.removePrefix("#")
        val colorInt = if (clean.length == 6) {
            (0xFF000000 or clean.toLong(16)).toInt()
        } else if (clean.length == 8) {
            clean.toLong(16).toInt()
        } else {
            return defaultColor
        }
        Color(colorInt)
    } catch (e: Exception) {
        defaultColor
    }
}

@Composable
fun CvRenderer(
    data: ResumeData,
    modifier: Modifier = Modifier,
    isElevated: Boolean = true
) {
    val template = data.themeConfig.getTemplateEnum()
    val accentColor = parseHexColor(data.themeConfig.accentColor)
    val fontFamily = if (data.themeConfig.font == "serif") FontFamily.Serif else FontFamily.SansSerif

    Card(
        modifier = modifier
            .fillMaxWidth()
            .then(if (isElevated) Modifier.shadow(8.dp, RoundedCornerShape(12.dp)) else Modifier),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = CardDefaults.outlinedCardBorder()
    ) {
        when (template) {
            CvTemplate.MODERN -> ModernCvTemplate(data, accentColor, fontFamily)
            CvTemplate.PROFESSIONAL -> ProfessionalCvTemplate(data, accentColor, fontFamily)
            CvTemplate.CLASSIC -> ClassicCvTemplate(data, accentColor, fontFamily)
            CvTemplate.MINIMAL -> MinimalCvTemplate(data, accentColor, fontFamily)
            CvTemplate.EXECUTIVE -> ExecutiveCvTemplate(data, accentColor, fontFamily)
            CvTemplate.CREATIVE -> CreativeCvTemplate(data, accentColor, fontFamily)
            CvTemplate.COMPACT -> CompactCvTemplate(data, accentColor, fontFamily)
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 1. MODERN TEMPLATE
// -------------------------------------------------------------------------------------------------
@Composable
private fun ModernCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Header
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .border(width = 0.dp, color = Color.Transparent)
        ) {
            Text(
                text = data.personalInfo.fullName.ifBlank { "Your Full Name" },
                fontSize = 22.sp,
                fontWeight = FontWeight.Black,
                fontFamily = font,
                color = accent
            )
            Text(
                text = data.personalInfo.jobTitle.ifBlank { "Professional Job Title" },
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                fontFamily = font,
                color = Color(0xFF334155),
                modifier = Modifier.padding(top = 2.dp)
            )

            // Contact Badges
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                ContactPill(icon = Icons.Default.Email, text = data.personalInfo.email, accent = accent)
                ContactPill(icon = Icons.Default.Phone, text = data.personalInfo.phone, accent = accent)
                ContactPill(icon = Icons.Default.LocationOn, text = data.personalInfo.location, accent = accent)
            }
            if (data.personalInfo.linkedin.isNotBlank() || data.personalInfo.website.isNotBlank()) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ContactPill(icon = Icons.Default.Link, text = data.personalInfo.linkedin, accent = accent)
                    ContactPill(icon = Icons.Default.Language, text = data.personalInfo.website, accent = accent)
                }
            }
        }

        HorizontalDivider(color = Color(0xFFE2E8F0), thickness = 1.dp)

        // Professional Summary
        if (data.summary.isNotBlank()) {
            ModernSection(title = "Professional Summary", accent = accent, font = font) {
                Text(
                    text = data.summary,
                    fontSize = 12.5.sp,
                    fontFamily = font,
                    lineHeight = 18.sp,
                    color = Color(0xFF334155)
                )
            }
        }

        // Work Experience
        if (data.experience.isNotEmpty()) {
            ModernSection(title = "Work Experience", accent = accent, font = font) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    data.experience.forEach { exp ->
                        Row(modifier = Modifier.fillMaxWidth()) {
                            Box(
                                modifier = Modifier
                                    .padding(top = 4.dp, end = 10.dp)
                                    .size(8.dp)
                                    .background(accent, CircleShape)
                            )
                            Column(
                                modifier = Modifier.weight(1f),
                                verticalArrangement = Arrangement.spacedBy(2.dp)
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = exp.jobTitle.ifBlank { "Job Title" },
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.5.sp,
                                        fontFamily = font,
                                        color = Color(0xFF0F172A)
                                    )
                                    val dateStr = "${exp.startDate} – ${if (exp.current) "Present" else exp.endDate}"
                                    Text(
                                        text = dateStr,
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Medium,
                                        color = Color(0xFF64748B)
                                    )
                                }
                                Text(
                                    text = "${exp.company}${if (exp.location.isNotBlank()) " • ${exp.location}" else ""}",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = accent
                                )
                                if (exp.description.isNotBlank()) {
                                    Text(
                                        text = exp.description,
                                        fontSize = 12.sp,
                                        lineHeight = 17.sp,
                                        color = Color(0xFF334155),
                                        modifier = Modifier.padding(top = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        // Education & Certifications in 2 Columns or stacked
        if (data.education.isNotEmpty()) {
            ModernSection(title = "Education", accent = accent, font = font) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    data.education.forEach { edu ->
                        Column(verticalArrangement = Arrangement.spacedBy(1.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "${edu.degree}${if (edu.fieldOfStudy.isNotBlank()) " in ${edu.fieldOfStudy}" else ""}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    fontFamily = font,
                                    color = Color(0xFF0F172A)
                                )
                                Text(
                                    text = "${edu.startDate} – ${if (edu.current) "Present" else edu.endDate}",
                                    fontSize = 11.sp,
                                    color = Color(0xFF64748B)
                                )
                            }
                            Text(
                                text = "${edu.school}${if (edu.location.isNotBlank()) " • ${edu.location}" else ""}",
                                fontSize = 12.sp,
                                color = Color(0xFF475569)
                            )
                            if (edu.description.isNotBlank()) {
                                Text(
                                    text = edu.description,
                                    fontSize = 11.5.sp,
                                    color = Color(0xFF64748B),
                                    lineHeight = 16.sp
                                )
                            }
                        }
                    }
                }
            }
        }

        // Skills
        if (data.skills.isNotEmpty()) {
            ModernSection(title = "Skills & Competencies", accent = accent, font = font) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    val skillChunks = data.skills.chunked(3)
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        skillChunks.forEach { chunk ->
                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                chunk.forEach { s ->
                                    SkillBadge(skill = s.name, level = s.level, accent = accent)
                                }
                            }
                        }
                    }
                }
            }
        }

        // Projects
        if (data.projects.isNotEmpty()) {
            ModernSection(title = "Projects & Portfolio", accent = accent, font = font) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    data.projects.forEach { p ->
                        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(
                                text = p.title,
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                fontFamily = font,
                                color = Color(0xFF0F172A)
                            )
                            if (p.technologies.isNotBlank()) {
                                Text(
                                    text = "Tech: ${p.technologies}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = accent
                                )
                            }
                            if (p.description.isNotBlank()) {
                                Text(
                                    text = p.description,
                                    fontSize = 12.sp,
                                    lineHeight = 16.sp,
                                    color = Color(0xFF334155)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 2. PROFESSIONAL TEMPLATE (Top Colored Banner)
// -------------------------------------------------------------------------------------------------
@Composable
private fun ProfessionalCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Column(modifier = Modifier.fillMaxWidth()) {
        // Colored Top Banner
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(accent)
                .padding(18.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = data.personalInfo.fullName.ifBlank { "Your Name" },
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Black,
                    fontFamily = font,
                    color = Color.White
                )
                Text(
                    text = data.personalInfo.jobTitle.ifBlank { "Job Title" },
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium,
                    fontFamily = font,
                    color = Color(0xFFE2E8F0)
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 6.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    if (data.personalInfo.email.isNotBlank()) {
                        Text(text = data.personalInfo.email, fontSize = 11.sp, color = Color.White)
                    }
                    if (data.personalInfo.phone.isNotBlank()) {
                        Text(text = "•  ${data.personalInfo.phone}", fontSize = 11.sp, color = Color.White)
                    }
                    if (data.personalInfo.location.isNotBlank()) {
                        Text(text = "•  ${data.personalInfo.location}", fontSize = 11.sp, color = Color.White)
                    }
                }
            }
        }

        // Body Content
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            if (data.summary.isNotBlank()) {
                ProfessionalSection("Executive Summary", accent, font) {
                    Text(data.summary, fontSize = 12.5.sp, lineHeight = 18.sp, color = Color(0xFF334155))
                }
            }

            if (data.experience.isNotEmpty()) {
                ProfessionalSection("Professional Experience", accent, font) {
                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        data.experience.forEach { exp ->
                            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = "${exp.jobTitle} | ${exp.company}",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = Color(0xFF0F172A)
                                    )
                                    Text(
                                        text = "${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}",
                                        fontSize = 11.sp,
                                        color = Color(0xFF64748B)
                                    )
                                }
                                if (exp.description.isNotBlank()) {
                                    Text(
                                        text = exp.description,
                                        fontSize = 12.sp,
                                        lineHeight = 17.sp,
                                        color = Color(0xFF334155)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            if (data.education.isNotEmpty()) {
                ProfessionalSection("Education", accent, font) {
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        data.education.forEach { edu ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "${edu.degree} in ${edu.fieldOfStudy} - ${edu.school}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.5.sp,
                                    color = Color(0xFF0F172A)
                                )
                                Text(
                                    text = "${edu.startDate} - ${if (edu.current) "Present" else edu.endDate}",
                                    fontSize = 11.sp,
                                    color = Color(0xFF64748B)
                                )
                            }
                        }
                    }
                }
            }

            if (data.skills.isNotEmpty()) {
                ProfessionalSection("Core Competencies", accent, font) {
                    Text(
                        text = data.skills.joinToString("   •   ") { "${it.name} (${it.level})" },
                        fontSize = 12.sp,
                        lineHeight = 18.sp,
                        color = Color(0xFF334155)
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 3. CLASSIC TEMPLATE (Serif Centered Structure)
// -------------------------------------------------------------------------------------------------
@Composable
private fun ClassicCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(18.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Centered Header
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = data.personalInfo.fullName.ifBlank { "Your Name" },
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Serif,
                color = Color(0xFF0F172A)
            )
            Text(
                text = data.personalInfo.jobTitle.ifBlank { "Professional Title" },
                fontSize = 13.5.sp,
                fontFamily = FontFamily.Serif,
                color = Color(0xFF475569),
                modifier = Modifier.padding(top = 2.dp)
            )
            val contactLine = listOfNotNull(
                data.personalInfo.email.takeIf { it.isNotBlank() },
                data.personalInfo.phone.takeIf { it.isNotBlank() },
                data.personalInfo.location.takeIf { it.isNotBlank() }
            ).joinToString("   •   ")
            if (contactLine.isNotBlank()) {
                Text(
                    text = contactLine,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Serif,
                    color = Color(0xFF64748B),
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }

        HorizontalDivider(color = Color(0xFF334155), thickness = 1.5.dp)

        if (data.summary.isNotBlank()) {
            ClassicSection("Profile Summary") {
                Text(data.summary, fontSize = 12.sp, fontFamily = FontFamily.Serif, lineHeight = 18.sp, color = Color(0xFF1E293B))
            }
        }

        if (data.experience.isNotEmpty()) {
            ClassicSection("Experience") {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    data.experience.forEach { exp ->
                        Column {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = exp.jobTitle,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    fontFamily = FontFamily.Serif,
                                    color = Color(0xFF0F172A)
                                )
                                Text(
                                    text = "${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}",
                                    fontSize = 11.5.sp,
                                    fontFamily = FontFamily.Serif,
                                    color = Color(0xFF475569)
                                )
                            }
                            Text(
                                text = "${exp.company}, ${exp.location}",
                                fontSize = 12.sp,
                                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                                fontFamily = FontFamily.Serif,
                                color = Color(0xFF475569)
                            )
                            if (exp.description.isNotBlank()) {
                                Text(
                                    text = exp.description,
                                    fontSize = 11.5.sp,
                                    fontFamily = FontFamily.Serif,
                                    lineHeight = 16.sp,
                                    color = Color(0xFF334155),
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        if (data.education.isNotEmpty()) {
            ClassicSection("Education") {
                data.education.forEach { edu ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "${edu.degree} in ${edu.fieldOfStudy}, ${edu.school}",
                            fontSize = 12.sp,
                            fontFamily = FontFamily.Serif,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = "${edu.startDate} - ${if (edu.current) "Present" else edu.endDate}",
                            fontSize = 11.sp,
                            fontFamily = FontFamily.Serif,
                            color = Color(0xFF64748B)
                        )
                    }
                }
            }
        }

        if (data.skills.isNotEmpty()) {
            ClassicSection("Skills") {
                Text(
                    text = data.skills.joinToString(", ") { it.name },
                    fontSize = 11.5.sp,
                    fontFamily = FontFamily.Serif,
                    lineHeight = 16.sp,
                    color = Color(0xFF334155)
                )
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 4. MINIMAL TEMPLATE
// -------------------------------------------------------------------------------------------------
@Composable
private fun MinimalCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Column {
            Text(
                text = data.personalInfo.fullName.ifBlank { "Your Name" },
                fontSize = 24.sp,
                fontWeight = FontWeight.Light,
                fontFamily = font,
                color = Color(0xFF0F172A)
            )
            Text(
                text = data.personalInfo.jobTitle.uppercase(),
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp,
                color = accent,
                modifier = Modifier.padding(top = 2.dp)
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                if (data.personalInfo.email.isNotBlank()) Text(data.personalInfo.email, fontSize = 11.sp, color = Color(0xFF64748B))
                if (data.personalInfo.phone.isNotBlank()) Text("• ${data.personalInfo.phone}", fontSize = 11.sp, color = Color(0xFF64748B))
                if (data.personalInfo.location.isNotBlank()) Text("• ${data.personalInfo.location}", fontSize = 11.sp, color = Color(0xFF64748B))
            }
        }

        if (data.summary.isNotBlank()) {
            Text(data.summary, fontSize = 12.sp, lineHeight = 18.sp, color = Color(0xFF334155))
        }

        if (data.experience.isNotEmpty()) {
            Text("EXPERIENCE", fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.5.sp, color = Color(0xFF64748B))
            data.experience.forEach { exp ->
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(exp.jobTitle, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF0F172A))
                    Text("${exp.company} | ${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}", fontSize = 11.sp, color = Color(0xFF64748B))
                    if (exp.description.isNotBlank()) {
                        Text(exp.description, fontSize = 11.5.sp, lineHeight = 16.sp, color = Color(0xFF334155))
                    }
                }
            }
        }

        if (data.skills.isNotEmpty()) {
            Text("SKILLS", fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.5.sp, color = Color(0xFF64748B))
            Text(data.skills.joinToString("  •  ") { it.name }, fontSize = 11.5.sp, color = Color(0xFF334155))
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 5. EXECUTIVE TEMPLATE
// -------------------------------------------------------------------------------------------------
@Composable
private fun ExecutiveCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .border(2.dp, Color(0xFF0F172A), RoundedCornerShape(4.dp))
            .padding(14.dp)
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = data.personalInfo.fullName.ifBlank { "Executive Name" }.uppercase(),
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Serif,
                        color = Color(0xFF0F172A)
                    )
                    Text(
                        text = data.personalInfo.jobTitle,
                        fontSize = 12.5.sp,
                        fontFamily = FontFamily.Serif,
                        color = accent
                    )
                }
                Column(horizontalAlignment = Alignment.End) {
                    Text(data.personalInfo.email, fontSize = 10.5.sp, color = Color(0xFF475569))
                    Text(data.personalInfo.phone, fontSize = 10.5.sp, color = Color(0xFF475569))
                    Text(data.personalInfo.location, fontSize = 10.5.sp, color = Color(0xFF475569))
                }
            }

            HorizontalDivider(color = Color(0xFF0F172A), thickness = 2.dp)

            if (data.summary.isNotBlank()) {
                Text(
                    text = "EXECUTIVE BIO",
                    fontSize = 10.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
                Text(data.summary, fontSize = 11.5.sp, fontFamily = FontFamily.Serif, lineHeight = 17.sp, color = Color(0xFF334155))
            }

            if (data.experience.isNotEmpty()) {
                Text("LEADERSHIP & EXPERIENCE", fontSize = 10.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                data.experience.forEach { exp ->
                    Column(verticalArrangement = Arrangement.spacedBy(1.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(exp.jobTitle, fontWeight = FontWeight.Bold, fontSize = 12.5.sp, fontFamily = FontFamily.Serif, color = Color(0xFF0F172A))
                            Text("${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}", fontSize = 11.sp, color = Color(0xFF64748B))
                        }
                        Text("${exp.company} • ${exp.location}", fontSize = 11.sp, fontStyle = androidx.compose.ui.text.font.FontStyle.Italic, color = Color(0xFF475569))
                        if (exp.description.isNotBlank()) {
                            Text(exp.description, fontSize = 11.sp, fontFamily = FontFamily.Serif, lineHeight = 16.sp, color = Color(0xFF334155))
                        }
                    }
                }
            }

            if (data.skills.isNotEmpty()) {
                Text("EXECUTIVE COMPETENCIES", fontSize = 10.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                Text(data.skills.joinToString("  |  ") { it.name }, fontSize = 11.sp, color = Color(0xFF334155))
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 6. CREATIVE TEMPLATE (2-Column Colored Sidebar)
// -------------------------------------------------------------------------------------------------
@Composable
private fun CreativeCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Row(modifier = Modifier.fillMaxWidth()) {
        // Left Colored Sidebar (35% width)
        Column(
            modifier = Modifier
                .weight(0.36f)
                .background(accent.copy(alpha = 0.12f))
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Column {
                Text(
                    text = data.personalInfo.fullName.ifBlank { "Your Name" },
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Black,
                    fontFamily = font,
                    color = accent
                )
                Text(
                    text = data.personalInfo.jobTitle,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF334155)
                )
            }

            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("CONTACT", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = accent)
                if (data.personalInfo.email.isNotBlank()) Text(data.personalInfo.email, fontSize = 10.sp, color = Color(0xFF334155))
                if (data.personalInfo.phone.isNotBlank()) Text(data.personalInfo.phone, fontSize = 10.sp, color = Color(0xFF334155))
                if (data.personalInfo.location.isNotBlank()) Text(data.personalInfo.location, fontSize = 10.sp, color = Color(0xFF334155))
            }

            if (data.skills.isNotEmpty()) {
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("SKILLS", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = accent)
                    data.skills.forEach { s ->
                        Text("• ${s.name}", fontSize = 10.5.sp, color = Color(0xFF1E293B))
                    }
                }
            }

            if (data.education.isNotEmpty()) {
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("EDUCATION", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = accent)
                    data.education.forEach { edu ->
                        Text(edu.degree, fontSize = 10.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                        Text(edu.school, fontSize = 10.sp, color = Color(0xFF475569))
                    }
                }
            }
        }

        // Right Main Column (64% width)
        Column(
            modifier = Modifier
                .weight(0.64f)
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            if (data.summary.isNotBlank()) {
                Column {
                    Text("ABOUT ME", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = accent)
                    Text(data.summary, fontSize = 11.5.sp, lineHeight = 16.sp, color = Color(0xFF334155), modifier = Modifier.padding(top = 2.dp))
                }
            }

            if (data.experience.isNotEmpty()) {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("EXPERIENCE", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = accent)
                    data.experience.forEach { exp ->
                        Column(verticalArrangement = Arrangement.spacedBy(1.dp)) {
                            Text(exp.jobTitle, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color(0xFF0F172A))
                            Text("${exp.company} (${exp.startDate} - ${if (exp.current) "Present" else exp.endDate})", fontSize = 10.5.sp, color = Color(0xFF64748B))
                            if (exp.description.isNotBlank()) {
                                Text(exp.description, fontSize = 11.sp, lineHeight = 15.sp, color = Color(0xFF334155))
                            }
                        }
                    }
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// 7. COMPACT TEMPLATE (High Yield Dense Layout)
// -------------------------------------------------------------------------------------------------
@Composable
private fun CompactCvTemplate(data: ResumeData, accent: Color, font: FontFamily) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(data.personalInfo.fullName.ifBlank { "Your Name" }, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = accent)
                Text(data.personalInfo.jobTitle, fontSize = 12.sp, fontWeight = FontWeight.Medium, color = Color(0xFF334155))
            }
            Text(
                text = "${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}",
                fontSize = 9.5.sp,
                color = Color(0xFF64748B)
            )
        }

        HorizontalDivider(color = accent, thickness = 1.dp)

        if (data.summary.isNotBlank()) {
            Text(data.summary, fontSize = 11.sp, lineHeight = 15.sp, color = Color(0xFF334155))
        }

        if (data.experience.isNotEmpty()) {
            Text("EXPERIENCE", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = accent)
            data.experience.forEach { exp ->
                Column {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("${exp.jobTitle} – ${exp.company}", fontWeight = FontWeight.Bold, fontSize = 11.5.sp, color = Color(0xFF0F172A))
                        Text("${exp.startDate} - ${if (exp.current) "Present" else exp.endDate}", fontSize = 10.sp, color = Color(0xFF64748B))
                    }
                    if (exp.description.isNotBlank()) {
                        Text(exp.description, fontSize = 10.5.sp, lineHeight = 14.sp, color = Color(0xFF334155))
                    }
                }
            }
        }

        if (data.skills.isNotEmpty()) {
            Text("SKILLS", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = accent)
            Text(data.skills.joinToString(" • ") { it.name }, fontSize = 10.5.sp, color = Color(0xFF334155))
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Sub-components
// -------------------------------------------------------------------------------------------------
@Composable
private fun ModernSection(title: String, accent: Color, font: FontFamily, content: @Composable () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = title.uppercase(),
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                fontFamily = font,
                color = accent,
                letterSpacing = 1.sp
            )
            Spacer(modifier = Modifier.width(8.dp))
            HorizontalDivider(
                modifier = Modifier.weight(1f),
                color = Color(0xFFE2E8F0),
                thickness = 1.dp
            )
        }
        content()
    }
}

@Composable
private fun ProfessionalSection(title: String, accent: Color, font: FontFamily, content: @Composable () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text(
            text = title.uppercase(),
            fontSize = 11.5.sp,
            fontWeight = FontWeight.Bold,
            color = accent,
            letterSpacing = 1.sp
        )
        HorizontalDivider(color = accent.copy(alpha = 0.3f), thickness = 1.dp)
        content()
    }
}

@Composable
private fun ClassicSection(title: String, content: @Composable () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(
            text = title.uppercase(),
            fontSize = 11.5.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif,
            letterSpacing = 1.sp,
            color = Color(0xFF0F172A)
        )
        HorizontalDivider(color = Color(0xFFCBD5E1), thickness = 1.dp)
        content()
    }
}

@Composable
private fun ContactPill(icon: ImageVector, text: String, accent: Color) {
    if (text.isBlank()) return
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(3.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = accent,
            modifier = Modifier.size(11.dp)
        )
        Text(
            text = text,
            fontSize = 10.5.sp,
            fontWeight = FontWeight.Medium,
            color = Color(0xFF475569)
        )
    }
}

@Composable
private fun SkillBadge(skill: String, level: String, accent: Color) {
    Surface(
        shape = RoundedCornerShape(6.dp),
        color = Color(0xFFF8FAFC),
        border = CardDefaults.outlinedCardBorder()
    ) {
        Text(
            text = if (level.isNotBlank()) "$skill ($level)" else skill,
            fontSize = 10.5.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF1E293B),
            modifier = Modifier.padding(horizontal = 7.dp, vertical = 3.dp)
        )
    }
}
