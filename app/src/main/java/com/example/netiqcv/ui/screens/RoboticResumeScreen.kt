package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
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
import com.example.netiqcv.data.AtsScoreBreakdown
import com.example.netiqcv.data.RoboticResumeData
import com.example.netiqcv.data.RoboticRoleDefinition
import com.example.netiqcv.model.*
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.CvRenderer
import com.example.netiqcv.ui.components.parseHexColor
import com.example.netiqcv.ui.viewmodel.CvViewModel

private val EXPERIENCE_LEVELS = listOf("Entry Level", "Junior", "Mid-Level", "Senior", "Expert", "Career Changer")
private val WORK_PREFERENCES = listOf("Remote", "Hybrid", "On-site")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RoboticResumeScreen(
    viewModel: CvViewModel,
    onEditInBuilder: (ResumeData) -> Unit,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var selectedRoleIndex by remember { mutableIntStateOf(0) }
    val currentRole: RoboticRoleDefinition = RoboticResumeData.ROLES[selectedRoleIndex]

    var selectedLevel by remember { mutableStateOf("Mid-Level") }
    var selectedPreference by remember { mutableStateOf("Remote") }
    var fullName by remember { mutableStateOf("Alex Morgan") }
    var email by remember { mutableStateOf("alex.morgan.ai@example.com") }
    var location by remember { mutableStateOf("Austin, TX, USA") }
    var generatedSummary by remember {
        mutableStateOf(
            RoboticResumeData.generateRoboticSummary(
                role = currentRole.title,
                level = selectedLevel,
                workPreference = selectedPreference,
                skills = currentRole.suggestedSkills.map { it.name },
                location = location
            )
        )
    }

    var roughNotesInput by remember { mutableStateOf("") }
    var polishedBullets by remember { mutableStateOf<List<String>>(emptyList()) }
    var selectedSkills by remember { mutableStateOf(currentRole.suggestedSkills.toMutableList()) }

    var selectedTab by remember { mutableIntStateOf(0) } // 0: ATS Optimizer & Target, 1: Live Preview

    // Construct preview resume data
    val roboticCv = remember(currentRole, selectedLevel, selectedPreference, fullName, email, location, generatedSummary, selectedSkills) {
        ResumeData(
            id = "robotic-${currentRole.id}-${System.currentTimeMillis()}",
            title = "$fullName — ${currentRole.title} (ATS Optimized)",
            industry = currentRole.defaultIndustry,
            personalInfo = PersonalInfo(
                fullName = fullName,
                jobTitle = currentRole.title,
                email = email,
                phone = "+1 (555) 234-5678",
                location = location,
                linkedin = "linkedin.com/in/alexmorgan-ai",
                github = "github.com/alexmorgan-ai"
            ),
            summary = generatedSummary,
            experience = listOf(
                ExperienceItem(
                    id = "exp-1",
                    jobTitle = currentRole.title,
                    company = "Frontier AI & Data Systems",
                    location = location,
                    startDate = "2022",
                    endDate = "Present",
                    current = true,
                    description = currentRole.commonResponsibilities.joinToString("\n")
                )
            ),
            education = listOf(
                EducationItem(
                    id = "edu-1",
                    school = "University of Technology",
                    degree = "Bachelor of Science",
                    fieldOfStudy = "Computer Science & Cognitive Data",
                    location = "Austin, TX",
                    startDate = "2018",
                    endDate = "2022",
                    description = "Specialized coursework in AI ethics, statistical machine learning, and data pipelines."
                )
            ),
            skills = selectedSkills,
            certifications = listOf(
                CertificationItem(
                    id = "cert-1",
                    name = "Certified AI Safety & Data Evaluation Specialist",
                    issuer = "Frontier AI Standards Council",
                    date = "2023"
                )
            ),
            projects = listOf(
                ProjectItem(
                    id = "proj-1",
                    title = "Automated Annotation Quality Benchmark",
                    role = "Lead Specialist",
                    description = "Engineered automated validation scripts reducing inter-annotator labeling discrepancies by 28%.",
                    technologies = "Python, JSON, Postman, Streamlit"
                )
            ),
            themeConfig = ThemeConfig(
                template = currentRole.defaultTemplate.idName,
                accentColor = currentRole.defaultAccent,
                font = "sans"
            )
        )
    }

    val atsScore: AtsScoreBreakdown = remember(roboticCv, currentRole) {
        RoboticResumeData.calculateAtsScore(roboticCv, currentRole.title)
    }

    val scrollState = rememberScrollState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Box(
                            modifier = Modifier
                                .size(32.dp)
                                .background(Color(0xFFEEF2FF), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.SmartToy, contentDescription = null, tint = Color(0xFF4F46E5), modifier = Modifier.size(18.dp))
                        }
                        Column {
                            Text("Robotic & AI Tech Studio", fontSize = 15.sp, fontWeight = FontWeight.Bold)
                            Text("ATS-Optimized Resume Architecture", fontSize = 11.sp, color = Color(0xFF64748B))
                        }
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack, modifier = Modifier.testTag("btn_robotic_back")) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(
                        onClick = {
                            viewModel.saveResumeToList(roboticCv)
                            Toast.makeText(context, "Saved to My Resumes!", Toast.LENGTH_SHORT).show()
                        },
                        modifier = Modifier.testTag("btn_robotic_save")
                    ) {
                        Icon(Icons.Default.BookmarkBorder, contentDescription = "Save")
                    }

                    IconButton(
                        onClick = { PdfExporter.sharePdf(context, roboticCv) },
                        modifier = Modifier.testTag("btn_robotic_export")
                    ) {
                        Icon(Icons.Default.Share, contentDescription = "Share PDF")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .background(Color(0xFFF8FAFC))
        ) {
            // Tab row
            Surface(color = Color.White, border = CardDefaults.outlinedCardBorder()) {
                TabRow(selectedTabIndex = selectedTab, containerColor = Color.White, contentColor = Color(0xFF4F46E5)) {
                    Tab(
                        selected = selectedTab == 0,
                        onClick = { selectedTab = 0 },
                        text = { Text("ATS Target & Tools", fontWeight = FontWeight.Bold, fontSize = 13.sp) },
                        icon = { Icon(Icons.Default.Tune, contentDescription = null, modifier = Modifier.size(18.dp)) },
                        modifier = Modifier.testTag("tab_robotic_tools")
                    )
                    Tab(
                        selected = selectedTab == 1,
                        onClick = { selectedTab = 1 },
                        text = { Text("Live Preview (${atsScore.overallScore}%)", fontWeight = FontWeight.Bold, fontSize = 13.sp) },
                        icon = { Icon(Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(18.dp)) },
                        modifier = Modifier.testTag("tab_robotic_preview")
                    )
                }
            }

            if (selectedTab == 0) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(scrollState)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // 1. ATS Score Overview Card
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF059669), modifier = Modifier.size(20.dp))
                                    Text("ATS Match Score", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                                }

                                Surface(
                                    shape = CircleShape,
                                    color = if (atsScore.overallScore >= 80) Color(0xFFF0FDF4) else Color(0xFFFFFBEB),
                                    border = CardDefaults.outlinedCardBorder()
                                ) {
                                    Text(
                                        text = "${atsScore.overallScore}%",
                                        fontWeight = FontWeight.Black,
                                        fontSize = 16.sp,
                                        color = if (atsScore.overallScore >= 80) Color(0xFF059669) else Color(0xFFD97706),
                                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                                    )
                                }
                            }

                            LinearProgressIndicator(
                                progress = { atsScore.overallScore / 100f },
                                modifier = Modifier.fillMaxWidth().height(8.dp).clip(RoundedCornerShape(4.dp)),
                                color = if (atsScore.overallScore >= 80) Color(0xFF059669) else Color(0xFF4F46E5),
                                trackColor = Color(0xFFE2E8F0)
                            )

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Keywords: ${atsScore.keywordScore}/40", fontSize = 11.5.sp, color = Color(0xFF64748B))
                                Text("Structure: ${atsScore.structureScore}/30", fontSize = 11.5.sp, color = Color(0xFF64748B))
                                Text("Impact: ${atsScore.impactScore}/30", fontSize = 11.5.sp, color = Color(0xFF64748B))
                            }

                            // Matched & Missing Keywords
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Text("Matched Role Keywords:", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF334155))
                                Row(
                                    modifier = Modifier.horizontalScroll(rememberScrollState()),
                                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                                ) {
                                    atsScore.matchedKeywords.forEach { kw ->
                                        Surface(
                                            shape = RoundedCornerShape(8.dp),
                                            color = Color(0xFFF0FDF4),
                                            border = CardDefaults.outlinedCardBorder()
                                        ) {
                                            Text(
                                                text = "✓ $kw",
                                                fontSize = 11.sp,
                                                color = Color(0xFF059669),
                                                fontWeight = FontWeight.Medium,
                                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                            )
                                        }
                                    }
                                }
                            }

                            if (atsScore.missingKeywords.isNotEmpty()) {
                                Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                    Text("Suggested Keywords to Add:", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF991B1B))
                                    Row(
                                        modifier = Modifier.horizontalScroll(rememberScrollState()),
                                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                                    ) {
                                        atsScore.missingKeywords.forEach { kw ->
                                            Surface(
                                                shape = RoundedCornerShape(8.dp),
                                                color = Color(0xFFFEF2F2),
                                                border = CardDefaults.outlinedCardBorder()
                                            ) {
                                                Text(
                                                    text = "+ $kw",
                                                    fontSize = 11.sp,
                                                    color = Color(0xFFDC2626),
                                                    fontWeight = FontWeight.Medium,
                                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // 2. Target Role Selector
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Target AI / Tech Role", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Row(
                                modifier = Modifier.horizontalScroll(rememberScrollState()),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                RoboticResumeData.ROLES.forEachIndexed { index, role ->
                                    FilterChip(
                                        selected = selectedRoleIndex == index,
                                        onClick = {
                                            selectedRoleIndex = index
                                            generatedSummary = RoboticResumeData.generateRoboticSummary(
                                                role = role.title,
                                                level = selectedLevel,
                                                workPreference = selectedPreference,
                                                skills = role.suggestedSkills.map { it.name },
                                                location = location
                                            )
                                            selectedSkills = role.suggestedSkills.toMutableList()
                                        },
                                        label = { Text(role.title, fontSize = 12.sp) }
                                    )
                                }
                            }

                            // Experience Level & Work Preference
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text("Experience Level", fontSize = 11.5.sp, color = Color(0xFF64748B), fontWeight = FontWeight.SemiBold)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Row(modifier = Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                        EXPERIENCE_LEVELS.forEach { lvl ->
                                            FilterChip(
                                                selected = selectedLevel == lvl,
                                                onClick = {
                                                    selectedLevel = lvl
                                                    generatedSummary = RoboticResumeData.generateRoboticSummary(
                                                        role = currentRole.title,
                                                        level = lvl,
                                                        workPreference = selectedPreference,
                                                        skills = selectedSkills.map { it.name },
                                                        location = location
                                                    )
                                                },
                                                label = { Text(lvl, fontSize = 11.sp) }
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // 3. ATS Professional Summary Generator
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text("ATS Executive Summary", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Button(
                                    onClick = {
                                        generatedSummary = RoboticResumeData.generateRoboticSummary(
                                            role = currentRole.title,
                                            level = selectedLevel,
                                            workPreference = selectedPreference,
                                            skills = selectedSkills.map { it.name },
                                            location = location
                                        )
                                        Toast.makeText(context, "Summary regenerated!", Toast.LENGTH_SHORT).show()
                                    },
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                                    shape = RoundedCornerShape(8.dp),
                                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEEF2FF), contentColor = Color(0xFF4F46E5))
                                ) {
                                    Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(14.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Regenerate", fontSize = 11.5.sp, fontWeight = FontWeight.Bold)
                                }
                            }

                            OutlinedTextField(
                                value = generatedSummary,
                                onValueChange = { generatedSummary = it },
                                modifier = Modifier.fillMaxWidth().testTag("input_robotic_summary"),
                                minLines = 4,
                                textStyle = LocalTextStyle.current.copy(fontSize = 12.5.sp, lineHeight = 18.sp),
                                shape = RoundedCornerShape(12.dp)
                            )
                        }
                    }

                    // 4. Action Verb Bullet Polish Tool
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Action Verb Bullet Polisher", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text("Paste casual notes or bullet points; we'll rewrite them using high-impact ATS action verbs.", fontSize = 11.5.sp, color = Color(0xFF64748B))

                            OutlinedTextField(
                                value = roughNotesInput,
                                onValueChange = { roughNotesInput = it },
                                placeholder = { Text("e.g. helped with labeling datasets; looked for hallucinations; made sure data was accurate", fontSize = 12.sp) },
                                modifier = Modifier.fillMaxWidth().testTag("input_bullet_notes"),
                                minLines = 2,
                                shape = RoundedCornerShape(12.dp)
                            )

                            Button(
                                onClick = {
                                    if (roughNotesInput.isNotBlank()) {
                                        polishedBullets = RoboticResumeData.enhanceBulletPoints(roughNotesInput, currentRole.title)
                                    }
                                },
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4F46E5)),
                                modifier = Modifier.fillMaxWidth().testTag("btn_polish_bullets")
                            ) {
                                Icon(Icons.Default.AutoFixHigh, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Polish into ATS Bullets", fontWeight = FontWeight.Bold, fontSize = 12.5.sp)
                            }

                            if (polishedBullets.isNotEmpty()) {
                                Surface(
                                    shape = RoundedCornerShape(10.dp),
                                    color = Color(0xFFF8FAFC),
                                    border = CardDefaults.outlinedCardBorder(),
                                    modifier = Modifier.fillMaxWidth().padding(top = 4.dp)
                                ) {
                                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                        Text("Polished Bullets:", fontSize = 11.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                                        polishedBullets.forEach { bullet ->
                                            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                                Text("•", color = Color(0xFF4F46E5), fontWeight = FontWeight.Bold)
                                                Text(bullet, fontSize = 12.sp, color = Color(0xFF334155))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // 5. Open in Full Builder CTA
                    Button(
                        onClick = {
                            viewModel.setActiveCv(roboticCv)
                            onEditInBuilder(roboticCv)
                        },
                        modifier = Modifier.fillMaxWidth().height(50.dp).testTag("btn_open_in_full_builder"),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                    ) {
                        Icon(Icons.Default.EditNote, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Open & Fine-Tune in CV Builder", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    }
                }
            } else {
                // Live Preview Tab
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState())
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                    ) {
                        CvRenderer(cv = roboticCv)
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Button(
                            onClick = {
                                viewModel.setActiveCv(roboticCv)
                                onEditInBuilder(roboticCv)
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(12.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                        ) {
                            Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Edit in Builder", fontWeight = FontWeight.Bold, fontSize = 12.5.sp)
                        }

                        OutlinedButton(
                            onClick = { PdfExporter.sharePdf(context, roboticCv) },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Share PDF", fontWeight = FontWeight.Bold, fontSize = 12.5.sp)
                        }
                    }
                }
            }
        }
    }
}
