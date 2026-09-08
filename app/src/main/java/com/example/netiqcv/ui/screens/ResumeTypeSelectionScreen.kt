package com.example.netiqcv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.data.ResumeTypeItem
import com.example.netiqcv.data.ResumeTypesData

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResumeTypeSelectionScreen(
    onSelectDedicatedStudio: (String) -> Unit,
    onSelectProfessionForAi: (String) -> Unit,
    onBack: () -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("All") }
    var customRoleInput by remember { mutableStateOf("") }

    val filteredTypes = remember(searchQuery, selectedCategory) {
        ResumeTypesData.RESUME_TYPES.filter { item ->
            val matchesCategory = selectedCategory == "All" || item.category.equals(selectedCategory, ignoreCase = true)
            val matchesSearch = searchQuery.isBlank() ||
                    item.name.contains(searchQuery, ignoreCase = true) ||
                    item.description.contains(searchQuery, ignoreCase = true) ||
                    item.keywords.any { it.contains(searchQuery, ignoreCase = true) }
            matchesCategory && matchesSearch
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("Resume Types & Professions", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        Text("Explore 20+ specialized career architectures", fontSize = 11.5.sp, color = Color(0xFF64748B))
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack, modifier = Modifier.testTag("btn_types_back")) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
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
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Spacer(modifier = Modifier.height(4.dp))

            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Search by role, industry, or tech keyword...", fontSize = 12.5.sp) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    if (searchQuery.isNotBlank()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear")
                        }
                    }
                },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().testTag("input_search_resume_types"),
                shape = RoundedCornerShape(12.dp)
            )

            // Category Horizontal Chips
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ResumeTypesData.CATEGORIES.forEach { cat ->
                    FilterChip(
                        selected = selectedCategory == cat,
                        onClick = { selectedCategory = cat },
                        label = { Text(cat, fontSize = 12.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = Color(0xFFEFF6FF),
                            selectedLabelColor = Color(0xFF1D4ED8)
                        )
                    )
                }
            }

            // Custom Profession input banner
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFEEF2FF)),
                border = CardDefaults.outlinedCardBorder()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = customRoleInput,
                        onValueChange = { customRoleInput = it },
                        placeholder = { Text("Don't see your role? Enter custom...", fontSize = 12.sp) },
                        modifier = Modifier.weight(1f).testTag("input_custom_role"),
                        singleLine = true,
                        shape = RoundedCornerShape(10.dp)
                    )

                    Button(
                        onClick = {
                            if (customRoleInput.isNotBlank()) {
                                onSelectProfessionForAi(customRoleInput)
                            }
                        },
                        enabled = customRoleInput.isNotBlank(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4F46E5)),
                        contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp),
                        modifier = Modifier.testTag("btn_generate_custom_role")
                    ) {
                        Text("Generate", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Results List
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                contentPadding = PaddingValues(bottom = 20.dp)
            ) {
                items(filteredTypes, key = { it.id }) { item ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                if (item.isDedicated) {
                                    onSelectDedicatedStudio(item.id)
                                } else {
                                    onSelectProfessionForAi(item.targetProfession ?: item.name)
                                }
                            }
                            .testTag("card_resume_type_${item.id}"),
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
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .background(
                                                if (item.isDedicated) Color(0xFFEEF2FF) else Color(0xFFEFF6FF),
                                                CircleShape
                                            ),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = if (item.isDedicated) Icons.Default.SmartToy else Icons.Default.WorkOutline,
                                            contentDescription = null,
                                            tint = if (item.isDedicated) Color(0xFF4F46E5) else Color(0xFF2563EB),
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }

                                    Column {
                                        Text(
                                            text = item.name,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 14.sp,
                                            color = Color(0xFF0F172A)
                                        )
                                        Text(
                                            text = item.category,
                                            fontSize = 11.sp,
                                            color = Color(0xFF64748B)
                                        )
                                    }
                                }

                                item.badge?.let { badge ->
                                    Surface(
                                        shape = CircleShape,
                                        color = if (item.isDedicated) Color(0xFFEEF2FF) else Color(0xFFF1F5F9)
                                    ) {
                                        Text(
                                            text = badge,
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = if (item.isDedicated) Color(0xFF4F46E5) else Color(0xFF475569),
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                        )
                                    }
                                }
                            }

                            Text(
                                text = item.description,
                                fontSize = 12.sp,
                                color = Color(0xFF475569),
                                lineHeight = 17.sp
                            )

                            // Keywords row
                            Row(
                                modifier = Modifier.horizontalScroll(rememberScrollState()),
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                item.keywords.take(4).forEach { kw ->
                                    Surface(
                                        shape = RoundedCornerShape(6.dp),
                                        color = Color(0xFFF8FAFC),
                                        border = CardDefaults.outlinedCardBorder()
                                    ) {
                                        Text(
                                            text = "#$kw",
                                            fontSize = 10.5.sp,
                                            color = Color(0xFF64748B),
                                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                        )
                                    }
                                }
                            }

                            // Action button
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                TextButton(
                                    onClick = {
                                        if (item.isDedicated) {
                                            onSelectDedicatedStudio(item.id)
                                        } else {
                                            onSelectProfessionForAi(item.targetProfession ?: item.name)
                                        }
                                    },
                                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp)
                                ) {
                                    Text(
                                        text = if (item.isDedicated) "Open Studio" else "Generate with AI",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 12.sp,
                                        color = if (item.isDedicated) Color(0xFF4F46E5) else Color(0xFF2563EB)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Icon(
                                        Icons.AutoMirrored.Filled.ArrowForward,
                                        contentDescription = null,
                                        modifier = Modifier.size(14.dp),
                                        tint = if (item.isDedicated) Color(0xFF4F46E5) else Color(0xFF2563EB)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
