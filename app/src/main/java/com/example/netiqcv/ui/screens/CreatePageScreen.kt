package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.netiqcv.model.*
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.CvRenderer
import com.example.netiqcv.ui.components.ResumeStrengthMeter
import com.example.netiqcv.ui.components.parseHexColor
import com.example.netiqcv.ui.viewmodel.CvViewModel
import kotlinx.coroutines.launch

private val BUILDER_TABS = listOf(
    "Personal" to Icons.Default.Person,
    "Summary" to Icons.Default.Subject,
    "Experience" to Icons.Default.Work,
    "Education" to Icons.Default.School,
    "Skills" to Icons.Default.Psychology,
    "Certifications" to Icons.Default.CardMembership,
    "Projects" to Icons.Default.Folder,
    "Theme" to Icons.Default.Palette
)

private val ACCENT_COLORS = listOf(
    "#2563EB" to "Royal Blue",
    "#1E3A8A" to "Deep Blue",
    "#0284C7" to "Sky Cyan",
    "#059669" to "Emerald",
    "#D97706" to "Warm Amber",
    "#DB2777" to "Rose",
    "#7C3AED" to "Violet",
    "#0F172A" to "Slate Navy"
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreatePageScreen(
    viewModel: CvViewModel
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    val cv by viewModel.activeCv.collectAsState()

    var activeTabIndex by remember { mutableIntStateOf(0) }
    var showFullPreview by remember { mutableStateOf(false) }
    var showExportMenu by remember { mutableStateOf(false) }
    var isGeminiPolishing by remember { mutableStateOf(false) }
    var isGeneratingBullets by remember { mutableStateOf(false) }

    val scrollState = rememberScrollState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = cv.title.ifBlank { "Resume Builder" },
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A),
                            maxLines = 1
                        )
                        Text(
                            text = "${cv.themeConfig.template.replaceFirstChar { it.uppercase() }} Template • ${cv.personalInfo.fullName.ifBlank { "Draft" }}",
                            fontSize = 11.5.sp,
                            color = Color(0xFF64748B)
                        )
                    }
                },
                actions = {
                    // Preview Button
                    IconButton(
                        onClick = { showFullPreview = true },
                        modifier = Modifier.testTag("btn_toggle_preview")
                    ) {
                        Icon(Icons.Default.Visibility, contentDescription = "Full Preview", tint = Color(0xFF2563EB))
                    }

                    // Save Button
                    IconButton(
                        onClick = {
                            viewModel.saveActiveCvToList()
                            Toast.makeText(context, "Saved to My Resumes!", Toast.LENGTH_SHORT).show()
                        },
                        modifier = Modifier.testTag("btn_save_cv")
                    ) {
                        Icon(Icons.Default.BookmarkBorder, contentDescription = "Save Resume", tint = Color(0xFF2563EB))
                    }

                    // Export Menu Button
                    Box {
                        IconButton(onClick = { showExportMenu = true }) {
                            Icon(Icons.Default.Share, contentDescription = "Export & Share", tint = Color(0xFF0F172A))
                        }
                        DropdownMenu(
                            expanded = showExportMenu,
                            onDismissRequest = { showExportMenu = false }
                        ) {
                            DropdownMenuItem(
                                text = { Text("Export & Share PDF") },
                                leadingIcon = { Icon(Icons.Default.PictureAsPdf, contentDescription = null, tint = Color(0xFF2563EB)) },
                                onClick = {
                                    showExportMenu = false
                                    PdfExporter.sharePdf(context, cv)
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("Print Resume") },
                                leadingIcon = { Icon(Icons.Default.Print, contentDescription = null, tint = Color(0xFF059669)) },
                                onClick = {
                                    showExportMenu = false
                                    PdfExporter.printCv(context, cv)
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("Export Plain Text (.txt)") },
                                leadingIcon = { Icon(Icons.Default.Description, contentDescription = null) },
                                onClick = {
                                    showExportMenu = false
                                    PdfExporter.exportToPlainText(context, cv)
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("Export JSON (.json)") },
                                leadingIcon = { Icon(Icons.Default.Code, contentDescription = null) },
                                onClick = {
                                    showExportMenu = false
                                    PdfExporter.exportToJson(context, cv)
                                }
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFF8FAFC))
        ) {
            // Live Resume Strength Meter Widget at the Top
            Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                ResumeStrengthMeter(
                    cv = cv,
                    onFixSectionClick = { secName ->
                        when (secName) {
                            "Personal Information" -> activeTabIndex = 0
                            "Professional Summary" -> activeTabIndex = 1
                            "Work Experience" -> activeTabIndex = 2
                            "Education" -> activeTabIndex = 3
                            "Skills & Competencies" -> activeTabIndex = 4
                            "Certifications & Projects" -> activeTabIndex = 5
                        }
                    }
                )
            }

            // Tabs Row
            val tabsScrollState = rememberScrollState()
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.White)
                    .horizontalScroll(tabsScrollState)
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                BUILDER_TABS.forEachIndexed { idx, (label, icon) ->
                    val isSelected = activeTabIndex == idx
                    FilterChip(
                        selected = isSelected,
                        onClick = { activeTabIndex = idx },
                        label = { Text(label, fontSize = 12.sp, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal) },
                        leadingIcon = { Icon(icon, contentDescription = null, modifier = Modifier.size(14.dp)) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = Color(0xFFEFF6FF),
                            selectedLabelColor = Color(0xFF1D4ED8),
                            selectedLeadingIconColor = Color(0xFF2563EB)
                        )
                    )
                }
            }

            HorizontalDivider(color = Color(0xFFE2E8F0))

            // Form Section Body
            Column(
                modifier = Modifier
                    .weight(1f)
                    .verticalScroll(scrollState)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                when (activeTabIndex) {
                    0 -> PersonalInfoSection(cv, viewModel)
                    1 -> SummarySection(cv, viewModel, isGeminiPolishing) {
                        coroutineScope.launch {
                            isGeminiPolishing = true
                            val res = viewModel.geminiService.enhanceSummary(
                                jobTitle = cv.personalInfo.jobTitle,
                                currentSummary = cv.summary,
                                industry = cv.industry
                            )
                            res.onSuccess { polished ->
                                viewModel.updateActiveCv { it.copy(summary = polished) }
                                Toast.makeText(context, "Summary enhanced with AI!", Toast.LENGTH_SHORT).show()
                            }
                            isGeminiPolishing = false
                        }
                    }
                    2 -> ExperienceSection(cv, viewModel, isGeneratingBullets) { jobTitle, comp ->
                        coroutineScope.launch {
                            isGeneratingBullets = true
                            val res = viewModel.geminiService.generateBulletPoints(jobTitle, comp, "")
                            res.onSuccess { bullets ->
                                val joined = bullets.joinToString("\n") { "• $it" }
                                val newExp = cv.experience.toMutableList()
                                if (newExp.isNotEmpty()) {
                                    newExp[0] = newExp[0].copy(description = joined)
                                    viewModel.updateActiveCv { it.copy(experience = newExp) }
                                    Toast.makeText(context, "Generated AI bullet points!", Toast.LENGTH_SHORT).show()
                                }
                            }
                            isGeneratingBullets = false
                        }
                    }
                    3 -> EducationSection(cv, viewModel)
                    4 -> SkillsSection(cv, viewModel)
                    5 -> CertificationsSection(cv, viewModel)
                    6 -> ProjectsSection(cv, viewModel)
                    7 -> ThemeSection(cv, viewModel)
                }

                Spacer(modifier = Modifier.height(20.dp))
            }
        }
    }

    // Full Screen Preview Dialog
    if (showFullPreview) {
        Dialog(
            onDismissRequest = { showFullPreview = false },
            properties = DialogProperties(usePlatformDefaultWidth = false)
        ) {
            Scaffold(
                topBar = {
                    TopAppBar(
                        title = { Text("Resume Preview", fontWeight = FontWeight.Bold) },
                        navigationIcon = {
                            IconButton(onClick = { showFullPreview = false }) {
                                Icon(Icons.Default.Close, contentDescription = "Close")
                            }
                        },
                        actions = {
                            IconButton(onClick = { PdfExporter.sharePdf(context, cv) }) {
                                Icon(Icons.Default.PictureAsPdf, contentDescription = "Share PDF", tint = Color(0xFF2563EB))
                            }
                        }
                    )
                }
            ) { dialogPadding ->
                val previewScroll = rememberScrollState()
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(dialogPadding)
                        .background(Color(0xFFE2E8F0))
                        .verticalScroll(previewScroll)
                        .padding(16.dp),
                    contentAlignment = Alignment.TopCenter
                ) {
                    CvRenderer(data = cv)
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Sub-forms for each tab
// -------------------------------------------------------------------------------------------------

@Composable
private fun PersonalInfoSection(cv: ResumeData, viewModel: CvViewModel) {
    val p = cv.personalInfo
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        OutlinedTextField(
            value = cv.title,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(title = it) } },
            label = { Text("Resume Title (for your records)") },
            modifier = Modifier.fillMaxWidth().testTag("input_resume_title"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.fullName,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(fullName = it)) } },
            label = { Text("Full Name *") },
            placeholder = { Text("e.g. Jane Doe") },
            modifier = Modifier.fillMaxWidth().testTag("input_full_name"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.jobTitle,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(jobTitle = it)) } },
            label = { Text("Professional Job Title *") },
            placeholder = { Text("e.g. Senior Software Engineer") },
            modifier = Modifier.fillMaxWidth().testTag("input_job_title"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.email,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(email = it)) } },
            label = { Text("Email Address *") },
            placeholder = { Text("e.g. jane.doe@example.com") },
            modifier = Modifier.fillMaxWidth().testTag("input_email"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.phone,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(phone = it)) } },
            label = { Text("Phone Number") },
            placeholder = { Text("e.g. +1 (555) 123-4567") },
            modifier = Modifier.fillMaxWidth().testTag("input_phone"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.location,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(location = it)) } },
            label = { Text("Location (City, State / Country)") },
            placeholder = { Text("e.g. San Francisco, CA") },
            modifier = Modifier.fillMaxWidth().testTag("input_location"),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.linkedin,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(linkedin = it)) } },
            label = { Text("LinkedIn URL") },
            placeholder = { Text("e.g. linkedin.com/in/janedoe") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
            value = p.github,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(personalInfo = c.personalInfo.copy(github = it)) } },
            label = { Text("GitHub / Portfolio Link") },
            placeholder = { Text("e.g. github.com/janedoe") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp)
        )
    }
}

@Composable
private fun SummarySection(
    cv: ResumeData,
    viewModel: CvViewModel,
    isPolishing: Boolean,
    onAiPolish: () -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Professional Summary", fontWeight = FontWeight.Bold, fontSize = 14.sp)

            Button(
                onClick = onAiPolish,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7C3AED)),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.testTag("btn_ai_polish_summary")
            ) {
                if (isPolishing) {
                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(14.dp), strokeWidth = 2.dp)
                } else {
                    Icon(Icons.Default.AutoFixHigh, contentDescription = null, modifier = Modifier.size(14.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("AI Polish", fontSize = 12.sp)
                }
            }
        }

        OutlinedTextField(
            value = cv.summary,
            onValueChange = { viewModel.updateActiveCv { c -> c.copy(summary = it) } },
            placeholder = { Text("Write 2-4 sentences highlighting your expertise, leadership, and accomplishments...") },
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp)
                .testTag("input_summary"),
            shape = RoundedCornerShape(12.dp)
        )
    }
}

@Composable
private fun ExperienceSection(
    cv: ResumeData,
    viewModel: CvViewModel,
    isGeneratingBullets: Boolean,
    onGenerateBullets: (String, String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Work Experience (${cv.experience.size})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            OutlinedButton(
                onClick = {
                    val newItem = ExperienceItem(
                        id = "exp-${System.currentTimeMillis()}",
                        jobTitle = "",
                        company = "",
                        location = "",
                        startDate = "2022-01",
                        endDate = "",
                        current = true,
                        description = "• "
                    )
                    viewModel.updateActiveCv { c -> c.copy(experience = listOf(newItem) + c.experience) }
                },
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.testTag("btn_add_experience")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Role", fontSize = 12.sp)
            }
        }

        cv.experience.forEachIndexed { idx, exp ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Role #${idx + 1}", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF2563EB))
                        IconButton(
                            onClick = {
                                val updated = cv.experience.filterIndexed { i, _ -> i != idx }
                                viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                            },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color(0xFFDC2626))
                        }
                    }

                    OutlinedTextField(
                        value = exp.jobTitle,
                        onValueChange = { newTitle ->
                            val updated = cv.experience.toMutableList()
                            updated[idx] = exp.copy(jobTitle = newTitle)
                            viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                        },
                        label = { Text("Job Title") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = exp.company,
                        onValueChange = { newCompany ->
                            val updated = cv.experience.toMutableList()
                            updated[idx] = exp.copy(company = newCompany)
                            viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                        },
                        label = { Text("Company") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedTextField(
                            value = exp.startDate,
                            onValueChange = { newStart ->
                                val updated = cv.experience.toMutableList()
                                updated[idx] = exp.copy(startDate = newStart)
                                viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                            },
                            label = { Text("Start (YYYY-MM)") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )

                        OutlinedTextField(
                            value = if (exp.current) "Present" else exp.endDate,
                            onValueChange = { newEnd ->
                                val updated = cv.experience.toMutableList()
                                updated[idx] = exp.copy(endDate = newEnd, current = false)
                                viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                            },
                            label = { Text("End (YYYY-MM)") },
                            enabled = !exp.current,
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Checkbox(
                            checked = exp.current,
                            onCheckedChange = { isCurrent ->
                                val updated = cv.experience.toMutableList()
                                updated[idx] = exp.copy(current = isCurrent, endDate = if (isCurrent) "" else exp.endDate)
                                viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                            }
                        )
                        Text("I currently work here", fontSize = 12.sp)
                    }

                    OutlinedTextField(
                        value = exp.description,
                        onValueChange = { newDesc ->
                            val updated = cv.experience.toMutableList()
                            updated[idx] = exp.copy(description = newDesc)
                            viewModel.updateActiveCv { c -> c.copy(experience = updated) }
                        },
                        label = { Text("Responsibilities & Accomplishments (Bullet points)") },
                        modifier = Modifier.fillMaxWidth().height(120.dp),
                        shape = RoundedCornerShape(10.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun EducationSection(cv: ResumeData, viewModel: CvViewModel) {
    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Education (${cv.education.size})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            OutlinedButton(
                onClick = {
                    val newItem = EducationItem(
                        id = "edu-${System.currentTimeMillis()}",
                        school = "",
                        degree = "B.S.",
                        fieldOfStudy = "",
                        location = "",
                        startDate = "2018-09",
                        endDate = "2022-05"
                    )
                    viewModel.updateActiveCv { c -> c.copy(education = listOf(newItem) + c.education) }
                },
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.testTag("btn_add_education")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Degree", fontSize = 12.sp)
            }
        }

        cv.education.forEachIndexed { idx, edu ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Degree #${idx + 1}", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF2563EB))
                        IconButton(
                            onClick = {
                                val updated = cv.education.filterIndexed { i, _ -> i != idx }
                                viewModel.updateActiveCv { c -> c.copy(education = updated) }
                            },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color(0xFFDC2626))
                        }
                    }

                    OutlinedTextField(
                        value = edu.school,
                        onValueChange = { v ->
                            val updated = cv.education.toMutableList()
                            updated[idx] = edu.copy(school = v)
                            viewModel.updateActiveCv { c -> c.copy(education = updated) }
                        },
                        label = { Text("School / University") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = edu.degree,
                            onValueChange = { v ->
                                val updated = cv.education.toMutableList()
                                updated[idx] = edu.copy(degree = v)
                                viewModel.updateActiveCv { c -> c.copy(education = updated) }
                            },
                            label = { Text("Degree") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = edu.fieldOfStudy,
                            onValueChange = { v ->
                                val updated = cv.education.toMutableList()
                                updated[idx] = edu.copy(fieldOfStudy = v)
                                viewModel.updateActiveCv { c -> c.copy(education = updated) }
                            },
                            label = { Text("Field of Study") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun SkillsSection(cv: ResumeData, viewModel: CvViewModel) {
    var newSkillName by remember { mutableStateOf("") }
    var selectedLevel by remember { mutableStateOf("Advanced") }

    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("Skills & Competencies (${cv.skills.size})", fontWeight = FontWeight.Bold, fontSize = 14.sp)

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = CardDefaults.outlinedCardBorder()
        ) {
            Column(
                modifier = Modifier.padding(14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedTextField(
                    value = newSkillName,
                    onValueChange = { newSkillName = it },
                    label = { Text("Skill name (e.g. Kotlin, Project Leadership)") },
                    modifier = Modifier.fillMaxWidth().testTag("input_new_skill"),
                    shape = RoundedCornerShape(10.dp)
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    listOf("Beginner", "Intermediate", "Advanced", "Expert").forEach { lvl ->
                        FilterChip(
                            selected = selectedLevel == lvl,
                            onClick = { selectedLevel = lvl },
                            label = { Text(lvl, fontSize = 11.sp) }
                        )
                    }
                }

                Button(
                    onClick = {
                        if (newSkillName.isNotBlank()) {
                            val item = SkillItem(
                                id = "skill-${System.currentTimeMillis()}",
                                name = newSkillName.trim(),
                                level = selectedLevel
                            )
                            viewModel.updateActiveCv { c -> c.copy(skills = c.skills + item) }
                            newSkillName = ""
                        }
                    },
                    modifier = Modifier.fillMaxWidth().testTag("btn_add_skill"),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Add Skill")
                }
            }
        }

        // List of current skills
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            cv.skills.forEachIndexed { idx, s ->
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = Color.White,
                    border = CardDefaults.outlinedCardBorder(),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(s.name, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF0F172A))
                            Text(s.level, fontSize = 11.sp, color = Color(0xFF64748B))
                        }
                        IconButton(
                            onClick = {
                                val updated = cv.skills.filterIndexed { i, _ -> i != idx }
                                viewModel.updateActiveCv { c -> c.copy(skills = updated) }
                            },
                            modifier = Modifier.size(24.dp)
                        ) {
                            Icon(Icons.Default.Close, contentDescription = "Remove", tint = Color(0xFF94A3B8))
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CertificationsSection(cv: ResumeData, viewModel: CvViewModel) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Certifications (${cv.certifications.size})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            OutlinedButton(
                onClick = {
                    val cert = CertificationItem(
                        id = "cert-${System.currentTimeMillis()}",
                        name = "AWS Certified Solutions Architect",
                        issuer = "Amazon Web Services",
                        date = "2023-05"
                    )
                    viewModel.updateActiveCv { c -> c.copy(certifications = c.certifications + cert) }
                },
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Certification", fontSize = 12.sp)
            }
        }

        cv.certifications.forEachIndexed { idx, cert ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(12.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Cert #${idx + 1}", fontWeight = FontWeight.Bold, fontSize = 12.5.sp, color = Color(0xFF2563EB))
                        IconButton(
                            onClick = {
                                val updated = cv.certifications.filterIndexed { i, _ -> i != idx }
                                viewModel.updateActiveCv { c -> c.copy(certifications = updated) }
                            },
                            modifier = Modifier.size(22.dp)
                        ) {
                            Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color(0xFFDC2626))
                        }
                    }

                    OutlinedTextField(
                        value = cert.name,
                        onValueChange = { v ->
                            val updated = cv.certifications.toMutableList()
                            updated[idx] = cert.copy(name = v)
                            viewModel.updateActiveCv { c -> c.copy(certifications = updated) }
                        },
                        label = { Text("Certification Name") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = cert.issuer,
                            onValueChange = { v ->
                                val updated = cv.certifications.toMutableList()
                                updated[idx] = cert.copy(issuer = v)
                                viewModel.updateActiveCv { c -> c.copy(certifications = updated) }
                            },
                            label = { Text("Issuer / Organization") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = cert.date,
                            onValueChange = { v ->
                                val updated = cv.certifications.toMutableList()
                                updated[idx] = cert.copy(date = v)
                                viewModel.updateActiveCv { c -> c.copy(certifications = updated) }
                            },
                            label = { Text("Date (YYYY-MM)") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun ProjectsSection(cv: ResumeData, viewModel: CvViewModel) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Projects & Portfolio (${cv.projects.size})", fontWeight = FontWeight.Bold, fontSize = 14.sp)
            OutlinedButton(
                onClick = {
                    val proj = ProjectItem(
                        id = "proj-${System.currentTimeMillis()}",
                        title = "Enterprise Platform Modernization",
                        role = "Lead Architect",
                        description = "Architected high-throughput infrastructure reducing latencies by 30%.",
                        technologies = "Kotlin, React, AWS"
                    )
                    viewModel.updateActiveCv { c -> c.copy(projects = c.projects + proj) }
                },
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Add Project", fontSize = 12.sp)
            }
        }

        cv.projects.forEachIndexed { idx, p ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(12.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Project #${idx + 1}", fontWeight = FontWeight.Bold, fontSize = 12.5.sp, color = Color(0xFF2563EB))
                        IconButton(
                            onClick = {
                                val updated = cv.projects.filterIndexed { i, _ -> i != idx }
                                viewModel.updateActiveCv { c -> c.copy(projects = updated) }
                            },
                            modifier = Modifier.size(22.dp)
                        ) {
                            Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color(0xFFDC2626))
                        }
                    }

                    OutlinedTextField(
                        value = p.title,
                        onValueChange = { v ->
                            val updated = cv.projects.toMutableList()
                            updated[idx] = p.copy(title = v)
                            viewModel.updateActiveCv { c -> c.copy(projects = updated) }
                        },
                        label = { Text("Project Title") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = p.technologies,
                        onValueChange = { v ->
                            val updated = cv.projects.toMutableList()
                            updated[idx] = p.copy(technologies = v)
                            viewModel.updateActiveCv { c -> c.copy(projects = updated) }
                        },
                        label = { Text("Technologies Used") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = p.description,
                        onValueChange = { v ->
                            val updated = cv.projects.toMutableList()
                            updated[idx] = p.copy(description = v)
                            viewModel.updateActiveCv { c -> c.copy(projects = updated) }
                        },
                        label = { Text("Description & Measurable Impact") },
                        modifier = Modifier.fillMaxWidth().height(90.dp),
                        shape = RoundedCornerShape(10.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun ThemeSection(cv: ResumeData, viewModel: CvViewModel) {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Layout Template", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        val templateScroll = rememberScrollState()
        Row(
            modifier = Modifier.fillMaxWidth().horizontalScroll(templateScroll),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            CvTemplate.entries.forEach { t ->
                FilterChip(
                    selected = cv.themeConfig.getTemplateEnum() == t,
                    onClick = {
                        viewModel.updateActiveCv {
                            it.copy(
                                themeConfig = it.themeConfig.copy(
                                    template = t.idName,
                                    font = if (t == CvTemplate.CLASSIC || t == CvTemplate.EXECUTIVE) "serif" else "sans"
                                )
                            )
                        }
                    },
                    label = { Text(t.title) }
                )
            }
        }

        Text("Accent Color", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            ACCENT_COLORS.forEach { (hex, _) ->
                val isSelected = cv.themeConfig.accentColor.equals(hex, ignoreCase = true)
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(parseHexColor(hex))
                        .clickable {
                            viewModel.updateActiveCv {
                                it.copy(themeConfig = it.themeConfig.copy(accentColor = hex))
                            }
                        }
                        .then(
                            if (isSelected) Modifier.border(2.5.dp, Color(0xFF0F172A), CircleShape)
                            else Modifier
                        )
                )
            }
        }

        Text("Typography Style", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            FilterChip(
                selected = cv.themeConfig.font == "sans",
                onClick = { viewModel.updateActiveCv { it.copy(themeConfig = it.themeConfig.copy(font = "sans")) } },
                label = { Text("Modern Sans") }
            )
            FilterChip(
                selected = cv.themeConfig.font == "serif",
                onClick = { viewModel.updateActiveCv { it.copy(themeConfig = it.themeConfig.copy(font = "serif")) } },
                label = { Text("Classic Serif") }
            )
        }
    }
}
