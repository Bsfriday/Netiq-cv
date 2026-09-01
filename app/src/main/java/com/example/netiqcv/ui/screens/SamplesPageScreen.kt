package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.netiqcv.data.SampleCvsData
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.CvRenderer
import com.example.netiqcv.ui.components.parseHexColor
import com.example.netiqcv.ui.viewmodel.CvViewModel

private val SAMPLE_CATEGORIES = listOf("All", "Technology", "Design", "Finance", "Healthcare", "Marketing", "Management")

@Composable
fun SamplesPageScreen(
    viewModel: CvViewModel,
    onEditInBuilder: (ResumeData) -> Unit
) {
    val context = LocalContext.current
    var selectedCategory by remember { mutableStateOf("All") }
    var searchQuery by remember { mutableStateOf("") }
    var previewSample by remember { mutableStateOf<ResumeData?>(null) }

    val filteredSamples = remember(selectedCategory, searchQuery) {
        SampleCvsData.SAMPLE_CVS.filter { cv ->
            val matchesCategory = if (selectedCategory == "All") true else cv.industry.equals(selectedCategory, ignoreCase = true)
            val matchesSearch = if (searchQuery.isBlank()) true else {
                cv.title.contains(searchQuery, ignoreCase = true) ||
                        cv.personalInfo.fullName.contains(searchQuery, ignoreCase = true) ||
                        cv.personalInfo.jobTitle.contains(searchQuery, ignoreCase = true) ||
                        cv.skills.any { it.name.contains(searchQuery, ignoreCase = true) }
            }
            matchesCategory && matchesSearch
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Search bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search by title, role, or skill...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            trailingIcon = {
                if (searchQuery.isNotBlank()) {
                    IconButton(onClick = { searchQuery = "" }) {
                        Icon(Icons.Default.Clear, contentDescription = "Clear")
                    }
                }
            },
            modifier = Modifier.fillMaxWidth().testTag("input_search_samples"),
            shape = RoundedCornerShape(14.dp)
        )

        // Categories Row
        val catScroll = rememberScrollState()
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(catScroll),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            SAMPLE_CATEGORIES.forEach { cat ->
                FilterChip(
                    selected = selectedCategory == cat,
                    onClick = { selectedCategory = cat },
                    label = { Text(cat, fontSize = 12.sp) }
                )
            }
        }

        // List of samples
        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(filteredSamples, key = { it.id }) { sample ->
                SampleCvCard(
                    cv = sample,
                    onPreview = { previewSample = sample },
                    onUseTemplate = {
                        viewModel.setActiveCv(sample)
                        onEditInBuilder(sample)
                    }
                )
            }
        }
    }

    // Preview Dialog
    previewSample?.let { sample ->
        Dialog(
            onDismissRequest = { previewSample = null },
            properties = DialogProperties(usePlatformDefaultWidth = false)
        ) {
            Scaffold(
                topBar = {
                    TopAppBar(
                        title = { Text(sample.title, fontWeight = FontWeight.Bold, fontSize = 15.sp) },
                        navigationIcon = {
                            IconButton(onClick = { previewSample = null }) {
                                Icon(Icons.Default.Close, contentDescription = "Close")
                            }
                        },
                        actions = {
                            Button(
                                onClick = {
                                    previewSample = null
                                    viewModel.setActiveCv(sample)
                                    onEditInBuilder(sample)
                                },
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.padding(end = 8.dp)
                            ) {
                                Text("Use This CV")
                            }
                        }
                    )
                }
            ) { padding ->
                val scroll = rememberScrollState()
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding)
                        .background(Color(0xFFE2E8F0))
                        .verticalScroll(scroll)
                        .padding(16.dp)
                ) {
                    CvRenderer(data = sample)
                }
            }
        }
    }
}

@Composable
private fun SampleCvCard(
    cv: ResumeData,
    onPreview: () -> Unit,
    onUseTemplate: () -> Unit
) {
    val accent = parseHexColor(cv.themeConfig.accentColor)

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("card_sample_${cv.id}")
            .clickable { onPreview() },
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
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .background(accent.copy(alpha = 0.15f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = cv.personalInfo.fullName.take(2).uppercase(),
                            fontWeight = FontWeight.Bold,
                            color = accent,
                            fontSize = 13.sp
                        )
                    }

                    Column {
                        Text(
                            text = cv.personalInfo.jobTitle,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = "${cv.personalInfo.fullName} • ${cv.personalInfo.location}",
                            fontSize = 11.5.sp,
                            color = Color(0xFF64748B)
                        )
                    }
                }

                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = Color(0xFFF1F5F9)
                ) {
                    Text(
                        text = cv.themeConfig.template.uppercase(),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF475569),
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                    )
                }
            }

            Text(
                text = cv.summary,
                fontSize = 12.sp,
                color = Color(0xFF334155),
                maxLines = 2,
                lineHeight = 16.sp
            )

            // Badges row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                cv.skills.take(3).forEach { s ->
                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = Color(0xFFF8FAFC),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Text(
                            text = s.name,
                            fontSize = 10.5.sp,
                            color = Color(0xFF475569),
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
            }

            HorizontalDivider(color = Color(0xFFF1F5F9))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = onPreview,
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(15.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Preview", fontSize = 12.sp)
                }

                Button(
                    onClick = onUseTemplate,
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                ) {
                    Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(15.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Use CV", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
