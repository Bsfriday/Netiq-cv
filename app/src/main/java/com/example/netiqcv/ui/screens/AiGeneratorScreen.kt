package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
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
import com.example.netiqcv.data.CountriesAndOccupations
import com.example.netiqcv.model.AiGeneratorInput
import com.example.netiqcv.model.CvFont
import com.example.netiqcv.model.CvTemplate
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.CvRenderer
import com.example.netiqcv.ui.components.parseHexColor
import com.example.netiqcv.ui.viewmodel.CvViewModel
import kotlinx.coroutines.launch

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
fun AiGeneratorScreen(
    viewModel: CvViewModel,
    onEditInBuilder: (ResumeData) -> Unit,
    initialProfession: String? = null
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    val generatedCv by viewModel.aiGeneratedCv.collectAsState()
    val isGenerating by viewModel.isAiGenerating.collectAsState()

    val matchedOcc = remember(initialProfession) {
        initialProfession?.let { prof ->
            CountriesAndOccupations.OCCUPATIONS.find { it.title.equals(prof, ignoreCase = true) }
        }
    }

    var selectedCountry by remember { mutableStateOf("United States") }
    var selectedAgeGroup by remember { mutableStateOf("23-29") }
    var selectedOccupation by remember(initialProfession) {
        mutableStateOf(matchedOcc?.title ?: if (initialProfession.isNullOrBlank()) "Software Engineer" else "Custom...")
    }
    var customOccupation by remember(initialProfession) {
        mutableStateOf(if (matchedOcc == null && !initialProfession.isNullOrBlank()) initialProfession else "")
    }
    var selectedEmploymentStatus by remember { mutableStateOf("employed") }

    var selectedTab by remember { mutableIntStateOf(0) } // 0: Form & Settings, 1: Live Preview
    var isGeminiPolishing by remember { mutableStateOf(false) }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        // Top App Bar Tabs
        Surface(
            color = Color.White,
            border = CardDefaults.outlinedCardBorder()
        ) {
            TabRow(
                selectedTabIndex = selectedTab,
                containerColor = Color.White,
                contentColor = Color(0xFF2563EB)
            ) {
                Tab(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    text = { Text("Parameters & AI", fontWeight = FontWeight.Bold, fontSize = 13.sp) },
                    icon = { Icon(Icons.Default.Tune, contentDescription = null, modifier = Modifier.size(18.dp)) },
                    modifier = Modifier.testTag("tab_ai_parameters")
                )
                Tab(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    text = { Text("Live Preview", fontWeight = FontWeight.Bold, fontSize = 13.sp) },
                    icon = { Icon(Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(18.dp)) },
                    modifier = Modifier.testTag("tab_ai_preview")
                )
            }
        }

        Box(modifier = Modifier.weight(1f)) {
            if (selectedTab == 0) {
                // FORM TAB
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(scrollState)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Header Banner
                    Card(
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFEFF6FF)),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Row(
                            modifier = Modifier.padding(14.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .background(Color(0xFF2563EB), CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.AutoAwesome, contentDescription = null, tint = Color.White, modifier = Modifier.size(20.dp))
                            }
                            Column {
                                Text("Tailored AI Resume Engine", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color(0xFF1E3A8A))
                                Text("Generates realistic localized job titles, metrics, and regional institutions.", fontSize = 11.5.sp, color = Color(0xFF475569))
                            }
                        }
                    }

                    // 1. Country Selection
                    SectionHeader(title = "1. Target Country & Market", icon = Icons.Default.Public)
                    val countryScrollState = rememberScrollState()
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(countryScrollState),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        CountriesAndOccupations.COUNTRIES.forEach { c ->
                            FilterChip(
                                selected = selectedCountry == c.name,
                                onClick = { selectedCountry = c.name },
                                label = { Text(c.name, fontSize = 12.sp) },
                                leadingIcon = {
                                    if (selectedCountry == c.name) {
                                        Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(14.dp))
                                    }
                                }
                            )
                        }
                    }

                    // 2. Age Group & Career Stage
                    SectionHeader(title = "2. Career Stage & Age Group", icon = Icons.Default.Person)
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        CountriesAndOccupations.AGE_GROUPS.forEach { age ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { selectedAgeGroup = age.id },
                                shape = RoundedCornerShape(10.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = if (selectedAgeGroup == age.id) Color(0xFFEFF6FF) else Color.White
                                ),
                                border = if (selectedAgeGroup == age.id) BorderStroke(1.5.dp, Color(0xFF2563EB)) else CardDefaults.outlinedCardBorder()
                            ) {
                                Row(
                                    modifier = Modifier.padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                                ) {
                                    RadioButton(
                                        selected = selectedAgeGroup == age.id,
                                        onClick = { selectedAgeGroup = age.id },
                                        colors = RadioButtonDefaults.colors(selectedColor = Color(0xFF2563EB))
                                    )
                                    Column {
                                        Text(age.label, fontWeight = FontWeight.Bold, fontSize = 12.5.sp, color = Color(0xFF0F172A))
                                        Text(age.levelDesc, fontSize = 11.sp, color = Color(0xFF64748B))
                                    }
                                }
                            }
                        }
                    }

                    // 3. Occupation
                    SectionHeader(title = "3. Target Occupation", icon = Icons.Default.Work)
                    val occScrollState = rememberScrollState()
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(occScrollState),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        CountriesAndOccupations.POPULAR_OCCUPATIONS.forEach { occ ->
                            FilterChip(
                                selected = selectedOccupation == occ.title && customOccupation.isBlank(),
                                onClick = {
                                    selectedOccupation = occ.title
                                    customOccupation = ""
                                },
                                label = { Text(occ.title, fontSize = 12.sp) }
                            )
                        }
                    }

                    OutlinedTextField(
                        value = customOccupation,
                        onValueChange = { customOccupation = it },
                        label = { Text("Or specify custom occupation / role title") },
                        placeholder = { Text("e.g. Lead Robotic Process Automation Architect") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("input_custom_occupation"),
                        singleLine = true,
                        shape = RoundedCornerShape(12.dp)
                    )

                    // 4. Employment Status
                    SectionHeader(title = "4. Employment Status", icon = Icons.Default.Badge)
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        CountriesAndOccupations.EMPLOYMENT_STATUSES.forEach { status ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { selectedEmploymentStatus = status.id },
                                shape = RoundedCornerShape(10.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = if (selectedEmploymentStatus == status.id) Color(0xFFEFF6FF) else Color.White
                                ),
                                border = if (selectedEmploymentStatus == status.id) BorderStroke(1.5.dp, Color(0xFF2563EB)) else CardDefaults.outlinedCardBorder()
                            ) {
                                Row(
                                    modifier = Modifier.padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                                ) {
                                    RadioButton(
                                        selected = selectedEmploymentStatus == status.id,
                                        onClick = { selectedEmploymentStatus = status.id },
                                        colors = RadioButtonDefaults.colors(selectedColor = Color(0xFF2563EB))
                                    )
                                    Column {
                                        Text(status.label, fontWeight = FontWeight.Bold, fontSize = 12.5.sp, color = Color(0xFF0F172A))
                                        Text(status.description, fontSize = 11.sp, color = Color(0xFF64748B))
                                    }
                                }
                            }
                        }
                    }

                    // Generate Button
                    Button(
                        onClick = {
                            viewModel.generateTailoredAiResume(
                                AiGeneratorInput(
                                    country = selectedCountry,
                                    ageGroup = selectedAgeGroup,
                                    occupation = if (customOccupation.isNotBlank()) customOccupation.trim() else selectedOccupation,
                                    employmentStatus = selectedEmploymentStatus,
                                    customOccupation = customOccupation.trim().takeIf { it.isNotBlank() }
                                )
                            )
                            Toast.makeText(context, "Generated tailored resume!", Toast.LENGTH_SHORT).show()
                            selectedTab = 1 // Switch to preview
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(50.dp)
                            .testTag("btn_generate_ai_cv"),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                    ) {
                        if (isGenerating) {
                            CircularProgressIndicator(color = Color.White, modifier = Modifier.size(20.dp), strokeWidth = 2.dp)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Generating Resume...", fontWeight = FontWeight.Bold)
                        } else {
                            Icon(Icons.Default.Sparkles, contentDescription = null, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Generate Tailored Resume", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))
                }
            } else {
                // PREVIEW & CUSTOMIZE TAB
                val previewCv = generatedCv ?: DefaultCvData.DEFAULT_BLANK_CV
                val previewScrollState = rememberScrollState()

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(previewScrollState)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Template Selector Bar
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
                            Text("Template Style", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF0F172A))
                            val templateScroll = rememberScrollState()
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .horizontalScroll(templateScroll),
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                CvTemplate.entries.forEach { t ->
                                    FilterChip(
                                        selected = previewCv.themeConfig.getTemplateEnum() == t,
                                        onClick = {
                                            viewModel.updateAiGeneratedCv {
                                                it.copy(
                                                    themeConfig = it.themeConfig.copy(
                                                        template = t.idName,
                                                        font = if (t == CvTemplate.CLASSIC || t == CvTemplate.EXECUTIVE) "serif" else "sans"
                                                    )
                                                )
                                            }
                                        },
                                        label = { Text(t.title, fontSize = 12.sp) }
                                    )
                                }
                            }

                            // Accent Colors
                            Text("Accent Color", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF0F172A))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                ACCENT_COLORS.forEach { (hex, _) ->
                                    val isSelected = previewCv.themeConfig.accentColor.equals(hex, ignoreCase = true)
                                    Box(
                                        modifier = Modifier
                                            .size(28.dp)
                                            .clip(CircleShape)
                                            .background(parseHexColor(hex))
                                            .clickable {
                                                viewModel.updateAiGeneratedCv {
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
                        }
                    }

                    // Gemini Polish Card
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFF5F3FF)),
                        border = BorderStroke(1.dp, Color(0xFFDDD6FE))
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                horizontalArrangement = Arrangement.spacedBy(10.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(34.dp)
                                        .background(Color(0xFF7C3AED), CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(Icons.Default.AutoFixHigh, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                                }
                                Column {
                                    Text("Gemini AI Executive Polish", fontWeight = FontWeight.Bold, fontSize = 12.5.sp, color = Color(0xFF5B21B6))
                                    Text("Elevates phrasing with high-impact executive tone.", fontSize = 11.sp, color = Color(0xFF6D28D9))
                                }
                            }

                            FilledTonalButton(
                                onClick = {
                                    coroutineScope.launch {
                                        isGeminiPolishing = true
                                        val res = viewModel.geminiService.enhanceSummary(
                                            jobTitle = previewCv.personalInfo.jobTitle,
                                            currentSummary = previewCv.summary,
                                            industry = previewCv.industry
                                        )
                                        res.onSuccess { polished ->
                                            viewModel.updateAiGeneratedCv { it.copy(summary = polished) }
                                            Toast.makeText(context, "Summary polished by Gemini!", Toast.LENGTH_SHORT).show()
                                        }
                                        isGeminiPolishing = false
                                    }
                                },
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.filledTonalButtonColors(containerColor = Color(0xFF7C3AED), contentColor = Color.White)
                            ) {
                                if (isGeminiPolishing) {
                                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(16.dp), strokeWidth = 2.dp)
                                } else {
                                    Text("Polish", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        }
                    }

                    // Rendered CV Sheet
                    CvRenderer(data = previewCv)

                    // Action Bottom Buttons
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = {
                                viewModel.setActiveCv(previewCv)
                                onEditInBuilder(previewCv)
                            },
                            modifier = Modifier
                                .weight(1f)
                                .height(46.dp)
                                .testTag("btn_edit_in_builder"),
                            shape = RoundedCornerShape(12.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                        ) {
                            Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Edit in Builder", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
                        }

                        OutlinedButton(
                            onClick = {
                                viewModel.saveResumeToList(previewCv)
                                Toast.makeText(context, "Saved to My Resumes!", Toast.LENGTH_SHORT).show()
                            },
                            modifier = Modifier
                                .weight(1f)
                                .height(46.dp)
                                .testTag("btn_save_generated_cv"),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Icon(Icons.Default.BookmarkBorder, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Save CV", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
                        }
                    }

                    // Export / Share Actions
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        FilledTonalButton(
                            onClick = {
                                PdfExporter.sharePdf(context, previewCv)
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Icon(Icons.Default.PictureAsPdf, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Share PDF", fontSize = 12.sp)
                        }

                        FilledTonalButton(
                            onClick = {
                                PdfExporter.printCv(context, previewCv)
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Icon(Icons.Default.Print, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Print", fontSize = 12.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))
                }
            }
        }
    }
}

@Composable
private fun SectionHeader(title: String, icon: androidx.compose.ui.graphics.vector.ImageVector) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp),
        modifier = Modifier.padding(top = 4.dp)
    ) {
        Icon(imageVector = icon, contentDescription = null, tint = Color(0xFF2563EB), modifier = Modifier.size(16.dp))
        Text(text = title, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF0F172A))
    }
}
