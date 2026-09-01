package com.example.netiqcv.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Sparkles
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.utils.CompletionCalculator

@Composable
fun ResumeStrengthMeter(
    cv: ResumeData,
    modifier: Modifier = Modifier,
    onFixSectionClick: ((String) -> Unit)? = null
) {
    val strength = remember(cv) { CompletionCalculator.calculateResumeStrength(cv) }
    var expanded by remember { mutableStateOf(false) }

    val scoreColor = when {
        strength.score >= 85 -> Color(0xFF059669) // Green
        strength.score >= 65 -> Color(0xFF2563EB) // Blue
        strength.score >= 45 -> Color(0xFFD97706) // Amber
        else -> Color(0xFFDC2626) // Red
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .testTag("resume_strength_meter"),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = CardDefaults.outlinedCardBorder()
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Top Row: Title + Score + Level Badge + Expand
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { expanded = !expanded },
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .background(scoreColor.copy(alpha = 0.12f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "${strength.score}%",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Black,
                            color = scoreColor
                        )
                    }

                    Column {
                        Text(
                            text = "Resume Strength",
                            fontSize = 13.5.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = strength.level,
                            fontSize = 11.5.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = scoreColor
                        )
                    }
                }

                IconButton(
                    onClick = { expanded = !expanded },
                    modifier = Modifier.size(28.dp)
                ) {
                    Icon(
                        imageVector = if (expanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                        contentDescription = "Expand details",
                        tint = Color(0xFF64748B)
                    )
                }
            }

            // Progress Bar
            LinearProgressIndicator(
                progress = { strength.score / 100f },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp)),
                color = scoreColor,
                trackColor = Color(0xFFF1F5F9)
            )

            Text(
                text = strength.message,
                fontSize = 12.sp,
                color = Color(0xFF475569),
                lineHeight = 16.sp
            )

            // Expanded Breakdown
            AnimatedVisibility(visible = expanded) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 6.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    HorizontalDivider(color = Color(0xFFF1F5F9))

                    strength.sections.forEach { section ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { onFixSectionClick?.invoke(section.name) }
                                .padding(vertical = 4.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Icon(
                                    imageVector = if (section.completed) Icons.Default.CheckCircle else Icons.Default.Info,
                                    contentDescription = null,
                                    tint = if (section.completed) Color(0xFF059669) else Color(0xFFD97706),
                                    modifier = Modifier.size(16.dp)
                                )
                                Column {
                                    Text(
                                        text = section.name,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        color = Color(0xFF0F172A)
                                    )
                                    Text(
                                        text = section.hint,
                                        fontSize = 11.sp,
                                        color = Color(0xFF64748B)
                                    )
                                }
                            }

                            Text(
                                text = "${section.score}/${section.weight}",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (section.completed) Color(0xFF059669) else Color(0xFF64748B)
                            )
                        }
                    }
                }
            }
        }
    }
}
