package com.example.netiqcv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.model.ResumeData

@Composable
fun HomeScreen(
    savedCount: Int,
    onNavigateToAi: () -> Unit,
    onNavigateToRobotic: () -> Unit,
    onNavigateToResumeTypes: () -> Unit,
    onNavigateToBuilder: () -> Unit,
    onNavigateToRandom: () -> Unit,
    onNavigateToSamples: () -> Unit,
    onNavigateToSaved: () -> Unit,
    onCreateNew: () -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // Hero Header
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(top = 10.dp)
        ) {
            Surface(
                shape = CircleShape,
                color = Color(0xFFEFF6FF),
                border = CardDefaults.outlinedCardBorder(),
                modifier = Modifier.padding(bottom = 2.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Sparkles,
                        contentDescription = null,
                        tint = Color(0xFF2563EB),
                        modifier = Modifier.size(14.dp)
                    )
                    Text(
                        text = "A CREATIQ PRODUCTS SUITE",
                        fontSize = 10.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1D4ED8),
                        letterSpacing = 0.5.sp
                    )
                }
            }

            Text(
                text = "NetiqCV",
                fontSize = 36.sp,
                fontWeight = FontWeight.Black,
                color = Color(0xFF1E3A8A),
                letterSpacing = (-1).sp
            )

            Text(
                text = "Professional Resume Studio",
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                textAlign = TextAlign.Center
            )

            Text(
                text = "Craft, customize, and export ATS-friendly resumes with smart localized metrics, 7 custom templates, and real-time score feedback.",
                fontSize = 12.5.sp,
                color = Color(0xFF64748B),
                textAlign = TextAlign.Center,
                lineHeight = 18.sp,
                modifier = Modifier.padding(horizontal = 12.dp)
            )
        }

        // Primary Action Cards
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // Card 1: Robotic & AI Tech Studio
            MainFeatureCard(
                tag = "card_robotic_studio",
                badgeText = "ATS INTELLIGENCE",
                badgeBg = Color(0xFFEEF2FF),
                badgeColor = Color(0xFF4F46E5),
                title = "Robotic & AI Tech Studio",
                description = "ATS-optimized architecture for AI data annotators, prompt engineers, model evaluators, and modern tech roles with live keyword analysis.",
                buttonText = "Open Robotic Studio",
                buttonIcon = Icons.Default.SmartToy,
                gradient = listOf(Color(0xFF4F46E5), Color(0xFF7C3AED)),
                icon = Icons.Default.SmartToy,
                onClick = onNavigateToRobotic
            )

            // Card 2: AI Resume Generator
            MainFeatureCard(
                tag = "card_ai_generator",
                badgeText = "SMART AI",
                badgeBg = Color(0xFFEFF6FF),
                badgeColor = Color(0xFF2563EB),
                title = "AI Resume Generator",
                description = "Generate a targeted resume tailored to your country, age group, occupation, and employment status with smart localized metrics.",
                buttonText = "Generate with AI",
                buttonIcon = Icons.Default.Sparkles,
                gradient = listOf(Color(0xFF2563EB), Color(0xFF0284C7)),
                icon = Icons.Default.AutoAwesome,
                onClick = onNavigateToAi
            )

            // Card 3: Create / Edit My CV
            MainFeatureCard(
                tag = "card_create_my_cv",
                badgeText = "STUDIO BUILDER",
                badgeBg = Color(0xFFF0FDF4),
                badgeColor = Color(0xFF059669),
                title = "Create My CV",
                description = "Build and personalize your resume step-by-step with real-time score analysis, section reordering, and PDF export.",
                buttonText = "Open CV Builder",
                buttonIcon = Icons.Default.AddCircle,
                gradient = listOf(Color(0xFF059669), Color(0xFF0D9488)),
                icon = Icons.Default.EditNote,
                onClick = onNavigateToBuilder
            )

            // Card 4: Explore 20+ Resume Types
            MainFeatureCard(
                tag = "card_explore_types",
                badgeText = "CAREER DIRECTORY",
                badgeBg = Color(0xFFF8FAFC),
                badgeColor = Color(0xFF0284C7),
                title = "Explore 20+ Resume Types",
                description = "Browse specialized architectures across Engineering, Healthcare, Finance, Design, and Leadership with smart AI generation.",
                buttonText = "Browse 20+ Careers",
                buttonIcon = Icons.Default.WorkOutline,
                gradient = listOf(Color(0xFF0284C7), Color(0xFF0369A1)),
                icon = Icons.Default.WorkOutline,
                onClick = onNavigateToResumeTypes
            )

            // Card 5: Generate Random CV
            MainFeatureCard(
                tag = "card_generate_random",
                badgeText = "INSTANT TEMPLATE",
                badgeBg = Color(0xFFFFFBEB),
                badgeColor = Color(0xFFD97706),
                title = "Generate Random CV",
                description = "Instantly spin up a realistic professional resume across technology, finance, healthcare, design, and more with one tap.",
                buttonText = "Generate Random CV",
                buttonIcon = Icons.Default.Shuffle,
                gradient = listOf(Color(0xFFD97706), Color(0xFFB45309)),
                icon = Icons.Default.Casino,
                onClick = onNavigateToRandom
            )
        }

        // Secondary Row: Sample CVs & Saved Resumes
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Samples Card
            Card(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onNavigateToSamples() }
                    .testTag("card_sample_cvs"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .background(Color(0xFFF5F3FF), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.CollectionsBookmark,
                            contentDescription = null,
                            tint = Color(0xFF7C3AED),
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    Text(
                        text = "Sample CVs",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = Color(0xFF0F172A)
                    )
                    Text(
                        text = "Browse curated templates across industries",
                        fontSize = 11.sp,
                        color = Color(0xFF64748B),
                        lineHeight = 15.sp
                    )
                }
            }

            // Saved Resumes Card
            Card(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onNavigateToSaved() }
                    .testTag("card_saved_resumes"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .background(Color(0xFFEFF6FF), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.FolderSpecial,
                                contentDescription = null,
                                tint = Color(0xFF2563EB),
                                modifier = Modifier.size(18.dp)
                            )
                        }

                        Surface(
                            shape = CircleShape,
                            color = Color(0xFF2563EB)
                        ) {
                            Text(
                                text = "$savedCount",
                                color = Color.White,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                    }

                    Text(
                        text = "My Resumes",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = Color(0xFF0F172A)
                    )
                    Text(
                        text = "View, duplicate, and export saved CVs",
                        fontSize = 11.sp,
                        color = Color(0xFF64748B),
                        lineHeight = 15.sp
                    )
                }
            }
        }

        // Features Banner
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF1F5F9))
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = "Key Features in NetiqCV",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = Color(0xFF0F172A)
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    FeaturePill(icon = Icons.Default.CheckCircle, text = "ATS-Friendly")
                    FeaturePill(icon = Icons.Default.Palette, text = "7 Templates")
                    FeaturePill(icon = Icons.Default.PictureAsPdf, text = "PDF Export")
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
    }
}

@Composable
private fun MainFeatureCard(
    tag: String,
    badgeText: String,
    badgeBg: Color,
    badgeColor: Color,
    title: String,
    description: String,
    buttonText: String,
    buttonIcon: ImageVector,
    gradient: List<Color>,
    icon: ImageVector,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .testTag(tag)
            .shadow(4.dp, RoundedCornerShape(20.dp)),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = CardDefaults.outlinedCardBorder()
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            // Top Gradient Accent Line
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(4.dp)
                    .background(Brush.horizontalGradient(gradient))
            )

            Column(
                modifier = Modifier.padding(18.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(Brush.linearGradient(gradient), RoundedCornerShape(12.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = icon,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    Surface(
                        shape = CircleShape,
                        color = badgeBg,
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Text(
                            text = badgeText,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = badgeColor,
                            letterSpacing = 0.5.sp,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                        )
                    }
                }

                Text(
                    text = title,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )

                Text(
                    text = description,
                    fontSize = 12.5.sp,
                    color = Color(0xFF64748B),
                    lineHeight = 18.sp
                )

                Button(
                    onClick = onClick,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp)
                        .testTag("btn_${tag}_action"),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = gradient.first())
                ) {
                    Icon(imageVector = buttonIcon, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(text = buttonText, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(imageVector = Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, modifier = Modifier.size(14.dp))
                }
            }
        }
    }
}

@Composable
private fun FeaturePill(icon: ImageVector, text: String) {
    Surface(
        shape = CircleShape,
        color = Color.White,
        border = CardDefaults.outlinedCardBorder()
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Color(0xFF2563EB),
                modifier = Modifier.size(13.dp)
            )
            Text(
                text = text,
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF334155)
            )
        }
    }
}
